import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/EventEmitter.js',
  output: {
    filename: 'tom32i-event-emitter.js',
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
  devServer: {
    static: {
      directory: __dirname,
    },
    hot: false,
    compress: true,
    port: 8080,
  },
};
