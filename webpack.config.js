const meta = require('./package.json');

module.exports = {
  entry: './src/EventEmitter.js',
  output: {
    filename: meta.name,
    path: __dirname,
    library: 'EventEmitter',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      }
    ]
  },
};
