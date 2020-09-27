// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');
const fs = require('fs');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    './index.tsx', // the entry point of our app
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true, // enable HMR on the server,
    https: {
      cert: fs.readFileSync('/Users/eddib/.localhost-ssl/localhost.crt'),
      key: fs.readFileSync('/Users/eddib/.localhost-ssl/localhost.key'),
    },
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
  ],
});
