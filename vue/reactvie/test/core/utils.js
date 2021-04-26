export function def(obj, k, value, enumerable) {
  Object.defineProperty(obj, k, {
    value,
    enumerable
  });
}

// Reflect Proxy

export function proxyObj(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      console.log('proxy 的 get ...');
      return Reflect.get(target, prop);
    },
    set(target, prop, value, receiver) {
      console.log('proxy 的 set ...');
      Reflect.set(target, prop, value);
    },
    deleteProperty(target, prop) {
      console.log('proxy 的 delete ...');

      Reflect.deleteProperty(target, prop);
    },
    has(target, prop) {
      return Reflect.has(target, prop);
    }
  });
}
