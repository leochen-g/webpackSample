/**
 * Created by geng on 2017/8/25.
 */
/**
 * Created by geng on 2017/8/25.
 */
const webpack = require('webpack')
//引入html模版自动生成插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: __dirname + '/app/main.js', //入口文件
    output: {
        path: __dirname + '/build/', // 打包后存放的位置
        filename: "bundle-[hash].js"
    },
    //生成Source Maps
    devtool: "none",
    //构建本地服务器，监听代码修改
    devServer: {
        contentBase: './build',//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true, //实时刷新
        hot: true
    },
    //配置bable,stye-loader,css-loader,postcss-loader
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
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use: [
                        {
                        loader: "css-loader",
                        options:{
                            modules: true
                        }
                    },{
                        loader:"postcss-loader"
                        }
                    ],
                    }
                )
            },
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template:__dirname + '/app/index.tmpl.html' //new 一个实例传入相关参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(), //为组件分配ID
        new webpack.optimize.UglifyJsPlugin(), //uglifyJsPlugin：压缩JS代码
        new ExtractTextPlugin("style.css") //分离CSS和JS文件
    ],
}