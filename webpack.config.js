const webpack = require('webpack');
const meta = require('./package.json');

module.exports = {
  entry: './module.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: meta.name,
    library: 'EventEmitter',
    libraryTarget: 'umd',
  },
  devServer: {
    contentBase: './dist',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin([
      `${meta.name} - ${meta.version}`,
      `${meta.homepage}`,
      `Copyright 2016 ${meta.author.name}`,
    ].join('\n'))
  ]
};
