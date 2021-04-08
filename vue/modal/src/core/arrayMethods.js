const { default: def } = require('./def');

const arrayPrototype = Array.prototype;

const methodNames = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'splice',
  'reverse'
];

// 代理原生方法
const arrayMethods = Object.create(arrayPrototype);

methodNames.forEach((methodName) => {
  // 存储原生方法
  const original = arrayPrototype[methodName];
  def(
    arrayMethods,
    methodName,
    function (...args) {
      // 绑定this指向调用者 array，Object.defineProperty 中会传入调用者this
      const result = original.call(this, ...args);
      console.log('通过' + methodName + '修改了');
      let inserted = [];
      switch (methodName) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          //  splice(开始位置，个数，值)
          inserted = args.slice(2);
          break;
      }
      if (inserted.length) {
        this.__ob__.observeArray(inserted);
      }
      return result;
    },
    false
  );
});

export default arrayMethods;
