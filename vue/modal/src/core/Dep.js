let id = 0;
export default class Dep {
  constructor() {
    this.subs = [];
    this.uid = id++;
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
  // 添加依赖
  depend() {
    // 挂在全局 watcher  推入subs
    if (Dep.target) {
      console.log('Dep.target: ', Dep.target);
      this.addSub(Dep.target);
    }
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
}
