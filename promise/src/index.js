// import Promise from "./promise";
import Promise from './PromiseClass';

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('ok');
    // reject('error');
    console.log(111);
    // throw "Error";
  }, 500);
  throw "Error";
  // resolve("ok");
  // reject('error');
});
console.log(222);

// console.log('p: ', p);
const result = p
  .then(
    (res) => {
      // console.log('res:232 ', res);
      // throw "ERROR";

      return res;
    }
    // ,
    // (reason) => {
    //   console.log('reason: ', reason);
    //   // throw "ERROR";
    //   console.log(333)

    //   return reason
    // }
  )
  .then(
    (res1) => {
      console.log(444);

      console.log('res1: ', res1);
      // throw "ERROR1";
      return res1;
    }
    // ,
    // reason1 => {
    //   console.log("reason1: ", reason1);
    //   // throw "ERROR1";
    //   return reason1
    // }
  )
  .catch((reason2) => {
    console.log('reason2: ', reason2);
  });
// console.log('p: ', p);
console.log('result: ', result);

// const p1 = Promise.resolve('a')
// console.log('p1: ', p1);

// const p2 = Promise.resolve(new Promise((resolve,reject)=>{
//   // resolve(1)
//   setTimeout(()=>{
//     reject('error')
//   })
// }))
// console.log('p2: ', p2);

// const p3 = Promise.reject('a');
// console.log('p3: ', p3);

// const p4 = Promise.reject(
//   new Promise((resolve, reject) => {
//     resolve(1)
//     setTimeout(() => {
//       // reject('error');
//     });
//   })
// );
// console.log('p4: ', p4);

const promise1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('promise1')
    // throw 'err'
  },100)
})
const promise2 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('promise2')
    // reject('promise2')
    // throw 'error'
  },500)
})
const promise3 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('promise3')
  })
})

// const res = Promise.all([promise1,promise2,promise3])
// console.log('res: Promise.all', res);
const res1 = Promise.race([promise1,promise2,promise3])
console.log('res1: ', res1);
