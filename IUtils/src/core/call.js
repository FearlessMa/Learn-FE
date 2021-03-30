

/**
 * 实现call
 *
 * @export
 * @param {*} fn 方法
 * @param {*} obj this指向的对象
 * @param {*} args 参数
 * @returns res fn的执行结果
 */
export default function call(fn, obj, ...args) {
  obj.fn = fn;
  const res = obj.fn(...args);
  delete obj.fn;
  return res;
}
