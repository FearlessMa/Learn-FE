
/**
 * bind实现 闭包
 *
 * @export
 * @param {*} fn 
 * @param {*} obj
 * @param {*} args
 * @returns res 
 */
export default function bind(fn, obj, ...args) {
  return function (...args1) {
    obj.fn = fn;
    const res = obj.fn(...args, ...args1);
    delete obj.fn;
    return res;
  };
}
