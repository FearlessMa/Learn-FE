/**
 * 防抖
 *
 * @export
 * @param {*} callback 目标函数
 * @param {*} time 间隔时间
 */
export default function debounce(callback, time) {
  let startTime = 0;
  return function (...args) {
    let now = Date.now();

    if (now - startTime >= time) {
      startTime = now;
      return callback(...args);
    }
  };
}
