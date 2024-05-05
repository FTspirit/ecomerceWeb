const joi = require('joi');

const { otp, mobilePhone, password } = require('./custom.validation');

const logout = {
  body: joi.object().keys({}),
};

const checkAccountStatus = {
  body: joi.object().keys({
    phone_number: joi.string().required().custom(mobilePhone),
  }),
};

const login = {
  body: joi.object().keys({
    phone_number: joi.string().required().custom(mobilePhone),
  }),
};

const loginWithPassword = {
  body: joi.object().keys({
    phone_number: joi.string().required().custom(mobilePhone),
    password: joi.string().required().custom(password),
  }),
};

const verifyOtp = {
  body: joi.object().keys({
    customer_id: joi.number().integer().required(),
    code: joi.string().required().custom(otp),
  }),
};

const refreshToken = {
  body: joi.object().keys({
    refresh_token: joi.string().required(),
  }),
};

const refreshTokenNew = {
  body: joi.object().keys({
    refresh_token: joi.string().required(),
  }),
};

const resendOtp = {
  body: joi.object().keys({
    customer_id: joi.number().integer().required(),
    type: joi.alternatives().try(joi.number().valid(1), joi.number().valid(2)).required(),
  }),
};

const requirePassword = {
  body: joi.object().keys({
    password: joi.string().required().custom(password),
    code: joi.string().required().custom(otp),
  }),
};

const forgotPassword = {
  body: joi.object().keys({
    phone_number: joi.string().required().custom(mobilePhone),
  }),
};

const changePassword = {
  body: joi.object().keys({
    current_password: joi.string(),
    new_password: joi.string().required().custom(password),
  }),
};

const verifyOtpCode = {
  body: joi.object().keys({
    customer_id: joi.number().integer().required(),
    code: joi.string().required().custom(otp),
  }),
};

const updatePassword = {
  body: joi.object().keys({
    password: joi.string().required().custom(password),
    current_password: joi.string().allow(null, ''),
  }),
};

module.exports = {
  login,
  loginWithPassword,
  verifyOtp,
  refreshToken,
  refreshTokenNew,
  resendOtp,
  checkAccountStatus,
  requirePassword,
  forgotPassword,
  changePassword,
  verifyOtpCode,
  updatePassword,
  logout,
};
