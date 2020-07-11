const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.prod')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const prodConfig = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
module.exports = smp.wrap(merge(baseConfig, prodConfig));