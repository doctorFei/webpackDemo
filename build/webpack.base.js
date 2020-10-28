const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin') // https://vue-loader.vuejs.org/zh/
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
// const StyleLintPlugin = require('stylelint-webpack-plugin'); // 是否开启css lint

module.exports = {
  mode: 'development',
  entry:['./src/main.js'],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]_[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              limit: '1024',
              outputPath: "images/",
              esModule: false
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              outputPath: "font/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new htmlWebpackPlugin({
      title: 'webpack-demo',
      template: path.join(__dirname, '../public/index.html'),
      filename: path.join(__dirname, '../dist/index.html')
    })
    // new StyleLintPlugin({
    //   files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    // })
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue','less','json'],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  }
};