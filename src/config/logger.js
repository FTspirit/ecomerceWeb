// /* eslint-disable no-shadow */
// const { createLogger, format, transports } = require('winston');
// require('winston-daily-rotate-file');

// const { timestamp, printf } = format;
// const moment = require('moment');
// const config = require('./config');

// // https://github.com/winstonjs/winston#logging
// // https://github.com/winstonjs/winston-daily-rotate-file
// // { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
// const myFormat = printf(({ timestamp, level, message }) => {
//   const logObj = {
//     level,
//     timestamp,
//     message,
//     epoch: moment(timestamp).valueOf(),
//   };
//   return JSON.stringify(logObj);
// });

// const productionFormat = format.combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), myFormat);

// function TransportLevel(level) {
//   return new transports.DailyRotateFile({
//     name: level,
//     dirname: `${config.log.location}`,
//     filename: `${level}-%DATE%.log`,
//     datePattern: 'YYYY-MM-DD',
//     level,
//     zippedArchive: false,
//     json: true,
//     maxSize: '15m',
//     maxFiles: '11',
//   });
// }

// const TransportAlLevel = new transports.DailyRotateFile({
//   dirname: `${config.log.location}`,
//   filename: '%DATE%.log',
//   datePattern: 'YYYY-MM-DD',
//   zippedArchive: false,
//   json: true,
//   maxSize: '10m', // 10MB
//   maxFiles: '11', // 11 files, if want rotate by day, add 'd' like 11d <=> 11 days
// });

// let configTransports = [];
// if (config.log.level === 'info') {
//   configTransports = [TransportAlLevel, TransportLevel('error')];
// } else if (config.log.level === 'error') {
//   configTransports = [TransportLevel('error')];
// }
// const logger = createLogger({
//   level: config.log.level,
//   format: productionFormat,
//   transports: configTransports,
//   exceptionHandlers: [new transports.File({ filename: `${config.log.location}/exceptions.log` })],
// });

// logger.stream = {
//   write(message, encoding) {
//     logger.info(message);
//   },
// };

// module.exports = logger;

const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const { timestamp, printf } = format;
const moment = require('moment');
const config = require('./config');

// https://github.com/winstonjs/winston#logging
// https://github.com/winstonjs/winston-daily-rotate-file
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const myFormat = printf(({ _timestamp, level, message }) => {
  const ts = moment(_timestamp).format('YYYY-MM-DD HH:mm:ss.SSS');
  const formattedLevel = level || '-';
  const formattedMessage = message || '-';
  return `${formattedLevel} [${ts}] ${formattedMessage}`;
});

const productionFormat = format.combine(myFormat);

function TransportLevel(level) {
  return new transports.DailyRotateFile({
    name: level,
    dirname: `${config.log.location}`,
    filename: `${level}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    level,
    zippedArchive: false,
    json: true,
    maxSize: '15m',
    maxFiles: '11',
  });
}

const TransportAlLevel = new transports.DailyRotateFile({
  dirname: `${config.log.location}`,
  filename: '%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  json: true,
  maxSize: '10m', // 10MB
  maxFiles: '11', // 11 files, if want rotate by day, add 'd' like 11d <=> 11 days
});

let configTransports = [];
if (config.log.level === 'info') {
  configTransports = [TransportAlLevel, TransportLevel('error')];
} else if (config.log.level === 'error') {
  configTransports = [TransportLevel('error')];
}
const logger = createLogger({
  level: config.log.level,
  format: productionFormat,
  transports: configTransports,
  exceptionHandlers: [new transports.File({ filename: `${config.log.location}/exceptions.log` })],
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
