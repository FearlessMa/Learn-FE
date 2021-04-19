const logger = require('../util/logger');
const config = require('./package.json')

/* 
参考 https://juejin.cn/post/6844903569166958605
*/
// logger.debug('process', process);
// // process.env
// logger.debug('process.env', process.env);
// 环境变量
logger.debug('process.env_NODE', process.env.NODE_ENV);
// 通过npm run 命令执行 可以拿到package.json 中的参数npm_package_
logger.debug('process.env.npm_package_name', process.env.npm_package_name);
logger.debug('process.env.npm_package_version', process.env.npm_package_version);
logger.debug('process.env.npm_package_scripts', process.env.npm_package_scripts);
logger.debug('process.env.npm_package_scripts_test', process.env.npm_package_scripts_test);
logger.debug('process.env.npm_package_main', process.env.npm_package_main);
logger.debug('process.env.npm_config_main', process.env.npm_config_main);

// 命令执行的路径
logger.debug('process.cwd()',process.cwd())
// 命令的参数
logger.debug('process.argv',process.argv)
// 系统架构
logger.debug('process.arch',process.arch)
// package.json
logger.debug('config',config)