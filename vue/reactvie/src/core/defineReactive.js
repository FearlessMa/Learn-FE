import Dep from './Dep';
import observe from './observe';
// 定义响应式  通过闭包使用Object.defineProperty 的set get方法
export default function defineReactive(data, key, val) {
  // key的依赖收集
  const dep = new Dep();
  if (arguments.length == 2) {
    val = data[key];
  }
  // observe 会判断 val 是不是 object ,是object 设置属性为响应式
  let childOb = observe(val);
  Object.defineProperty(data, key, {
    get() {
      console.log('访问了: ', key, val);
      // 收集依赖
      if (Dep.target) {
        // console.log('Dep.target: ', Dep.target);
        dep.depend();
        // console.log('dep: ', dep);
        if (childOb) {
          childOb.dep.depend();
          // console.log('childOb.dep: ', childOb.dep);
        }
      }
      return val;
    },
    set(value) {
      if (value == val) return;
      console.log('设置了: ', key, value);
      // 新值设置响应式
      childOb = observe(value);
      val = value;
      // 触发依赖
      dep.notify();
    }
  });
}
