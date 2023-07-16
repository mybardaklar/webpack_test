const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/* const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin'); */

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  /* optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CompressionPlugin({
        test: /\.js$|\.css(\?.*)?$/i
      })
    ]
  } */
});
