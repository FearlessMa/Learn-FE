const logger = require('../util/logger');
const http = require('http');
const https = require('https');

// const serve = http.createServer((req, res) => {});
// serve.listen(9000, () => {
//   console.log('serve is running at localhost:9000');
// });

// logger.debug('http',http)
// http 头的最大字节数 16kb
const maxHeaderSize = http.maxHeaderSize;
logger.debug('maxHeaderSize', maxHeaderSize);

// 请求方法
const METHODS = http.METHODS;
logger.debug('METHODS', METHODS);
// 请求状态码
const STATUS_CODES = http.STATUS_CODES;
logger.debug('STATUS_CODES', STATUS_CODES);
// 发起请求
// const req = https.request('https://www.baidu.com', (res) => {
//   console.log('res: ', res);
//   res.on('data', (chunk) => {
//     console.log(`响应主体: ${chunk}`);
//   });
//   res.on('end', () => {
//     console.log('响应中已无数据。');
//   });
// });

// req.on('error', (e) => {
//   console.error(`请求遇到问题: ${e.message}`);
// });
// console.log('req: ', req);

// http.get('http://www.baidu.com',(res)=>{
//   res.on('data', (chunk) => {
//     console.log(`响应主体: ${chunk}`);
//   });
//   res.on('end', () => {
//     console.log('响应中已无数据。');
//   });
// })

const agent = http.Agent;
logger.debug('agent', agent);
