// const http = require('http');
const logger = require('../util/logger');
const fs = require('fs');

// const serve = http.createServer((req, res) => {});
// serve.listen(9000, () => {
//   console.log('serve is running at localhost:9000');
// });

fs.watchFile('./cheese.log', (cur, pre) => {
  console.log('文件改动了');
  // console.log('cur: ', cur);
  // console.log('pre: ', pre);
  // logger.debug('cur', cur);
  // logger.debug('pre', pre);
});
