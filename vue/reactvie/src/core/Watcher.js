import Dep from './Dep';

let uid = 0;

export default class Watcher {
  // targetObj  express :'a.b.c.d'
  constructor(targetObj, expression, callback) {
    console.log('watcher的构造函数');
    this.id = uid++;
    this.targetObj = targetObj;
    this.callback = callback;
    this.getter = parsePath(expression);
    this.value = this.get();
  }
  update() {
    console.log('=========== update =========== ');
    this.run();
  }
  // 依赖收集阶段
  get() {
    // 赋值 watcher 到 全局
    Dep.target = this;
    const obj = this.targetObj;
    let value;
    try {
      value = this.getter(obj);
    } finally {
      Dep.target = null;
    }
    return value;
  }

  run() {
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(cb) {
    const newValue = this.get();
    if (newValue !== this.value) {
      const oldValue = this.value;
      this.value = newValue;
      cb(newValue,oldValue);
    }
  }
}

function parsePath(exp) {
  const segment = exp.split('.');
  return function (obj) {
    segment.forEach((key) => {
      console.log('key: ', key);
      obj = obj[key];
    });
    return obj;
  };
}
