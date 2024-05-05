/* eslint-disable no-await-in-loop */
const TaskCheckLics = require('node-cron');
const Logger = require('../src/config/logger');
const { carController } = require('../src/controllers/index');

// 0-7 (or names, 0 or 7 are sunday)
TaskCheckLics.schedule(
  '00 14 * * 3',
  () => {
    Logger.info('Running a job at 14:00 on Wednesday at Asia/Bangkok timezone');
    carController.CheckAndSendNoti();
  },
  {
    scheduled: true,
    timezone: 'Asia/Bangkok',
  }
);

// // 0-7 (or names, 0 or 7 are sunday)
// TaskCheckLics.schedule(
//   '0 15 * * 4',
//   () => {
//     Logger.info('Running a job at 14:00 on Wednesday at Asia/Bangkok timezone');
//     carController.CheckAndSendNoti();
//   },
//   {
//     scheduled: true,
//     timezone: 'Asia/Bangkok',
//   }
// );
