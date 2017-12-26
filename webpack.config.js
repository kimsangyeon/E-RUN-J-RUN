const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack.config.js
module.exports = {
    entry: {
        ErunJrun: ['babel-polyfill', './src/js/index.js'],
      },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: ['babel-loader'],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map',
    devServer: {
        disableHostCheck: true,
        host: "0.0.0.0"
    }
  };