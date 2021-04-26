import defineReactive from './defineReactive';
import { def, proxyObj } from './utils';
import { arrayMethods } from './arrayMethods';
import observe from './observe';
import Dep from './Dep';
export default class Observer {
  constructor(value) {
    console.log('Observer');
    this.dep = new Dep();
    // def(value, '__ob__', this, false);
    this.__ob__ = proxyObj(value);
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  walk(value) {
    for (const key in value) {
      defineReactive(value, key);
    }
  }
  observeArray(value) {
    for (let i = 0, l = value.length; i < l; i++) {
      observe(value[i]);
    }
  }
}
