// 深克隆
export default function deepClone(obj) {
  if (typeof obj != 'object' && typeof obj != null) {
    return obj;
  }
  if (obj == null) return null;
  if (obj == undefined) return undefined;

  const getType = (o) => {
    let str = Object.prototype.toString.call(o);
    return str.substring(8, str.length - 1);
  };
  const type = getType(obj);
  let copyObj = type == 'Array' ? [] : {};
  if (type == 'Array') {
    obj.forEach((item) => {
      const data = deepClone(item, map);
      copyObj.push(data);
    });
  } else if (type == 'Error') {
    copyObj = new Error(obj.message);
  } else if (type == 'RegExp') {
    copyObj = new RegExp(obj);
  } else {
    Object.keys(obj).forEach((key) => {
      const value = deepClone(obj[key]);
      copyObj[key] = value;
    });
  }
  return copyObj;
}

// [string string]
