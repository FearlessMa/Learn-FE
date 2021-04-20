const logger = require('../util/logger');

const fs = require('fs');

// 读取文件状态
const stat = fs.statSync('./index.js');

logger.debug('stat', stat);

// 判断是否为dir
const isDir = stat.isDirectory();

logger.debug('isDir', isDir);

// 判断是否为file
const isFile = stat.isFile();

logger.debug('isFile', isFile);

const statPrototype = stat.constructor.prototype;

logger.debug('statPrototype', statPrototype);

// 监控文件改变
// fs.watchFile

// 同步异步读取
// fs.readFileSync
// fs.readFile

// logger.debug('url',url)

// 追加文件
// fs.appendFile

// 删除文件
// fs.unlinkSync
// fs.unlink
// fs.unlink('./copy.log',(err)=>{
//   console.log('删除成功')
// })

// node v14以后可用
// fs.rm
// fs.rmSync

fs.rm('./copy.log',(err)=>{
  if(!err){
    console.log("删除成功")
  }
})

// 创建文件夹
// fs.mkdir
// fs.mkdirSync


// 删除文件夹
// fs.rmdir
// fs.rmdirSync
