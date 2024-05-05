const TaskCheckLics = require('node-cron');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const customLogger = require('../src/helpers/custom.logger');
const { zaloTokenController } = require('../src/controllers');

TaskCheckLics.schedule(
  '*/45 * * * *',
  () => {
    const req = {
      requestId: uuidv4(),
      headers: {
        'x-id': 0,
      },
    };
    customLogger.info(
      `Running Zalo renew access token at ${moment(Date.now()).format('DD/MM/YYYY hh:mm:ss')} at Asia/Bangkok timezone`,
      req
    );

    zaloTokenController.cronJobRenewAccessToken(req);
  },
  {
    scheduled: true,
    timezone: 'Asia/Bangkok',
  }
);
