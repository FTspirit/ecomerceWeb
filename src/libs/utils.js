/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
const randomstring = require('randomstring');
const Promise = require('promise');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const base64url = require('base64url');
const randToken = require('rand-token');
const otpGenerator = require('otp-generator');
const httpStatus = require('http-status');
const { parsePhoneNumber } = require('awesome-phonenumber');
const ApiError = require('../helpers/ApiError');
const config = require('../config/config');
const token_type = require('../config/token_type');
const customLogger = require('../helpers/custom.logger');

const generateCode = () => {
  return otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
};

const getCurrentTimeEpoch = () => parseInt(new Date().getTime() / 1000, 10);

// check time < 5 send new OTP
function isOtpResendRequired(customer, otpCode) {
  const timeRemain = Math.abs(getCurrentTimeEpoch() - otpCode.expired_time);
  return timeRemain < 5;
}

// Check demo number and bravigo number from customer
function getOtpCodeForCustomer(customer, demoNumber, bravigoNumber) {
  if (customer.phone_number === demoNumber) {
    return '235768';
  }
  if (customer.id === config.log.dev_id) {
    return '999999';
  }
  if (customer.phone_number === bravigoNumber) {
    return '123321';
  }
  return generateCode();
}

// Check should send OTP code
function shouldSendOtp(customer, bravigoNumber, demoNumber) {
  return (
    customer.phone_number !== bravigoNumber && customer.phone_number !== demoNumber && customer.id !== config.log.dev_id
  );
}

// Get OTP or return expiration time of OTP
function getOtpExpirationTime(otpCode) {
  return otpCode ? Math.abs(getCurrentTimeEpoch() - otpCode.expired_time) : config.otp.otpExpirationSecond;
}

// Get special number
function getSpecialNumbers(data) {
  const demoNumber = parsePhoneNumber(config.phoneNumber.demo, { regionCode: 'VN' }).number.e164;
  const bravigoNumber = parsePhoneNumber(config.phoneNumber.bravigo, { regionCode: 'VN' }).number.e164;
  const zaloDevNumbers = config.phoneNumber.zalo.map((number) => parsePhoneNumber(number, { regionCode: 'VN' }).number.e164);
  const phoneNumber = parsePhoneNumber(data.body.phone_number, { regionCode: 'VN' }).number.e164;
  return { demoNumber, zaloDevNumbers, bravigoNumber, phoneNumber };
}

module.exports = {
  isOtpResendRequired,
  getOtpCodeForCustomer,
  shouldSendOtp,
  getOtpExpirationTime,
  getSpecialNumbers,
};

module.exports.decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports.verifyToken = (token, secret_key) => {
  try {
    return jwt.verify(token, secret_key);
  } catch (e) {
    customLogger.error('Verify Token Error', null);
    throw new ApiError(644, 'Please Authenticate');
  }
};

module.exports.getBearerToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2 && parted[0] === 'Bearer') {
      return parted[1];
    }
    return null;
  }
  return null;
};

module.exports.createTokenWithCustomerSecret = (id, secret_key, type) =>
  new Promise((resolve, reject) => {
    let expiresIn;
    if (type === token_type.refresh) {
      expiresIn = 60 * 60 * 24 * config.jwt.refreshExpirationDays;
    } else if (type === token_type.access) {
      expiresIn = 60 * config.jwt.accessExpirationMinutes;
    }
    const token = jwt.sign(JSON.parse(JSON.stringify({ id, type })), secret_key, {
      expiresIn,
      keyid: config.jwt.keyID,
    });
    jwt.verify(token, secret_key, (err, data) => {
      if (err) {
        resolve(false);
      }
    });
    resolve(token);
  });

module.exports.createToken = (id) =>
  new Promise((resolve, reject) => {
    const token = jwt.sign(JSON.parse(JSON.stringify({ id })), config.jwt.secret, {
      expiresIn: 60 * config.jwt.accessExpirationMinutes,
      keyid: config.jwt.keyID,
    });
    jwt.verify(token, config.jwt.secret, (err, data) => {
      if (err) {
        resolve(false);
      }
    });
    resolve(token);
  });

module.exports.getOtpCode = () => generateCode();

module.exports.getExpiredTime = () => parseInt((new Date().getTime() + config.otp.otpExpirationSecond * 1000) / 1000);

module.exports.getCurrentTimeEpoch = () => getCurrentTimeEpoch;

module.exports.getCurrentTime = () => parseInt(new Date().getTime() / 1000);

module.exports.generateCodeVerifier = () => randomstring.generate(43);

module.exports.generateTrackingId = () => randomstring.generate(48);

// eslint-disable-next-line camelcase
module.exports.generateCodeChallenge = (code_verifier) => {
  const base64Digest = crypto.createHash('sha256').update(code_verifier).digest('base64');
  return base64url.fromBase64(base64Digest);
};

module.exports.generateState = () => crypto.randomBytes(4).toString('hex');

module.exports.createRefreshToken = () => {
  const token = randToken.generate(255);
  return token;
};
