export default function Promise(executor) {
  this.promiseResult = null;
  this.promiseState = 'pending';
  this.callbacks = [];
  const that = this;
  // resolve 方法
  function resolve(value) {
    if (that.promiseState != 'pending') return;

    that.promiseResult = value;
    that.promiseState = 'fulfilled';

    that.callbacks.forEach((cbObj) => {
      cbObj.onResolved(value);
    });
  }
  // reject 方法
  function reject(value) {
    if (that.promiseState != 'pending') return;

    that.promiseResult = value;
    that.promiseState = 'rejected';

    that.callbacks.forEach((cbObj) => {
      cbObj.onRejected(value);
    });
  }

  try {
    // 执行器函数调用
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const that = this;
  if (typeof onResolved != 'function') {
    onResolved = (res) => res;
  }
  if (typeof onRejected != 'function') {
    onRejected = function (res) {
      throw res;
    };
  }
  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        let res = type(that.promiseResult);
        if (res instanceof Promise) {
          res.then(
            (r) => {
              resolve(r);
            },
            (e) => {
              reject(e);
            }
          );
        } else {
          resolve(res);
        }
      } catch (err) {
        reject(err);
      }
    }
    if (that.promiseState == 'fulfilled') {
      callback(onResolved);
    }

    if (that.promiseState == 'rejected') {
      callback(onRejected);
    }

    if (that.promiseState == 'pending') {
      that.callbacks.push({
        onResolved: function () {
          callback(onResolved);
        },
        onRejected: function () {
          callback(onRejected);
        }
      });
    }
  });
};

Promise.prototype.catch = function (onReject) {
  this.then(undefined, onReject);
};

Promise.all = function (pArr) {
  console.log('pArr: ', pArr);
  const result = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    pArr.forEach((p, i) => {
      p.then(
        (res) => {
          result[i] = res;
          count++;
          if (count == pArr.length) {
            resolve(result);
            return result;
          }
        },
        (reason) => {
          reject(reason);
          return reason;
        }
      );
    });
  });
};

Promise.race = function (pArr) {
  return new Promise((resolve, reject) => {
    pArr.forEach((p, i) => {
      p.then(
        (res) => {
          resolve(res);
          return res;
        },
        (reason) => {
          reject(reason);
          return reason;
        }
      );
    });
  });
};
