const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { adminService, mentorService, studentService } = require('../services/index');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtOptionsInvalidDate = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: true,
};

const jwtVerify = async (payload, done) => {
  try {
    let user;
    if (payload.type === tokenTypes.ADMIN) {
      user = await adminService.getUserById(payload.sub);
    } else if (payload.type === tokenTypes.MENTOR) {
      user = await mentorService.getUserById(payload.sub);
    } else if (payload.type === tokenTypes.STUDENT) {
      user = await studentService.getUserById(payload.sub);
    } else {
      throw new Error('Invalid token type');
    }
    if (!user) {
      return done(null, false);
    }
    user.tokenTypes = payload.type;
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtVerifyInvalidDate = async (payload, done) => {
  try {
    let user;
    if (payload.type === tokenTypes.ADMIN) {
      user = await adminService.getUserById(payload.sub);
    } else if (payload.type === tokenTypes.MENTOR) {
      user = await mentorService.getUserById(payload.sub);
    } else if (payload.type === tokenTypes.STUDENT) {
      user = await studentService.getUserById(payload.sub);
    } else {
      throw new Error('Invalid token type');
    }
    if (!user) {
      return done(null, false);
    }
    user.tokenTypes = payload.type;
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const jwtStrategyInvalidDate = new JwtStrategy(jwtOptionsInvalidDate, jwtVerifyInvalidDate);

module.exports = {
  jwtStrategy,
  jwtStrategyInvalidDate,
};
