const { default: observe } = require('./observe');
const { default: $set } = require('./set');
const { default: Watcher } = require('./Watcher');

const obj = {
  a: {
    b: { c: { d: 1 } },
    e: function add() {},
    f: /\.js$/,
    g: Date.now(),
    h: new Error('err'),
    i: true,
    j: 'string',
    // k: undefined,
    // l: null,
    m: [1, 2, 3]
  },
  n: [1, 3, 5],
  o: 'o'
};

// observe(obj);
// console.log('obj: ', obj);

// obj.a.m.push(5);
// const res = obj.a.m.splice(1,2)
// console.log('res: ', res);
// console.log('obj: ', obj.a.m);

// new Watcher(obj, 'a.b.c.d', (newVal, oldVal) => {
//   console.log('newVal: ', newVal);
//   console.log('oldVal: ', oldVal);
//   console.log('callback');
// });
// console.log(obj.a.b.c.d++);

// $set(obj, 's', { a: 2 });
// console.log('obj: ', obj);
// obj.s.a++;

// $set(obj.n,3,[2,3])
// console.log('obj.n: ', obj.n);

const proxyObj = new Proxy(obj, {
  get(target, prop, receiver) {
    console.log('get');
    // return target[prop];
    return Reflect.get(target, prop);
  },
  set(target, prop, value, receiver) {
    console.log('set');
    // target[prop] = value;
    Reflect.set(target, prop, value);
  },
  deleteProperty(target, prop) {
    Reflect.deleteProperty(target, prop);
  },
  has(target, prop) {
    return Reflect.has(target, prop);
  }
});
// console.log('Reflect: ', Reflect);
// console.log('proxyObj: ', proxyObj);
// // console.log('proxyObj:a ', proxyObj.a);
// proxyObj.o = '123';

// const keys = Reflect.ownKeys(Reflect)
// console.log('keys: ', keys);
// const ks = Object.keys(Reflect)
// console.log('ks: ', ks);

// nObj.a.b.c.d++
console.log('nObj.a.b.c.d++: ', proxyObj.a.b.c.d++);
console.log('nObj.a.b.c.d: ', proxyObj.a.b.c.d);
