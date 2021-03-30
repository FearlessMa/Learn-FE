import Observer from "./Observer";

// 判断数据是否为响应式，非响应式 调用Observer 变为响应式
export default function observe(value) {
  if (typeof value != "object") return;
  let ob;
  if (value.__ob__) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}
