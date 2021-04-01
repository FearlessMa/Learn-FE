function forEach(arr, cb, thisArg) {
  thisArg = thisArg | arr;
  for (let i = 0; i < arr.length; i++) {
    cb.call(thisArg, arr[i], i, arr);
  }
}
