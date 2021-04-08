import arrayMethods from './arrayMethods';
import def from './def';
import defineReactive from './defineReactive';
import Dep from './Dep';
import observe from './observe';
export default class Observer {
  constructor(value) {
    this.dep = new Dep();
    def(value, '__ob__', this, false);
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    for (let k in obj) {
      defineReactive(obj, k);
    }
  }

  observeArray(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      observe(arr[i]);
    }
  }
}
