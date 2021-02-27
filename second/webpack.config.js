/* eslint-disable */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// postcss-preset-env 默认为开发模式，开启生产模式
process.env.NODE_ENV = 'production';
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'js/built.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MinCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          MinCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-preset-env')()]
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          outputPath: 'imgs',
          name: '[hash:10].[ext]',
          esModule: false
        }
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              // 自动修复
              // fix: true,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MinCssExtractPlugin({
      filename: '[name].css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    open: true,
    port: 8000
  }
};
