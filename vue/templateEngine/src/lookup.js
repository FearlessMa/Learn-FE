/* 
  寻找属性中的.属性
*/

export default function lookup(dataObj, keyName) {
  if (keyName.includes(".") && keyName!=='.') {
    const keys = keyName.split(".");
    let temp = dataObj;
    keys.forEach(key => {
      temp = temp[key];
    });
    return temp;
  }

  return dataObj[keyName];
}
