const path = require('path');

module.exports = {
  entry:path.resolve(__dirname,'./test/core/index.js'),
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'./dist/')
  },
  devtool: 'inline-source-map',
  devServer:{
    port:9000,
    contentBase:path.resolve(__dirname,'./test/')
  }
}