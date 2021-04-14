const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
        // options:{
        //   compilerOptions: {
        //     isCustomElement: tag => tag === 'plastic-button'
        //   }
        // }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
    new VueLoaderPlugin()
  ],
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    port: 9000,
    compress: true,
    hot: true,
    contentBase: path.resolve(__dirname, './dist')
  }
};
