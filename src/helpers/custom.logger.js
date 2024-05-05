const logger = require('../config/logger');

const customLogger = {
  info: (payload, req) => {
    const formattedPayload = payload || '';
    const formattedXId = req ? req.headers['x-id'] || '' : '';
    const httpContext = req ? `${req.requestId} - ${formattedXId} -` : undefined;
    const formattedHttpContext = httpContext || '';
    const message = `${formattedHttpContext} ${formattedPayload}`;
    logger.info(message.trim());
  },
  error: (payload, req) => {
    const formattedPayload = payload || '';
    const formattedXId = req ? req.headers['x-id'] || '' : '';
    const httpContext = req ? `${req.requestId} - ${formattedXId} -` : undefined;
    const formattedHttpContext = httpContext || '';
    const message = `${formattedHttpContext} ${formattedPayload}`;
    logger.error(message.trim());
  },
};

module.exports = customLogger;
