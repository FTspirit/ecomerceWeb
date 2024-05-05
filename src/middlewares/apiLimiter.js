const rateLimit = require('express-rate-limit');
const config = require('../config/config');
const messageError = require('../config/messageError');

module.exports = function (
  windowTime = config.rateLimiter.windowTimeSecondDefault,
  maxRequest = config.rateLimiter.maxDefault
) {
  return rateLimit({
    windowMs: windowTime * 1000, // 1000ms
    max: maxRequest,
    handler(req, res) {
      res.status(429).send({
        message: messageError.tooManyRequest.vn,
      });
    },
  });
};
