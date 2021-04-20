const logger = require('../util/logger');
const fs = require('fs');

fs.watchFile('./cheese.log', (cur, pre) => {
  console.log('文件改动了');
  // console.log('cur: ', cur);
  // console.log('pre: ', pre);
  // logger.debug('cur', cur);
  // logger.debug('pre', pre);
});
