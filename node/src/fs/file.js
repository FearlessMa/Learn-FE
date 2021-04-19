const fs = require('fs');


// 删除文件
// fs.unlinkSync
fs.unlink('./copy.log',(err)=>{
  console.log('删除成功')
})

// 异步读写文件
// fs.readFile('./cheese.log', (err, data) => {
//   console.log('data: ', data);
//   fs.writeFile('./copy.log', data, (err) => {
//     console.log('写入完成');
//   });
// });


let data = null;
try {
  data = fs.readFileSync('./cheese.log');
  fs.writeFileSync('./copy.log', data);
} catch (err) {
  console.log('err: ', err);
}
console.log('写入完成');

// 追加文件
// fs.appendFileSync
fs.appendFile('./copy.log', data, (err) => {
  console.log('追加完成')
});
