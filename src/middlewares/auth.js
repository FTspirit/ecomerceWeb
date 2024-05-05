/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/order */
const passport = require('passport');
const messageError = require('../config/messageError');
require('./passport')(passport);
const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const Logger = require('../config/logger');

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    Logger.info(info);
    if (err) {
      Logger.error('JwtStrategy Callback Error');
      return reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, messageError.InternalServerError.vn));
    }
    if (info.err === httpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error('JwtStrategy Callback Error');
      return reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, messageError.InternalServerError.vn));
    }
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;
  // Add handle block account
  if (!user.active) {
    return reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Tài khoản bị khóa'));
  }
  if (req.user.id !== Number(req.headers['x-id'])) {
    Logger.error('X-id doesnt match');
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  resolve(user);
};

const auth = () => async (req, res, next) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      {
        session: false,
      },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));

const authInvalid = () => async (req, res, next) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt-invalidate',
      {
        session: false,
      },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));

const authV2 = () => async (req, res, next) =>
  new Promise(async (resolve, reject) => {
    passport.authenticate(
      'jwt-v2',
      {
        session: false,
      },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));

module.exports = {
  auth,
  authV2,
  authInvalid,
};
