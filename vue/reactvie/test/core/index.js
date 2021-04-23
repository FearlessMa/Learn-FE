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
  n:[1,3,5]
};

observe(obj);
console.log('obj: ', obj);

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

$set(obj.n,3,[2,3])
console.log('obj.n: ', obj.n);
