export default class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  depend() {
    if (Dep.target) {
      this.addSub(Dep.target);
    }
  }

  notify() {
    this.subs.forEach((sub) => {
      console.log('sub: ', sub);
      sub.update();
    });
  }
}
