import Dep from './Dep';
import observe from './observe';

export default function defineReactive(obj, k, value) {
  if (arguments.length == 2) {
    value = obj[k];
  }
  const dep = new Dep();
  let childOb = observe(value);
  Object.defineProperty(obj, k, {
    // getter 收集依赖
    get() {
      console.log('访问了' + k);

      if(Dep.target){
        dep.depend()
        console.log('dep: ', dep);
        if(childOb){
          childOb.dep.depend()
        }
      }
      return value;
    },
    // setter 更新依赖
    set(newValue) {
      if (value == newValue) return;
      console.log('设置了' + k);
      value = newValue;
      childOb = observe(newValue);
      dep.notify();
    },
    configurable: true,
    enumerable: true
  });
}
