const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(less|css)$/,
            use: [
              'style-loader',
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
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 1024 * 10,
              esModule: false,
              name: './img/[hash:10].[ext]'
            }
          },
          {
            test: /\.(eot|svg|ttf|woff)$/,
            loader: 'file-loader',
            options: {
              name: './media/[name].[contenthash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './public/index.html')
    }),
  ],
  devtool: 'eval-source-map',
  devServer: {
    port: 9000,
    contentBase: resolve(__dirname, './dist'),
    hot: true
  },
  mode: 'development'
};
