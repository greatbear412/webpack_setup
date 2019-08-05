const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


module.exports = {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        filename: 'app.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    // 生产模式
    mode: 'production',
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    // babel + ng-annotate的配置在.babelrc
                    // 在要inject的function里第一句加 'ngInject';
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }  
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  {
                      loader: 'file-loader',
                      options: {
                          name:'[name].[ext]',
                          outputPath: 'img'
                      }
                  },
                  {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 75
                        },
                        optipng: {
                            enabled: true
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false
                        }
                    }
                }
            ]
        }
    ]},
    // 避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
    // 因此 : - inline-source-map  + source-map
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        // 压缩
        new UglifyJSPlugin({
          sourceMap: true
        }),
        // 许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。
        // 例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。
        // 其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。
        // 综上： 加上这句，将显著减少使用react等库时打包后bundle的体积。
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // 打包成独立的css文件
        new MiniCssExtractPlugin({
            filename: "app.[contenthash].css",
            chunkFilename: "app.[contenthash].css"
        }),
        // 打包好的文件，在html里自动引用
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.html',
            filename: 'index.html' //relative to root of the application
        })
    ]

};
