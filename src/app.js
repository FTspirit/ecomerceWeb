const { v4: uuidv4 } = require('uuid');
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const config = require('./config/config');
const morgan = require('./config/morgan');
const routesV4 = require('./routes/v4');
const { errorConverter, errorHandler } = require('./middlewares/error');

const ApiError = require('./helpers/ApiError');

const app = express();

// CronJob;
// require('../cronjob/zalo.renew.accesstoken');
// require('../cronjob/queryLicensePlate');
// require('../cronjob/sendPenaltyNotification');

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// add requestId to request
app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'];
  req.requestId = requestId || uuidv4();
  next();
});

// enable cors
app.use(cors());
app.use(express.json());

// v1 api routes
app.use('/v4', routesV4);

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
