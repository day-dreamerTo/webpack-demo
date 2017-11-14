/**
 * Created by admin on 17/11/14.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        index: './src/js/index.js',
        cart: './src/js/cart.js',
        vendor: ['jquery', './src/js/common.js'] // 这样vendor.js里面也有common,就可以抽取出来公共模块
    },
    output: {
        path: path.join(__dirname,'./dist'),
        filename: 'js/[name].js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                // 把样式放在style标签中插入header中
                loader: 'style-loader!css-loader'
                // 把样式抽取出来放在css文件中
               /* use: ExtractTextWebpackPlugin.extract({
                    // 先使用css-loader之后再用style-loader
                    fallback: 'style-loader',
                    use: 'css-loader'
                })*/
            }
        ]
    },
    plugins: [
        // 抽取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['index', 'cart', 'vendor'],
            mikChunks: 3 // 如果某个文件被以上3个文件引用则抽取出来,否则不
        }),
        new CleanWebpackPlugin(['./dist', ], {
            root: path.join(__dirname, ''),
            verbose: true,
            dry: false
        }),
        new webpack.optimize.UglifyJsPlugin({
           compress: {
               warnings: true
           }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index', 'vendor'],// 指定要引用的那些块
            minify: {
                removeComments: true, // 只对 '//' 有效
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'cart.html',
            template: './src/cart.html',
            chunks: ['cart', 'vendor'],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new ExtractTextWebpackPlugin('css/[name].css')
    ],
    // devtool: '#source-map'
}