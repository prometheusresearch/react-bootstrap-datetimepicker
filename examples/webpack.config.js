var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    'basic': './examples/basic/basic.js',
  },

  output: {
    path: __dirname,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map',
    assetPath: '/',
  },

  resolve: {
    alias: {
      'react-bootstrap-datetimepicker': '../../src/DateTimeField'
    }
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader?stage=0' },
    ]
  },
  devServer: {
    contentBase: 'examples/',
    stats: {colors: true},
  },

  devtool: "eval-source-map",
  plugins: [new HtmlWebpackPlugin({
    template: __dirname + '/basic/index.html'
  })]

};
