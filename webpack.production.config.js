var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },
    { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
    ]
  }
};
