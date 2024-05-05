/* eslint-disable security/detect-possible-timing-attacks */
/* eslint-disable camelcase */
const { parsePhoneNumber } = require('awesome-phonenumber');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const customLogger = require('../helpers/custom.logger');
const catchAsync = require('../helpers/catchAsync');
const { authService, customerService, secretService } = require('../services');
const Utils = require('../libs/utils');
const config = require('../config/config');
const ApiError = require('../helpers/ApiError');
const tokenType = require('../config/token_type');
const messageError = require('../config/messageError');
const messageSuccess = require('../config/messageSuccess');
const { getCurrentTimeEpoch } = require('../helpers/utils');

// New login with password
const loginController = catchAsync(async (req, res) => {
  const { phone_number, password } = req.body;
  customLogger.info(`Login with phone number: ${phone_number} and password: ${password}`);
  const phoneNumber = parsePhoneNumber(phone_number, {
    regionCode: 'VN',
  }).number.e164;
  const customer = await customerService.getOneCustomerByPhone(phoneNumber);
  if (!customer || !(await customer.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, messageError.loginWithPasswordFail.vn);
  }
  const secretData = await secretService.findOneSecretKey(customer.id);
  const newSecretKey = authService.generateRandomSecretString(10);
  if (!secretData) {
    const secretKeyData = {
      customer_id: customer.id,
      secret_key: newSecretKey,
      status: 1,
    };
    await secretService.createSecretKey(secretKeyData);
  } else {
    secretData.secret_key = newSecretKey;
    await secretData.save();
  }

  const access_token = await Utils.createTokenWithCustomerSecret(customer.id, newSecretKey, tokenType.access);
  const refresh_token = await Utils.createTokenWithCustomerSecret(customer.id, newSecretKey, tokenType.refresh);
  const customerData = {
    customer_id: customer.id,
    access_token,
    refresh_token,
  };
  res.status(httpStatus.OK).send(customerData);
});

const resgisterController = catchAsync(async (req, res) => {
  const { phone_number, password, full_name, address, email, payment_type } = req.body;
  const phoneNumber = parsePhoneNumber(phone_number, {
    regionCode: 'VN',
  }).number.e164;
  const customer = await customerService.getOneCustomerByPhone(phoneNumber);
  if (customer) {
    throw new ApiError(httpStatus.BAD_REQUEST, messageError.userRegisted.vn);
  }
  const passwordHash = await bcrypt.hash(password, 8);
  const customerData = {
    phone_number: phoneNumber,
    password: passwordHash,
    fullname: full_name || 'Nguyễn Văn A',
    address: address || 'Hà Đông, Hà Nội',
    email: email || 'test@gmail.com',
    payment_type: payment_type || 1,
  };
  const createCustomer = await customerService.createCustomer(customerData);
  if (createCustomer) {
    res.status(httpStatus.OK).send(createCustomer);
  }
});

// API refresh token for new authenV2
const refreshTokenNewController = catchAsync(async (req, res) => {
  const { refresh_token } = req.body;

  let secretKey;
  // S1: Decode token
  const token_payload = await Utils.decodeToken(refresh_token);

  // S2: Check token to get information of user || get version of token
  if (!token_payload) {
    // Handle old version refresh token
    // S2.1.1: Find User who is own the refresh token
    const user = await customerService.findOneCustomerRefreshToken(refresh_token);
    // S2.1.2: Check is_update_password status, if === true, old token cant be use
    if (!user || user.is_update_password) {
      throw new ApiError(644, 'Please Authenticate');
    } else {
      // S2.1.3: Check Secret key record with the
      const isHaveRecord = await secretService.findOneSecretKey(user.id);

      // S2.1.4: Check if have the record, secretKey use to generate token === record.secret_key else create new record
      if (!isHaveRecord) {
        const newSecretKey = authService.generateRandomSecretString(10);
        const secretKeyData = {
          customer_id: user.id,
          secret_key: newSecretKey,
          status: 1,
        };
        await secretService.createSecretKey(secretKeyData);
        secretKey = newSecretKey;
      } else {
        secretKey = isHaveRecord.secret_key;
      }
      // S2.1.5: Create token and send to client
      const refreshTokenData = {
        access_token: await Utils.createTokenWithCustomerSecret(user.id, secretKey, tokenType.access),
        refresh_token: await Utils.createTokenWithCustomerSecret(user.id, secretKey, tokenType.refresh),
      };
      res.status(httpStatus.OK).send(refreshTokenData);
    }
  } else {
    // Handle new version refresh token
    // S2.2.1: Check secret record. If === false return secretKey === defaultSecretKey else find in the DB with token payload
    if (token_payload.id) {
      if (token_payload.type && token_payload.type !== tokenType.refresh) {
        customLogger.error('Token is not type refresh', req);
        throw new ApiError(httpStatus.BAD_REQUEST, 'Token is not type refresh');
      }
      const checkSecretKey = await secretService.findOneSecretKey(token_payload.id).catch((e) => {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, messageError.InternalServerError.vn);
      });
      if (!checkSecretKey) {
        customLogger.error('Secret Key Not Found', req);
        throw new ApiError(644, 'Please Authenticate');
      }
      secretKey = checkSecretKey.secret_key;
    } else {
      customLogger.error('Invalid Token Payload', req);
      throw new ApiError(644, 'Please Authenticate');
    }

    // S2.2.2: Verify the token with secret key
    Utils.verifyToken(refresh_token, secretKey);

    // S2.2.3: Create token and send to client
    const refreshTokenData = {
      access_token: await Utils.createTokenWithCustomerSecret(token_payload.id, secretKey, tokenType.access),
      refresh_token: await Utils.createTokenWithCustomerSecret(token_payload.id, secretKey, tokenType.refresh),
    };
    res.status(httpStatus.OK).send(refreshTokenData);
  }
});

