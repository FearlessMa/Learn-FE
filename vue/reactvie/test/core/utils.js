export function def(obj, k, value, enumerable) {
  Object.defineProperty(obj, k, {
    value,
    enumerable
  });
}
