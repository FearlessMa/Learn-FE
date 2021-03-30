const path = require('path');

console.log('path.join(__dirname,"./dist/"): ', path.join(__dirname,'./dist/'));
console.log('path.resolve(__dirname,"./dist/"): ', path.resolve(__dirname,'./dist/'));
module.exports= {
  mode:'development',
  entry:'./src/index.js',
  output:{
    filename:"bundle.js",
    path:path.join(__dirname,'./dist/')
  },
  devServer:{
    contentBase:path.join(__dirname,'./test/'),
    port:9000,
  }

}