import defineReactive from './defineReactive';

export default function $set(target, key, val) {
  if (arguments.length == 2) {
    val = target[key];
  }
  let ob = target.__ob__;

  // 数组
  if (Array.isArray(target)) {
    target.splice(key, 1, val);
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive(target, key, val);
  ob.dep.notify();
  return val;
}
