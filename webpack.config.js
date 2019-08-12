const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require("webpack-dashboard/plugin");
var dashboard = new Dashboard();

// 热更新插件，配合dev-server开始hot
new webpack.HotModuleReplacementPlugin();

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


module.exports = {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    // 开发模式 + webpack-dev-server ： dev-server把文件放在内存里
    mode: 'development',
    devServer: {
        contentBase: './dist',
        host: 'localhost',      // 默认是localhost
        port: 8080,             // 端口
        open: true,             // 自动打开浏览器
        hot: true,              // 开启热更新
        quiet: true             // lets WebpackDashboard do its job
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
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
                          //打包后图片的路径，页面要与此一致，不然图片打包了却引用不到 
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
                }]
            }
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        // 打包成独立的css文件
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        }),
        // 打包好的文件，在html里自动引用
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.html',
            filename: 'index.html' //relative to root of the application
        }),
        // 输出样式增强
        new DashboardPlugin(dashboard.setData)
    ]

};
