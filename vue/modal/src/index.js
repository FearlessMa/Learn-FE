const { default: observe } = require('./core/observe');
const { default: Watcher } = require('./core/Watcher');
const { default: Vue } = require('./vue');

// const obj = {
//   a: { m: { n: 1 } },
//   b: 10,
//   c: [1, 2, 3, 4, 5]
// };
// observe(obj);
// // obj.a.m.n = 2;
// // obj.c.push(10, { name: '1234' });
// // console.log('obj.c[6].name: ', obj.c[6].name);
// // obj.c[6].name = '321'
// // console.log('obj: ', obj);

// new Watcher(obj, 'a.m.n', (newValue, oldValue) => {
//   console.log('newValue: ', newValue);
//   console.log('oldValue: ', oldValue);
// });
// obj.a.m.n = 2;
// // obj.a.m = { c:123}
// console.log('obj: ', obj);

const vm = new Vue({
  el: '#app',
  data() {
    return {
      name: 'test',
      a:{
        m:{
          value: 1
        }
      }
    };
  },
  methods: {
    changeName() {
      console.log('changeName');
      console.log('this: ', this);
      this.name = 'abc';
    }
  }
});
console.log('vm: ', vm);
