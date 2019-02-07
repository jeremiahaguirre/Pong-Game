
const webpack = require('webpack');
const path = require('path');
const resolve = path.resolve;
const src = resolve(__dirname, 'src');
const build = resolve(__dirname, 'build');

module.exports = {
  mode: 'none',

  entry: {
    app: './src/index.js'
  },

  output: {
		path: build,
		filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: [src],
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader?configFile=.eslintrc',
        include: [src],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        },
        include: [src],
        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]&emitFile=false'
      }
    ]
  },

  devServer: {
		contentBase: path.resolve(__dirname, './'),
    watchContentBase: true,
    historyApiFallback: true,
    open: true,
    port: 3000,
    publicPath: '/build/',
    stats: 'errors-only',
    watchOptions: {
      ignored: /node_modules/
    }
  }
};
