const TaskCheckLics = require('node-cron');
const Logger = require('../src/config/logger');
const { carController } = require('../src/controllers/index');

// 0-7 (or names, 0 or 7 are sunday)
TaskCheckLics.schedule(
  '0 1 * * 5',
  () => {
    Logger.info('Running a job at 01:00 on Friday at Asia/Bangkok timezone');
    carController.JobQueryLicensePlate();
  },
  {
    scheduled: true,
    timezone: 'Asia/Bangkok',
  }
);
