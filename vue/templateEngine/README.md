# 模板引擎

> 仿照mustache.js 实现模板引擎

- [x] `{{}}`语法识别
- [x] 基础数据渲染
- [x] `#`数组语法数据渲染

## 快速使用

```js
<div id="app"></div>
<script src="../dist/bundle.js"></script>
<script>
  const templateStr = `
  <div>
    {{#students}}
    <p class="name">{{name}}</p>
    <ul>
      {{#desc}}
      <li>{{.}}</li>
      {{/desc}}
    </ul>
    {{/students}}
  </div>
  `
  const data = {
    students: [
      { name: '张三', desc: [1, 2, 3] },
      { name: '李四', desc: [4, 5, 6] },
      { name: '王五', desc: [7, 8, 9] }
    ]
  };
  const res = templateEngine.render(templateStr, data);
  document.getElementById('app').innerHTML = res;
</script>
```
