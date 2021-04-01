//  节流函数 一段时间内 只触发一次

/**
 * 节流函数
 *
 * @export
 * @param {*} callback 目标函数
 * @param {*} time 间隔时间
 * @returns void
 */
export default function throttle(callback, time) {
  // 开始时间
  let startTime = 0;
  // 定时器timer
  let timer = null;
  return function (...args) {
    // 当前时间
    let now = Date.now();
    if (timer) clearTimeout(timer);
    startTime = now;
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, time);
  };
}
