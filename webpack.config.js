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
            test: /\.js$|\.jsx$/,
            loader: ['babel-loader'],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },{
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: 'images/[name].[ext]'
                  }  
                }
              ]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',
    devServer: {
        disableHostCheck: true,
        host: "0.0.0.0"
    }
  };