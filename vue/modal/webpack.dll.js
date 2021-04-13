const { resolve } = require('path');
const Webpack = require('webpack');
module.exports = {
  entry:{
    jquery: ['jquery'],
  },
  devtool:'source-map',
  output: {
    filename: '[name].dll.js',
    path: resolve(__dirname, './dll'),
    library: '[name]_[hash]' // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    new Webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'
};
