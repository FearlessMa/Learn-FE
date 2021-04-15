// 数组分块

export default function chunks(arr, num = 0) {
  if (num == 0 || arr.length <= num) return [...arr];
  let result = [];
  let chunk = [];
  for (let i = 0; i < arr.length; i++) {
    if ((i + 1) % num != 0) {
      chunk.push(arr[i]);
    } else {
      chunk.push(arr[i]);
      result.push(chunk);
      chunk = [];
    }
  }
  result = result.concat(chunk);
  return result;
}
