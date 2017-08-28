# webpackSample
本文源自http://www.jianshu.com/p/42e11515c10f
看到好文后，按照文章自己进行学习了一遍 也进行了小的修改
# 写在前面的话
> 阅读本文之前，先看下面这个webpack的配置文件，如果每一项你都懂，那本文能带给你的收获也许就比较有限，你可以快速浏览或直接跳过；如果你和十天前的我一样，对很多选项存在着疑惑，那花一段时间慢慢阅读本文，你的疑惑一定一个一个都会消失；如果你以前没怎么接触过Webpack，而你又你对webpack感兴趣，那么动手跟着本文中那个贯穿始终的例子写一次，写完以后你会发现你已明明白白的走进了Webpack的大门。
  
        // 一个常见的`webpack`配置文件
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
        
# 什么是WebPack，为什么要使用它？
## 为什要使用WebPack
现今的很多网页其实可以看做是功能丰富的应用，它们拥有着复杂的JavaScript代码和一大堆依赖包。为了简化开发的复杂度，前端社区涌现出了很多好的实践方法

模块化，让我们可以把复杂的程序细化为小的文件;
类似于TypeScript这种在JavaScript基础上拓展的开发语言：使我们能够实现目前版本的JavaScript不能直接使用的特性，并且之后还能转换为JavaScript文件使浏览器可以识别；
Scss，less等CSS预处理器
...
这些改进确实大大的提高了我们的开发效率，但是利用它们开发的文件往往需要进行额外的处理才能让浏览器识别,而手动处理又是非常繁琐的，这就为WebPack类的工具的出现提供了需求。
<ul>
<li><strong>模块化</strong>,让我们可以把复杂的程序细化为小的文件;</li>
<li>类似于TypeScript这种在JavaScript基础上拓展的开发语言：使我们能够实现目前版本的JavaScript不能直接使用的特性，并且之后还能转换为JavaScript文件使浏览器可以识别；</li>
<li>Scss，less等CSS预处理器</li>
<li>...</li>
</ul>
这些改进确实大大的提高了我们的开发效率，但是利用它们开发的文件往往需要进行额外的处理才能让浏览器识别,而手动处理又是非常繁琐的，这就为WebPack类的工具的出现提供了需求。

## 什么是Webpack
WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。
## WebPack和Grunt以及Gulp相比有什么特性
其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。

Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，工具之后可以自动替你完成这些任务。
<img src="http://upload-images.jianshu.io/upload_images/1031000-d0693c06bb3a00e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width = "600" height = "300"  align=center />
<center>Grunt和Gulp的工作流程</center>
</br>
Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。
<img src="http://upload-images.jianshu.io/upload_images/1031000-160bc667d3b6093a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width = "600" height = "300"  align=center />
<center>Webpack工作方式</center>
如果实在要把二者进行比较，Webpack的处理速度更快更直接，能打包更多不同类型的文件。

# 开始使用Webpack
初步了解了Webpack工作方式后，我们一步步的开始学习使用Webpack。
## 安装
Webpack可以使用npm安装，新建一个空的练习文件夹（此处命名为webpack sample project），在终端中转到该文件夹后执行下述指令就可以完成安装。

    //全局安装
    npm install -g webpack
    //安装到你的项目目录
    npm install --save-dev webpack    
## 正式使用Webpack前的准备
1. 在上述练习文件夹中创建一个package.json文件，这是一个标准的npm说明文件，里面蕴含了丰富的信息，包括当前项目的依赖模块，自定义的脚本任务等等。在终端中使用npm init命令可以自动创建这个package.json文件

        npm init
        
输入这个命令后，终端会问你一系列诸如项目名称，项目描述，作者等信息，不过不用担心，如果你不准备在npm中发布你的模块，这些问题的答案都不重要，回车默认即可。
2. package.json文件已经就绪，我们在本项目中安装Webpack作为依赖包

        // 安装Webpack
        npm install --save-dev webpack
3. 回到之前的空文件夹，并在里面创建两个文件夹,app文件夹和public文件夹，app文件夹用来存放原始数据和我们将写的JavaScript模块，public文件夹用来存放之后供浏览器读取的文件（包括使用webpack打包生成的js文件以及一个index.html文件）。接下来我们再创建三个文件:

