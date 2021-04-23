const { def } = require('./utils');

const methodsName = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'splice',
  'reverse'
];

const arrayPrototype = Array.prototype;

export const arrayMethods = Object.create(arrayPrototype);


arrayMethods.forEach((method) => {
  const original = arrayPrototype[method];

  def(arrayMethods, method, function (...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    console.log('array 改变了', method);
    let inserted = [];
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if(inserted.length){

    }
    return result;
  });
});
