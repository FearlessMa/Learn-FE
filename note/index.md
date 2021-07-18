

基本类型数据
1. boolean number string undefined null symbol
2. 值传递
引用类型
1. Object Function Date RegExp Error Window Global Map Set 
2. 变量中存储的为内存地址

比较
```js
[] == ![] // true
// ! 比== 优先级高， 先转换 ![] 为 false
// [] == false  比较规则， 任何值与 boolean 比较都要转换为 number 类型
// [] 转number 为0 ， false 转number 为0
// 最后 0 == 0  为 true

```


浏览器

1. 事件代理 事件捕获，事件源触发事件，事件冒泡
2. 跨域 jsonp cors 
3. 缓存 server work， 内存缓存，硬盘缓存，http2.0 缓存
4. 缓存策略  强缓存，协商缓存 
5. 强缓存 express 缓存过期时间，相对时间，收到浏览器本地时间影响 cache-control 相对时间 max-age = 30 ，多少秒后过期，no-cache 缓存但是文件立即过期，下次强求需要询问服务器
6. 协商缓存，文件没有改变返回304状态码， Last-Modified 返回文件修改的最后是时间，服务器通过时间戳判断是否返回文件还是使用缓存，相对准确，文件被编辑未修改内容，最后修改时间会改变。 ETag 文件的hashCode，只有文件改变了hashCode才会变，比Last-Modified准确，但是计算hashCode会消耗资源。
7. Last-Modified 表示本地文件最后修改日期，If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来，否则返回 304 状态码。
8. 当 script 标签加上 defer 属性以后，表示该 JS 文件会并行下载，但是会放到 HTML 解析完成后顺序执行，所以对于这种情况你可以把 script 标签放在任意位置。
9. 对于没有任何依赖的 JS 文件可以加上 async 属性，表示 JS 文件下载和解析不会阻塞渲染。
10. 重绘是当节点需要更改外观而不会影响布局的，比如改变 color 就叫称为重绘。
11. 回流是布局或者几何属性需要改变就称为回流。
12. 思考题：在不考虑缓存和优化网络协议的前提下，考虑可以通过哪些方式来最快的渲染页面，也就是常说的关键渲染路径，这部分也是性能优化中的一块内容。
```js
// 从文件大小考虑 ： 代码分割减小体积，tree-shaking 删除无用的代码， 压缩代码，
// 从 script 标签使用上来考虑 ：放在body底部或者使用defer属性，避免js阻塞渲染。
// 从 CSS、HTML 的代码书写上来考虑  ： css 选择器层级尽量小，减少计算资源，样式尽量避免触发回流。 html 生成图层减少重绘， video iframe 标签
// 从需要下载的内容是否需要在首屏使用上来考虑 ，代码分割，按需加载 

```



