// fn.call(obj,...params)
function call(obj, fn) {
  obj.fn = fn;
  const res = obj.fn(...[...arguments].slice(2));
  delete obj.fn;
  return res;
}

const a = {
  a: 1
};

function b(n1) {
  return this.a + n1;
}

const val = call(a, b, 1);
console.log('val: ', val);
console.log('a: ', a);

function apply(obj, fn, ...arg) {
  obj.fn = fn;
  const res = obj.fn(...arg);
  delete obj.fn;
  return res;
}

function bind(obj, fn, ...arg) {
  return function (...arg1) {
    obj.fn = fn;
    const res = obj.fn(...arg, ...arg1);
    delete obj.fn;
    return res;
  };
}

function create() {
  let obj = {};
  let Con = [].shift.call(arguments);
  console.log('Con: ', Con);
  obj.__proto__ = Con.prototype;
  let result = Con.apply(obj, arguments);
  return result instanceof Object ? result : obj;
}

function Test() {
  this.name = 'test';
}

// const obj1 = newFn(Test);
// console.log('obj1: ', obj1);

function newFn(fn) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let result = fn.apply(obj, arguments);
  return result instanceof Object ? result : obj;
}

function myInstacnceof(target,type){
  if(target.__proto__  == type.prototype){
    return true;
  }
  if(target.__proto__ != undefined){
    return myInstacnceof(target.__proto__ ,type)
  }
  if(target.__proto__ == undefined){
    return false
  }
}

console.log(myInstacnceof('123',String))
console.log(myInstacnceof('123',Number))