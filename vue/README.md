
- [x] [响应式](reactvie/README.md)
- [x] [模板引擎](templateEngine/README.md)
- [x] [TemplateToAST](templateToAST/README.md)
- [x] [vdom](vdom/README.md)


1. vue 初始化顺序 prop>methods>data>computed>watch
2. vue 模板执行顺序 render template el.outerHTML(直接获取html元素作为模板)
3. compileToFunctions 函数 主要有三个步骤 1.生成 ast 2.优化静态节点 3.根据 ast 生成 render 函数
4. render 函数使用with 关键字执行代码，并改变this指向
```js
function render (
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('span',[_v(_s(num))]),_v(" "),_c('button',{on:{"click":add}},[_v("change")])])}
}
```
