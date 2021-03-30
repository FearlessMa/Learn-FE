import { def } from './util';
import defineReactive from './defineReactive';
import observe from './observe';
import { arrayMethods } from './array';
import Dep from './Dep';

// 数据变为响应式，挂在__ob__ = 当前实例
export default class Observer {
  constructor(value) {
    // console.log('Observer: 构造函数被调用');
    // value创建依赖收集
    this.dep = new Dep();
    // 挂载 __ob__  并且不可枚举
    def(value, '__ob__', this, false);

    if (Array.isArray(value)) {
      console.log('value: ', value);
      this.observeArray(value);
      // array 绑定 代理方法
      // value.__proto__ = arrayMethods;
      Object.setPrototypeOf(value,arrayMethods);
    } else {
      // obj的每一个数变成响应式
      this.walk(value);
    }
  }
  walk(value) {
    for (let k in value) {
      defineReactive(value, k);
    }
  }

  observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      observe(arr[i]);
    }
  }

}
