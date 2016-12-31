var path = require('path');
var webpack = require('webpack');

var isProduction = !!process.env.PROD_DEV;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: isProduction  ? 
    ['./src/index']
    :
    [
      'webpack-hot-middleware/client',
      './src/index'
    ]
  ,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: isProduction ? 'bundle.js' : 'bundle.js',
    publicPath: '/static/'
  },
  plugins: isProduction ? 
    [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new webpack.optimize.AggressiveMergingPlugin()
    ]
    :
    [
      new webpack.HotModuleReplacementPlugin()
    ]
  ,
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
