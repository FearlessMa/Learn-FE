import Dep from './Dep';
import observe from './observe';

export default function defineReactive(obj, k, val) {
  if (arguments.length == 2) {
    val = obj[k];
  }
  let childOb = observe(val);
  const dep = new Dep();
  Object.defineProperty(obj, k, {
    // getter 收集依赖
    get() {
      console.log('触发了getter,访问了', k, val);
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }

      return val;
    },
    // setter 更新依赖
    set(newVal) {
      if (val == newVal) return;
      console.log('触发了setter,设置了', k, newVal);
      val = newVal;
      childOb = observe(newVal);
      dep.notify()
    }
  });
}
