import observe from './core/observe';
import Watcher from './core/Watcher';

export default class Vue {
  constructor(options) {
    this._init(options);
    this._compile(this.getTemplate());
    this.render();
  }
  getElement(sel) {
    const ele = document.querySelector(sel);
    return ele;
  }
  createObserve(data) {
    observe(data);
  }
  // 初始胡
  _init(options) {
    const data = options.data() || {};
    this.$data = data;
    this.$el = this.getElement(options.el);
    this.$options = options;
    this.createObserve(data);
    const methods = options.methods;
    this.attrToVm(methods);
    // this.attrToVm(data)
  }
  attrToVm(obj) {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        this[key] = obj[key];
      }
    }
  }
  getTemplate() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.$el);
    this.fragment = fragment;
    let nodes = fragment.childNodes;
    return nodes;
  }
  _compile(nodes) {
    while (nodes) {
      nodes.forEach((node) => {
        if (node.nodeType == 1) {
          this.compileNode(node);
        } else if (node.nodeType == 3) {
          this.compileText(node);
        }
      });
      nodes = nodes.childNodes;
    }
  }
  compileNode(node) {
    const attrs = [...node.attributes];
    attrs.forEach(({ name, value }) => {
      if (name.indexOf('@') == 0) {
        const eventName = name.slice(1);
        console.log('eventName: ', eventName);
        node.addEventListener(eventName, () => {
          this[value].call(this.$data);
          // 数据改变了，需要做diff 更新页面
        });
      } else if (name.indexOf('v-') == 0) {
        const eventName = name.slice(2);
        console.log('eventName: ', eventName);
        // 初始化值
        node.value = this.parsePath(value)(this.$data);
        const _this = this;
        // 绑定事件
        node.oninput = function (e) {
          const val = e.target.value;
          // 设置值
          _this.$data[value] = val;
        };
        new Watcher(this.$data, value, (value, oldValue) => {
          console.log('value: ', value);
          console.log('oldValue: ', oldValue);
        });
      }
    });
    this._compile(node.childNodes);
  }
  compileText(node) {
    // 匹配 {{}}
    let reg = /\{\{(.*)\}\}/;
    // 替换 {{}} 变量
    if (reg.test(node.textContent)) {
      const express = node.textContent.match(reg)[1];
      let value = this.parsePath(express)(this.$data);
      node.textContent = value;
    }
  }

  parsePath(express) {
    const keys = express.split('.');
    return function (obj) {
      keys.forEach((key) => {
        obj = obj[key];
      });
      return obj;
    };
  }

  render() {
    document.body.appendChild(this.fragment);
  }
}
