const fs = require('fs');

// fs.readFile('./cheese.log', { encoding: 'utf-8' }, (err, data) => {
// 字符流
//   console.log('data: ', data);
// });

const readStream = fs.createReadStream('./cheese.log');

const writeStream = fs.createWriteStream('./b.log', { flags: 'a+' });

readStream.pipe(writeStream);
// console.log('readStream: ', readStream);
// let data = '';
// readStream.on('data', (chunk) => {
//   // 读到的是buffer
//   console.log('chunk: ', chunk);
//   data += chunk;
// });
// readStream.on('end',()=>{
//   // console.log('data: ', data);
// })
// // fs.ReadStream;
