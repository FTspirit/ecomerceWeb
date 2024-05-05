const Logger = require('../config/logger');

module.exports.success = (res, data, code) =>
  res.status(code || 200).json({
    success: true,
    data,
  });

module.exports.error = (res, code, message) => {
  Logger.error({
    method: res.req.method,
    originalUrl: res.req.originalUrl,
    code,
    query: res.req.query,
    params: res.req.params,
    body: res.req.body,
    message,
  });
  return res.status(code).json({
    success: false,
    message,
  });
};
