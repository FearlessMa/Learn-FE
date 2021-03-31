import call from "../src/core/call";

function add(a, b) {
  return a + b + this.c;
}
const obj = { c: 10 };

test("call", () => {
  expect(call(add, obj, 1, 1)).toBe(12);
});
