const path = require('path');
const logger = require('../util/logger');

logger.debug('path', path);

// 全局变量
logger.debug('__dirname', __dirname);

// 返回绝对路径
const resolvePath = path.resolve(__dirname, './index.js');
logger.debug('resolvePath', resolvePath);

// 拼接路径
const joinPath = path.join(__dirname, './index.js');
logger.debug('joinPath', joinPath);

// 是否为绝对路径
const isAbsolutePath = path.isAbsolute(joinPath)
logger.debug('isAbsolutePath', isAbsolutePath);

// 统一处理平台路径的差异化
const normalize = path.normalize(resolvePath);
logger.debug('normalize', normalize);

// 解析路径
const parsePath = path.parse(resolvePath);
logger.debug('parsePath', parsePath);
//  平台的分隔符 The platform-specific file separator. '\' or '/'.
const sep = path.sep;
logger.debug('sep', sep);

// 返回路径的最后一部分
const basename = path.basename(resolvePath);
logger.debug('basename', basename);

// 返回文件路径
const dirname = path.dirname(resolvePath)
logger.debug('dirname', dirname);

// 返回文件扩展名
const extname = path.extname(resolvePath)
logger.debug('extname', extname);

// 通过绝对路径 获取相对路径
const indexPath = path.resolve(__dirname,'./index.js')
const loggerPath  = path.resolve(__dirname,'../util/logger.js')
const relativePath = path.relative(indexPath,loggerPath)

logger.debug('relativePath', relativePath);
