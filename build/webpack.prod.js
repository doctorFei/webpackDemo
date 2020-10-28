const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require("webpack")
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path = require('path');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const prodConfig = {
  mode: 'production',
  stats: 'errors-only',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]_[hash:8].js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'thread-loader',  // 多进行构建
            options: {
              workers: 3
            }
          },
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'thread-loader', // 多进行构建
            options: {
              workers: 3
            }
          },
          /**
           * 确保转译尽可能少的文件。你可能使用 /\.m?js$/ 来匹配，这样也许会去转译 node_modules 目录或者其他不需要的源代码。
            要排除 node_modules，参考文档中的 loaders 配置的 exclude 选项。
            你也可以通过使用 cacheDirectory 选项，将 babel-loader 提速至少两倍。这会将转译的结果缓存到文件系统中。
           */
          {
            loader: "babel-loader?cacheDirectory=true"
          },
          {
            loader: "eslint-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  optimization: {
    /**
     * main bundle 会随着自身的新增内容的修改，而发生变化。
      vendor bundle 会随着自身的 module.id 的变化，而发生变化。
      manifest runtime 会因为现在包含一个新模块的引用，而发生变化
      vendor hash 发生变化是我们要修复的。我们将 optimization.moduleIds 设置为 'hashed'：
     */
    moduleIds: 'hashed',
    runtimeChunk: 'single',//将 runtime 代码拆分为一个单独的 chunk。将其设置为 single 来为所有 chunk 创建一个 runtime bundle
    splitChunks: {
      // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多进程并行压缩 
        cache: true //开启压缩缓存
      })
    ]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HardSourceWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('../public/library-mainfest.json')
    }),
    // 将 dll 注入到 生成的 html 模板中
    new AddAssetHtmlPlugin({
      // dll文件位置
      filepath: resolve('../public/vendor/*.js'),
      // dll 引用路径
      publicPath: './vendor',
      // dll最终输出的目录
      outputPath: './vendor'
    })
    // new HtmlWebpackExternalsPlugin({
    //     externals: [
    //       {
    //         module: 'react',
    //         entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //         global: 'React',
    //       },
    //       {
    //         module: 'react-dom',
    //         entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //         global: 'ReactDOM',
    //       },
    //     ]
    // }),
  ]
}
module.exports = merge(baseConfig, prodConfig);
