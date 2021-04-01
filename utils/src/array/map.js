function map(arr, cb, thisArg) {
  thisArg = thisArg || arr;
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = cb.call(thisArg, arr[i], i, arr);
  }
  return newArr;
}
