/**
 * flat 打散数组
 *
 * @export
 * @param {Array} arr
 * @param {Number} depth
 * @returns array
 */
export default function flat(arr, depth) {
  const result = [...arr];
  const res = [];
  result.forEach((item) => {
    if (Array.isArray(item)) {
      res.push(...flat(item));
    } else {
      res.push(item);
    }
  });
  return res;
}
