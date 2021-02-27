const HtmlWebackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      //   {
      //     test: /\.css$/,
      //     use: ['style-loader', 'css-loader']
      //   },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          // "style-loader",
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
              // "browserslist": [
              //   "defaults",
              //   "last 2 chrome version",
              //   "ie 6-8",
              //   "not dead"
              // ]
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,

        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          // 解决html-loader模块化为commonjs而url-loader为es模块化冲突
          esModule: false
        }
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'fonts'
        }
      },
      // 处理html中通过img引入的图片
      {
        test: /\.html?$/,
        loader: 'html-loader',
        options: {
          // 压缩
          minimize: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebackPlugin({
      template: './src/index.html'
    }),
    // 将css-loader处理后的css字符串取出放在单独一个css文件而不是放入style标签
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    // 打包构建目录
    contentBase: resolve(__dirname, 'build'),
    port: 8000,
    // gzip压缩
    compress: true,
    // auto open default browser
    open: true
  }
};
