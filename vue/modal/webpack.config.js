const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: resolve(__dirname, './dist')
  },
  module: { rules: [] },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './public/index.html')
    })
  ],
  devtool: 'eval-source-map',
  devServer: {
    port: 9000,
    contentBase: resolve(__dirname, './dist'),
    hot: true
  },
  mode:'development'
};
