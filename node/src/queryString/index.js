const logger = require('../util/logger');
const querystring = require('querystring');

const urlStr = 'http://www.baidu.com/a/b?word=测试&val=abc#mnz';

const res = querystring.parse(urlStr);
const decode = querystring.decode(urlStr);
logger.debug('querystring.parse',res);
logger.debug('decode', decode);
