const log4js = require('log4js');
const fs = require('fs');
const path = require('path');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('cheese');

// const keys = Reflect.ownKeys(logger);
const keys = Reflect.ownKeys(logger.constructor.prototype);

const obj = {};

keys.forEach((key) => {
  obj[key] = (...arg) => {
    clearLog('cheese.log');
    logger[key](...arg);
  };
});

function clearLog(fileName) {
  // 执行命令的路径
  const cwd = process.cwd();
  // 文件的路径
  const filePath = path.resolve(cwd, fileName);
  // fs.stats.isFile()
  // 是否为文件
  const isFile = fs.statSync(filePath).isFile();
  if (isFile) {
    fs.writeFileSync(filePath, '');
  }
}

module.exports = obj;
