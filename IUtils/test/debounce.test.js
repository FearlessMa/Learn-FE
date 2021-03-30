const { default: debounce } = require('../src/core/debounce');

let count = 0;
function fn() {
  return ++count;
}

const fn1 = debounce(fn, 500);
fn1();
fn1();
fn1();
fn1();
test('debounce 防抖函数测试', () => {
  expect(count).toBe(1);
});
