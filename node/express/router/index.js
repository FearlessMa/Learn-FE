const Router = require('express').Router;
const fs = require('fs');
const path = require('path');

const router = Router();

router.get('/', (req, res, next) => {
  res.send(req.query);
  next();
});

router.get('/api', (req, res, next) => {
  res.send(req.query);
  next();
});

const routesPath = path.resolve(__dirname, 'routes');

function getRoutesMap(routesPath, basePath = '/') {
  let routesMap = {};
  // 是否存在
  let has = fs.existsSync(routesPath);
  if (!has) return;
  // 文件状态
  const stat = fs.statSync(routesPath);
  const isDir = stat.isDirectory();
  if (isDir) {
    // 读取目录下所有文件
    const files = fs.readdirSync(routesPath);
    files.forEach((name) => {
      // 获取绝对路径
      const absolutePath = path.join(routesPath, name);
      // 获取文件状态
      let isFile = fs.statSync(absolutePath).isFile();
      if (isFile) {
        // 获取路径不带扩展名的 basename
        const basename = path.basename(absolutePath, '.js');
        const key = path.join('/', basePath, basename);
        const value = absolutePath;
        routesMap[key] = value;
      } else {
        const nextBasePath = path.join('/', basePath, name);
        const map = getRoutesMap(absolutePath, nextBasePath);
        routesMap = Object.assign(routesMap, map);
      }
    });
  }
  return routesMap;
}

const routesMap = getRoutesMap(routesPath, '/');
console.log('routesMap: ', routesMap);

function registerRoute(routes = []) {
  Object.entries(routes).forEach(([k, v]) => {
    let module = require(v);
    router.use(k, module);
  });
}

console.log('routesPath: ', routesPath);
registerRoute(routesMap);

module.exports = { router, registerRoute };
