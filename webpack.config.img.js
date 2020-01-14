const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./jobs/img.js",
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'miniimg'),
      publicPath:"miniimg"
    },
    module: {
      rules: [
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                  // limit: 8*1024
                  limit: 1,
                  name:'[name].[ext]'
                }
            },
              {
                  loader: 'image-webpack-loader',
                  options: {
                      mozjpeg: {
                          progressive: true,
                          quality: 60
                      },
                      optipng: {
                          enabled: true
                      },
                      pngquant: {
                          quality: 60,
                          speed: 4
                      },
                      gifsicle: {
                          interlaced: false
                      }
                  }
              }
          ]
      }
      ]
    },
    plugins: [
      new CleanWebpackPlugin()
  ]
};