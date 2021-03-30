let uid = 0;

export default class Dep {
  constructor() {
    console.log('Dep的构造函数');
    // 依赖收集 ，存放的是watcher
    this.subs = [];
    this.id = uid++;
  }
  // 触发依赖
  notify() { 
    console.log('=========== notify =========== ');
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
  // 添加订阅
  addSub(sub) {
    this.subs.push(sub);
  }
  // 添加依赖
  depend() {
    // 挂在全局 watcher  推入subs
    if(Dep.target){
      this.addSub(Dep.target)
    }

  }
}
