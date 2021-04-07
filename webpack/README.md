


## 开发环境性能优化

###  优化打包构建速度
HRM 热更新
* devServer -> hot :true 开启
* css style-loader 支持热更新，内联style标签在js中
* js 默认不支持热更新。
* html 不需要热更新
```js
  if (module.hot) {
    // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
    module.hot.accept('./print.js', function() {
      // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
      // 会执行后面的回调函数
      print();
    });
  }
```

###  优化代码调试
source-map
* [inline-|eval-|hidden-][nosoures-][cheap-[module-]]source-map

| value                | source-map                            | 速度 | 错误提示                                                               |
| -------------------- | ------------------------------------- | ---- | ---------------------------------------------------------------------- |
| source-map           | 外部                                  | 慢   | 准确的错误提示，源码的错误位置                                         |
| inline-source-map    | 内部，只生成一个内联的source-map      | 较快 | 准的错误信息，源码的错误位置                                           |
| eval-source-map      | 内联，每个chunk单独生成一个source-map | 快   | 准的错误信息，源码的错误位置                                           |
| hidden-source-map    | 外部                                  |      | 准的错误信息，源码的错误位置，隐藏源码，只有构建后的错误位置           |
| nosources-source-map | 外部                                  |      | 准的错误信息，没有任何源码的错误提示                                   |
| cheap-source-map     | 外部                                  |      | 准的错误信息，源码的错误位置，只能精准到行，没有列提示                 |
| module-source-map    | 外部                                  |      | 错误代码准确信息 和 源代码的错误位置，module会将loader的source map加入 |

* 内联速度最快 eval>inline>cheap
* 开发环境 eval-source-map 或 eval-cheap-souce-map 速度快，错误提示准确
* 生产环境
  * 是否能查看源码 nosources-source-map 或 hidden-source-map 
  * 错误信息的准确性 和 性能 source-map 或 cheap-module-souce-map


## 生产环境性能优化

### 构建速度优化

* oneOf: 提高loader的执行速度，只执行第一个匹配到的loader
* babel缓存，开启babel缓存提高下次构建速度
```js
  // 开启babel缓存
  // 第二次构建时，会读取之前的缓存
  cacheDirectory: true
```
* thread-loader 多进程打包，启动600ms左右，进程通信消耗资源，根据情况合理使用
* externals 第三方库不参与打包，使用cdn引入
```js
externals: {
    // 拒绝jQuery被打包进来
    jquery: 'jQuery'
  }
```
* dll 第三放库 单独打包，使用DllPlugin抽离，使用DllReferencePlugin与 AddAssetHtmlWebpackPlugin 自动引入
```js
// webpack.dll.js
// 打包生成一个 manifest.json --> 提供和jquery映射
new webpack.DllPlugin({
  name: '[name]_[hash]', // 映射库的暴露的内容名称
  path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
})

// webpack.prod.js
// 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js')
    })
```
### 代码性能优化

*  开启文件缓存，hash chunkhash contenthash
   * hash ：webpack哈希，每次打包重新生成
   * chunkhash ： 根据chunk生成hash，如果有一个chunk改变，引入此chunk的文件hash也会改变
   * contenthash ： 根据文件内容生成hash，只有文件内容改变，hash才会改变
* split code 代码分割
```js
 /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
```
* 懒加载/预加载 使用动态import完成
```js
// 懒加载
import(/* webpackChunkName:a */'a.js').then((module)=>{

}).catch(e=>{})
// 预加载 使用prefetch进行预加载
import(/* webpackChunkName:a , webpackPrefetch:true*/'a.js').then((module)=>{

}).catch(e=>{})

```
* tree shaking 删除未使用的引用，注意版本差异，是否需要设置 sideEffect属性来排除tree shaking 目标。如 css less @babel/polyfill
* pwa 离线存储，使用workbox-webpack-plugin插件

```js
// 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true
      })
    ]
```