`index.html` --放在public文件夹中;

`Greeter.js`-- 放在app文件夹中;

`main.js`-- 放在app文件夹中;

此时项目结构如下图所示
<img src="http://upload-images.jianshu.io/upload_images/1031000-976ba1a06fd0702f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width = "300" height = "300"  align=center />
<center>项目结构</center>
我们在<code>index.html</code>文件中写入最基础的html代码，它在这里目的在于引入打包后的js文件（这里我们先把之后打包后的js文件命名为<code>bundle.js</code>，之后我们还会详细讲述）。

        <!-- index.html -->
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>Webpack Sample Project</title>
          </head>
          <body>
            <div id='root'>
            </div>
            <script src="bundle.js"></script>
          </body>
        </html>
        
我们在`Greeter.js`中定义一个返回包含问候信息的html元素的函数,并依据CommonJS规范导出这个函数为一个模块：

        // Greeter.js
        module.exports = function() {
          var greet = document.createElement('div');
          greet.textContent = "Hi there and greetings!";
          return greet;
        };
        
`main.js`文件中我们写入下述代码，用以把`Greeter`模块返回的节点插入页面。

        //main.js 
        const greeter = require('./Greeter.js');
        document.querySelector("#root").appendChild(greeter());
## 正式使用Webpack
webpack可以在终端中使用，在基本的使用方法如下：

        # {extry file}出填写入口文件的路径，本文中就是上述main.js的路径，
        # {destination for bundled file}处填写打包文件的存放路径
        # 填写路径的时候不用添加{}
        webpack {entry file} {destination for bundled file}
        
指定入口文件后，webpack将自动识别项目所依赖的其它文件，不过需要注意的是如果你的webpack不是全局安装的，那么当你在终端中使用此命令时，需要额外指定其在node_modules中的地址，继续上面的例子，在终端中输入如下命令

        # webpack非全局安装的情况
        node_modules/.bin/webpack app/main.js public/bundle.js
结果如下
<img src="http://upload-images.jianshu.io/upload_images/1031000-b9e69a58e3518ba7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width = "500" height = "200"  align=center />
<center>使用命令行打包</center>

可以看出`webpack`同时编译了`main.js` 和`Greeter,js`,现在打开`index.html`,可以看到如下结果
<img src="http://upload-images.jianshu.io/upload_images/1031000-6cf1ecc41ef8c31d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width = "500" height = "400"  align=center />
<center>运行结果</center>

有没有很激动，已经成功的使用`Webpack`打包了一个文件了。不过在终端中进行复杂的操作，其实是不太方便且容易出错的，接下来看看`Webpack`的另一种更常见的使用方法。
## 通过配置文件来使用`Webpack`

`Webpack`拥有很多其它的比较高级的功能（比如说本文后面会介绍的`loaders`和`plugins`），这些功能其实都可以通过命令行模式实现，但是正如前面提到的，这样不太方便且容易出错的，更好的办法是定义一个配置文件，这个配置文件其实也是一个简单的JavaScript模块，我们可以把所有的与打包相关的信息放在里面。

继续上面的例子来说明如何写这个配置文件，在当前练习文件夹的根目录下新建一个名为`webpack.config.js`的文件，我们在其中写入如下所示的简单配置代码，目前的配置主要涉及到的内容是入口文件路径和打包后文件的存放路径。

        module.exports = {
          entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
          output: {
            path: __dirname + "/public",//打包后的文件存放的地方
            filename: "bundle.js"//打包后输出文件的文件名
          }
        }

> 注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。

有了这个配置之后，再打包文件，只需在终端里运行`webpack(非全局安装需使用node_modules/.bin/webpack)`命令就可以了，这条命令会自动引用`webpack.config.js`文件中的配置选项，示例如下：
<img src="http://upload-images.jianshu.io/upload_images/1031000-c02a675d8d8c9e56.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width = "500" height = "200"  align=center />
<center>配合配置文件进行打包</center>

又学会了一种使用`Webpack`的方法，这种方法不用管那烦人的命令行参数，有没有感觉很爽。如果我们可以连`webpack(非全局安装需使用node_modules/.bin/webpack)`这条命令都可以不用，那种感觉会不会更爽~，继续看下文。

更多详细内容，请到~~