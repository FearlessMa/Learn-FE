const log4js = require('log4js');
const path = require('path');
const log = require('./logger');
// log4js.configure({
//   appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
//   categories: { default: { appenders: ['cheese'], level: 'info' } }
// });

// const logger = log4js.getLogger('cheese');
// logger.level = 'info';
// logger.info(path);
log(path);
