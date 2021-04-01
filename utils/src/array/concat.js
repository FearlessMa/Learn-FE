

/**
 * 返回合并后的数组，可以打散传入的第一层数组
 *
 * @param {*} arr
 * @param {*} items
 * @returns newArr
 */
function concat(arr, ...items) {
  const result = [...arr]
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  }
  return result;
}
