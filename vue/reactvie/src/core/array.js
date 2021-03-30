import { def } from './util';

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

const arrayPrototype = Array.prototype;

export const arrayMethods = Object.create(arrayPrototype);

methodsToPatch.forEach((method) => {
  const original = arrayMethods[method];

  def(arrayMethods, method, function (...args) {
    // console.log('args: ', args);
    const result = original.apply(this, args);
    // 后去数组的__ob__
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        //  获取 通过splice 替换的值
        inserted = args.slice(2);
        break;
    }
    // 观察新增的数据
    if (inserted) ob.observeArray(inserted);
    ob.dep.notify()
    // console.log('inserted: ', inserted);
    return result;
  });
});
