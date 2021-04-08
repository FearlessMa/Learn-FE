export default function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    configurable: true,
    writable: true,
    enumerable
  });
}
