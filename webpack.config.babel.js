import autoprefixer from 'autoprefixer';
import path from 'path';
import precss from 'precss';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default () => ({
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    contentBase: './dist',
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [precss, autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
});
