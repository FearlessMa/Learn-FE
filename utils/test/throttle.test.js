const { default: throttle } = require('../src/core/throttle');

let count = 0;
function fn() {
  return count++;
}
const fn1 = throttle(fn, 500);
fn1();
fn1();
fn1();
// done 测试异步
test('throttle 节流函数测试', (done) => {
  setTimeout(()=>{
    // console.log('count: ', count);
    expect(count).toBe(1);
    // 异步执行完毕
    done();
  },1000)
});
