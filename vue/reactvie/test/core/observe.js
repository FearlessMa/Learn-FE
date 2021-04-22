import Observer from './Observer';

export default function observe(value) {
  if (typeof value != 'object' || typeof value == null) return;

  let ob;

  if (value && value.__ob__) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }

  return ob;
}
