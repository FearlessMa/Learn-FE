const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash:8].js',
    path: resolve(__dirname, './dist'),
    publicPath:'./'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|dll/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            // css兼容性处理
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')()
              ]
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          esModule: false,
          name: './imgs/[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /\.(woff|ttf|svg|eot)$/,
        loader: 'file-loader',
        options: {
          name: './media/[name].[contenthash:8].[ext]'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变
    new Webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源
    //  不写publicPath 路径， AddAssetHtmlWebpackPlugin 默认是 获取webpack的auto
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/*.dll.js')
    })
  ],
  // mode: 'production',
  mode: 'development',
  devtool: 'source-map'
};
