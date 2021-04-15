const logger = require('../util/logger');
const url = require('url');

const urlStr = 'http://www.baidu.com/a/b?word=1234&val=abc#mnz';

const params = url.parse(urlStr);
const format = url.format(params);
const urlObj = new URL(urlStr);
/*
{
  href: 'http://www.baidu.com/a/b?word=1234&val=abc#mnz',
  origin: 'http://www.baidu.com',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'www.baidu.com',
  hostname: 'www.baidu.com',
  port: '',
  pathname: '/a/b',
  search: '?word=1234&val=abc',
  searchParams: URLSearchParams { 'word' => '1234', 'val' => 'abc' },
  hash: '#mnz'
}
*/
logger.debug(params);


logger.debug(format);
logger.debug(urlObj)
