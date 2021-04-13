import deepClone from '../src/object/deepClone';

const obj = {
  a: { m: { n: 1 } },
  b() {}
};

const cloneObj = deepClone(obj);
cloneObj.a.m.n += 1;

test('deepClone', () => {
  expect(cloneObj.a.m.n).toBe(obj.a.m.n + 1);
  expect(typeof cloneObj.b).toBe('function');
});
