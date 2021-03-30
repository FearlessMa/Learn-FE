import apply from "../src/core/apply";

function add(a, b) {
  return a + b + this.c;
}
const obj = { c: 10 };

test("apply", () => {
  expect(apply(add, obj, [1, 1])).toBe(12);
});
