import observe from './core/observe';
import Watcher from './core/Watcher';

const obj = { a: { m: { n: 1 } }, b: 2, c: [1, 2, 3],d:{q:{z:1}} };

// console.log(obj.a);

observe(obj);
// console.log(obj);
// obj.a.m.n++;

// obj.c.push(4);
// console.log('obj.c: ', obj.c);
new Watcher(obj, 'a.m.n', function(val,oldVal) {
  console.log('------- Watcher: val -------', val);
  console.log('oldVal: ', oldVal);
});
// new Watcher(obj, 'd.q.z', function(val,oldVal) {
//   console.log(' ------- Watcher: val-------', val);
//   console.log('oldVal: ', oldVal);
// });

// obj.a.m.n = 10;
// obj.d.q.z = 8;
