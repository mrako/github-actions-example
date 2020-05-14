const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const GLOBALS = {
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0:9000/api'),
};

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './src/index.jsx',
  },
  devServer: {
    contentBase: 'src/public',
    historyApiFallback: true,
    disableHostCheck: true,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8000,
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/env',
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/transform-runtime',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackCdnPlugin({
      modules: {
        react: [
          { name: 'react', var: 'React', path: 'umd/react.production.min.js' },
          { name: 'react-dom', var: 'ReactDOM', path: 'umd/react-dom.production.min.js' },
        ],
      },
      publicPath: '/node_modules',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{ from: 'src/public' }], '.'),
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin(GLOBALS),
  ],
};
