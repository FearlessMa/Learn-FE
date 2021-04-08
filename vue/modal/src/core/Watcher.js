import Dep from './Dep';

let id = 0;

export default class Watcher {
  // express 可能是 a.b.c
  constructor(targetObj, express, callback) {
    this.uid = id++;
    this.target = targetObj;
    this.getter = this.parsePath(express);
    this.value = this.get();
    this.callback = callback;
  }
  update() {
    console.log('依赖更新了');
    this.run();
  }

  parsePath(express) {
    const keys = express.split('.');
    return function (obj) {
      keys.forEach((key) => {
        obj = obj[key];
      });
      return obj;
    };
  }

  run() {
    this.getValueAndInvoke(this.callback);
  }
  // 依赖收集
  get() {
    console.log('watcher收集依赖')
    Dep.target = this;
    let value;
    try {
      value = this.getter(this.target);
    } catch (e) {}finally{
      Dep.target = null;
    }
    return value;
  }

  getValueAndInvoke(cb) {
    // 获取值 并 更新依赖收集
    const newValue = this.get(this.target);
    cb.call(this.target, newValue, this.value);
    this.value = newValue;
  }
}
