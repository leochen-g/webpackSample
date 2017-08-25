/**
 * Created by geng on 2017/8/25.
 */
const webpack = require('webpack')
//引入html模版自动生成插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

 module.exports = {
     entry: __dirname + '/app/main.js', //入口文件
     output: {
         path: __dirname + '/build/', // 打包后存放的位置
         filename: "bundle.js"
     },
     //生成Source Maps
     devtool: "eval-source-map",
     //构建本地服务器，监听代码修改
     devServer: {
        contentBase: './build',//本地服务器所加载的页面所在的目录
         historyApiFallback: true,//不跳转
         inline: true, //实时刷新
         hot: true
     },
     //配置babel
     module: {
         rules: [
             {
                 test: /(\.jsx|\.js)$/,
                 use: {
                     loader: "babel-loader",
                 },
                 exclude: /node_modules/
             },
             {
                 test: /\.css$/,
                 use: [
                     {
                         loader: "style-loader"
                     },{
                         loader: "css-loader",
                         options: {
                             modules: true
                         }
                     },
                     {
                         loader: "postcss-loader"
                     }
                 ]
             }
         ]
     },
     plugins: [
         new webpack.BannerPlugin('版权所有，翻版必究'),
         new HtmlWebpackPlugin({
             template:__dirname + '/app/index.tmpl.html' //new 一个实例传入相关参数
         }),
         new webpack.HotModuleReplacementPlugin()//热加载插件
     ],
 }