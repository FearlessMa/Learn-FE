

/**
 * apply 实现
 *
 * @export
 * @param {*} fn 目标函数
 * @param {*} obj this指向的obj
 * @param {*} args 数组参数
 * @returns res = fn.apply(obj,args)
 */
export default function apply(fn, obj, args) {
  obj.fn = fn;
  const res = obj.fn(...args);
  delete obj.fn;
  return res;
}