// API send OTP for forgot password
const forgotPasswordController = catchAsync(async (req, res) => {
  const { demoNumber, zaloDevNumbers, bravigoNumber, phoneNumber } = Utils.getSpecialNumbers(req);

  // S2: Check customer exist
  const customer = await customerService.getOneCustomerByPhone(phoneNumber);
  if (!customer) {
    throw new ApiError(530, `${messageError.customerIdNotExist.vn}`);
  }
  if (customer.active && customer.is_update_password) {
    // S5: Get or create OTP
    let otpCode = await otpService.getOrCreateOtp(customer.id);

    // S6: Check code exist or is is otp require
    if (!otpCode.code || Utils.isOtpResendRequired(customer, otpCode)) {
      otpCode = await otpService.createOtp({
        customer_id: customer.id,
        code: Utils.getOtpCodeForCustomer(customer, demoNumber, bravigoNumber),
        expired_time: Utils.getExpiredTime(),
        request_id: req.requestId,
        is_resend: false,
        otp_active: true,
      });

      // S7: Should send OTP ?
      if (Utils.shouldSendOtp(customer, bravigoNumber, demoNumber)) {
        customLogger.info(`Send OTP code: ${otpCode.code}`);
        const response = await authService.handleSendZNS(otpCode, customer, zaloDevNumbers, req);
        return res.status(httpStatus.OK).send({ ...response.responseData, is_update_password: customer.is_update_password });
      }

      // S8: return status and data
      return res.status(httpStatus.OK).send({
        customer_id: customer.id,
        type: 2,
        otp_time_expired: Utils.getOtpExpirationTime(otpCode),
        is_update_password: customer.is_update_password,
      });
    }

    // S9: Return time remain of OTP
    const timeRemain = Math.abs(getCurrentTimeEpoch() - otpCode.expired_time);
    return res.status(httpStatus.OK).send({
      customer_id: customer.id,
      type: 2,
      otp_time_expired: timeRemain,
      is_update_password: customer.is_update_password,
    });
  }
  throw new ApiError(httpStatus.BAD_REQUEST, `${messageError.phoneNumberNotExist.vn}`);
});

// API update password for old user update, and change password in settings
const updatePasswordController = catchAsync(async (req, res) => {
  // S1: Get password, current password from request
  const { password, current_password } = req.body;
  const customer_id = req.user.id;

  // S2: Check current_password
  if (current_password) {
    const isPasswordValid = await bcrypt.compare(current_password, req.user.password);
    if (!isPasswordValid) {
      throw new ApiError(httpStatus.BAD_REQUEST, `${messageError.changePasswordCurrent.vn}`);
    }
    if (password === current_password) {
      throw new ApiError(httpStatus.BAD_REQUEST, `${messageError.changePasswordSame.vn}`);
    }
  }

  // S3: Get customer data
  const customer = await customerService.findOneCustomerById(customer_id);

  // S4: Generate new secret_key
  const newSecretKey = authService.generateRandomSecretString(10);

  // S4.5: Logout all user
  await secretService.deleteSecretkeyByCustomerId(customer.id);
  const secretKeyData = {
    customer_id: customer.id,
    secret_key: newSecretKey,
    status: 1,
  };
  await secretService.createSecretKey(secretKeyData);

  // S6: Generate access, refresh token
  const access_token = await Utils.createTokenWithCustomerSecret(customer_id, newSecretKey, tokenType.access);
  const refresh_token = await Utils.createTokenWithCustomerSecret(customer_id, newSecretKey, tokenType.refresh);

  // S7: Hash password
  const passwordHash = await bcrypt.hash(password, 8);

  // S8: Save to db
  customer.is_update_password = true;
  customer.password = passwordHash;
  customer.refresh_token = null;

  // S9: Save to db
  await customer.save();

  // S10: Token data
  const tokenData = {
    access_token,
    refresh_token,
  };

  res.status(httpStatus.OK).send(tokenData);
});

// API logout user from app
const logoutController = catchAsync(async (req, res) => {
  // S1: Get customer_id
  const customer_id = req.user.id;

  // S4: Remove secret_key
  await secretService.deleteSecretkeyByCustomerId(customer_id);

  res.status(httpStatus.OK).send({ message: messageSuccess.logoutSuccess.vn });
});

module.exports = {
  loginController,
  refreshTokenNewController,
  forgotPasswordController,
  updatePasswordController,
  logoutController,
  resgisterController,
};
