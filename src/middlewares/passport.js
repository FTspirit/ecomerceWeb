/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const httpStatus = require('http-status');
const config = require('../config/config');
const Logger = require('../config/logger');
const secretService = require('../services/secret_key.service');
const Utils = require('../libs/utils');
const db = require('../models');
const token_type = require('../config/token_type');
const ApiError = require('../helpers/ApiError');
const { error } = require('../helpers/custom.logger');

// load up the user model
const { Customer, secretKey } = db;

module.exports = function (passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: config.jwt.secret,
    failWithError: true,
  };
  const optsInvalidate = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: config.jwt.secret,
    ignoreExpiration: true,
  };

  const otpsCustomSecretKey = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    passReqToCallback: true,
    secretOrKeyProvider:  async (req, rawJwtToken, done) => {
      try {
        const payload = Utils.decodeToken(rawJwtToken);
        if (!payload) {
          done(null, null)
        }
        if (payload.type && payload.type !== token_type.access) {
          done(null, null)
        }
        req.jwt_payload = payload;
        const user = await Customer.findOne({
          where: {
            id: payload.id,
          },
        })
        req.user = user;
        if (!user) {
          done(null, null)
        }
        // Check payload.type because old token didn't have field type
        if (payload.type) {
          const secretKeydata = await secretService.findOneSecretKey(user.id)
          if (secretKeydata) {
            return done(null, secretKeydata.secret_key);
          }
            return done(null, null)
        } 
          return done(null,config.jwt.secret);
      } catch (e) {
        done( {err:httpStatus.INTERNAL_SERVER_ERROR}, null)
      }
    },
  };

  passport.use(
    'jwt-v2',
    new JwtStrategy(otpsCustomSecretKey, async (req,jwtPayload, done) => {
      if (jwtPayload.id === config.log.dev_id) {
        Logger.info('Authen handle');
      }
      if (jwtPayload.type && jwtPayload.type !== token_type.access) {
        done(null, false);
      } else {
        try {
          done(null, req.user);
        } catch (error) {
          done(error, false);
        }
      }
    })
  );

  passport.use(
    'jwt',
    new JwtStrategy(opts, async (jwtPayload, done) => {
      if (jwtPayload.id === config.log.dev_id) {
        Logger.info('Authen handle');
      }
      Customer.findOne({
        where: {
          id: jwtPayload.id,
        },
      })
        .then((customerData) => done(null, customerData))
        .catch((error) => done(error, false));
    })
  );
  passport.use(
    'jwt-invalidate',
    new JwtStrategy(optsInvalidate, (jwtPayload, done) => {
      if (jwtPayload.id) {
        Logger.info(`${jwtPayload.id}`);
      }
      Customer.findOne({
        where: {
          id: jwtPayload.id,
        },
      })
        .then((customerData) => done(null, customerData))
        .catch((error) => done(error, false));
    })
  );
};
