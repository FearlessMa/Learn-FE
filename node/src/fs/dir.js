const fs = require('fs');
const path = require('path');
const dir = {
  name: '1',
  type: 'dir',
  children: [
    {
      name: '2',
      type: 'dir',
      children: [
        {
          name: '4',
          type: 'text',
          content: '123'
        }
      ]
    },
    {
      name:'3',
      type: 'dir',
    }
  ]
};

// 创建文件件
// fs.mkdir
// fs.mkdirSync

// 递归创建文件夹及文件
function createDir(dir) {
  // path
  const resolvePath = path.resolve(
    __dirname,
    dir.type == 'dir' ? dir.name : dir.name + '.' + dir.type
  );
  if (dir.type == 'dir') {
    let isDir = null;
    try {
      isDir = fs.accessSync(resolvePath);
    } catch (err) {
      isDir = false;
    }
    if (!isDir) {
      fs.mkdirSync(resolvePath);
    }
  } else {
    // 文件
    let isFile = null;
    try {
      isFile = fs.accessSync(resolvePath);
    } catch (err) {
      isFile = false;
    }
    if (!isFile) {
      fs.writeFile(resolvePath, dir.content, (err) => {
        if (err) {
          console.log('err写入失败 ', err);
        } else {
          console.log('写入成功');
        }
      });
    }
  }
  if (dir.children) {
    dir.children.forEach((child) => {
      // process.chdir() 方法可以变更 Node.js 进程的当前工作目录，如果操作失败（例如，指定的 directory 不存在）则抛出异常。
      // process.chdir(resolvePath);
      // console.log(process.cwd());
      createDir({
        ...child,
        name: dir.name + '/' + child.name
      });
    });
  }
}

createDir(dir);

// 
