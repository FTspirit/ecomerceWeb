const morgan = require('morgan');
const config = require('./config');
const customLogger = require('../helpers/custom.logger');

morgan.token('message', (req, res) => res.locals.errorMessage || '');
morgan.token('xId', (req, res) => req.headers['x-id'] || '');
morgan.token('xRequestId', (req, res) => req.requestId);

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = ` :xRequestId - :xId - ${getIpFormat()}:method :url :req[Authorization] :status - :response-time ms`;
const errorResponseFormat = ` :xRequestId - :xId - ${getIpFormat()}:method :url :req[Authorization] :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => customLogger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => customLogger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
