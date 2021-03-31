export default class Promise {
  constructor(executor) {
    this.promiseState = 'pending';
    this.promiseResult = null;
    // 存储异步调用的 onResolved onRejected
    this.callbacks = [];
    // 绑定this
    // this._resolve = this._resolve.bind(this)
    // this._reject = this._reject.bind(this)
    // 初始化调用  executor
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (e) {
      this._reject(e);
    }
  }
  _resolve(data) {
    // 状态只能改变一次
    if (this.promiseState != 'pending') return;
    // 改变为成功状态
    this.promiseState = 'fulfilled';
    this.promiseResult = data;
    setTimeout(() => {
      this.callbacks.forEach((item) => {
        item.onResolved(data);
      });
    });
    return data;
  }
  _reject(data) {
    // 状态只能改变一次
    if (this.promiseState != 'pending') return;
    // 改变为成功状态
    this.promiseState = 'rejected';
    this.promiseResult = data;
    setTimeout(() => {
      this.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    });
    return data;
  }
  //  then 方法返回promise 类型数据 ，数据是基本类型返回promise
  then(onResolved, onRejected) {
    const _this = this;
    if (typeof onResolved !== 'function') {
      onResolved = (res) => res;
    }
    if (typeof onRejected !== 'function') {
      onRejected = (res) => {
        throw res;
      };
    }
    return new Promise((resolve, reject) => {
      function callback(type) {
        try {
          let res = type(_this.promiseResult);
          // 判断res类型 Promise实例 或其他
          if (res instanceof Promise) {
            res.then(
              (v) => {
                resolve(v);
              },
              (r) => {
                reject(r);
              }
            );
          } else {
            resolve(res);
          }
        } catch (e) {
          reject(e);
        }
      }
      // 同步 改变状态
      if (this.promiseState == 'fulfilled') {
        callback(onResolved);
      }
      if (this.promiseState == 'rejected') {
        callback(onRejected);
      }

      // 异步 改变状态
      if (this.promiseState == 'pending') {
        this.callbacks.push({
          onResolved: function () {
            callback(onResolved);
          },
          onRejected: function () {
            callback(onRejected);
          }
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(
          (v) => resolve(v),
          (r) => reject(r)
        );
      } else {
        resolve(value);
      }
    });
  }
  static reject(value) {
    return new Promise((resolve, reject) => {
      reject(value);
    });
  }
  static all(promises) {
    let result = [];
    let idx = 0;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (v) => {
            result[i] = v;
            if (idx == promises.length - 1) {
              resolve(result);
            }
            idx++;
          },
          (r) => {
            reject(r);
          }
        );
      }
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (v) => {
            resolve(v);
          },
          (r) => {
            reject(r);
          }
        );
      }
    });
  }
}
