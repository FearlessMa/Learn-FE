function Promise(exec) {
  this.PromiseStats = 'pending';
  this.PromiseResult = null;
  this.callbacks = [];
  const _this = this;
  function resolve(data) {
    if (_this.PromiseStats !== 'pending') return;
    _this.PromiseStats = 'fulfiled';
    _this.PromiseResult = data;

    setTimeout(() => {
      _this.callbacks.forEach((item) => {
        item.onResolved(data);
      });
    });
  }

  function reject(data) {
    if (_this.PromiseStats !== 'pending') return;
    _this.PromiseResult = data;
    _this.PromiseStats = 'rejected';
    setTimeout(() => {
      _this.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    });
  }

  try {
    exec(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  if (typeof onResolved !== 'function') onResolved = (value) => value;
  if (typeof onRejected !== 'function') {
    onRejected = (reason) => {
      throw reason;
    };
  }

  const _this = this;
  return new Promise((resolve, reject) => {
    if (_this.PromiseStats == 'fulfiled') {
      try {
        const res = onResolved(_this.PromiseResult);
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
    if (_this.PromiseStats == 'rejected') {
      try {
        const res = onRejected(_this.PromiseResult);
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
    if (_this.PromiseStats == 'pending') {
      _this.callbacks.push({
        onResolved() {
          try {
            const res = onResolved(_this.PromiseResult);
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
          } catch (error) {
            reject(error);
          }
        },
        onRejected() {
          try {
            const res = onRejected(_this.PromiseResult);
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
          } catch (error) {
            reject(error);
          }
        }
      });
    }
  });
};

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(
        (v) => {
          resolve(v);
        },
        (r) => {
          reject(r);
        }
      );
    } else {
      resolve(value);
    }
  });
};

Promise.all = function (promiseList = []) {
  let res = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    promiseList.forEach((p, i) => {
      p.then(
        (v) => {
          res[i] = v;
          count++;
          if (count == promiseList.length) {
            resolve(res);
          }
        },
        (r) => {
          reject(r);
        }
      );
    });
  });
};

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('ok');
    reject('error');
    // throw 'ERROR'
  });
})
  .then()
  .then(
    (v) => {
      console.log('v: ', v);
      // throw 'err'
      return v;
    },
    (r) => {
      console.log('r: ', r);
      return r;
    }
  )
  .then((v) => {
    console.log('v:1 ', v);
  });

setTimeout(() => {
  console.log('p: ', p);
}, 100);
