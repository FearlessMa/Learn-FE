import Dep from './Dep';

export default class Watcher {
  constructor(targetObj, express, callback) {
    console.log('express: ', express);
    this.targetObj = targetObj;
    this.callback = callback;
    this.getter = this.parsePath(express);
    this.value = this.get();
  }

  update() {
    console.log('依赖更新');
    this.run();
  }

  parsePath(express) {
    const keyList = express.split('.');
    return function (obj) {
      keyList.forEach((key) => {
        obj = obj[key];
      });
      return obj;
    };
  }
  get() {
    const obj = this.targetObj;
    let value;
    Dep.target = this;
    try {
      value = this.getter(obj);
    } catch (err) {
      console.log('err: ', err);
    } finally {
      Dep.target = null;
    }
    return value;
  }
  run() {
    this.getValueAndInvoke(this.callback);
  }
  getValueAndInvoke(cb) {
    const newValue = this.get();
    const value = this.value;
    this.value = newValue;
    cb(newValue, value);
  }
}
