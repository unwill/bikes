import path from 'path';
// import webpack from 'webpack';

const isProd = process.env.NODE_ENV === 'production';

export default {
  entry: [
    './src/',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: isProd ? '/static/' : 'http://localhost:8080/dist/',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    port: 8080,
  },
  mode: 'development',
};
