---
title: 搭建 webpack4.3 开发环境
date: 2020-07-09 17:52:03
tag: [ webpack]
category: webpack
---


# 搭建 webpack4.3 开发环境

## 首先安装 `webpack`:
```
yarn add webpack 
```
接着安装 `webpack-cli`（此工具用于在命令行中运行 `webpack`）

目录结构：
```
|-- ▶ node_modules
|-- ▼ src
    |- index.js
|-- index.html
|-- main.js
|-- package.json
|-- webpack.config.js
|-- yarn.lock

```

测试 `webpack`

**index.js**
```javascript
function fn(param) { 
    console.log(param);
}

module.exports ={
    d: '123',
    fn: fn
}
```
**index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="./dist/bundle.js"></script>
</body>
</html>
```
**main.js**
```javascript
const a = require('./src/index.js')

console.log(a.d);
a.fn(55)

```

`package.json`
```json
{
  "scripts": {
    "start": "webpack"
  },
  "dependencies": {
    "@babel/core": "7.0.0",
    "babel-loader": "^8.1.0",
    "babel-preset-env": "^1.7.0",
    "html-webpack-plugin": "^4.3.0",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  },
  "devDependencies": {}
}

```

控制台顺利输出 123   55 便是成功了

************
## 使用插件

### 

### 设置 HtmlWebpackPlugin
安装
```
yarn add html-webpack-plugin
```
**`HtmlWebpackPlugin`** 主要有两个作用：

    1. 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
    2. 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
配置
```javascript
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        app: './main.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname(), 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({  
            title: 'Habit' // 这里的title 会自动替换生成页面的title
        })
    ]
}
```

`html-webpack-plugin` 插件详细用法介绍： https://www.jianshu.com/p/08a60756ffda
***
### 清理生成的旧文件 clean-webpack-plugin 

安装
```
yarn add clean-webpack-plugin
```
配置
```javascript
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    entry: {
        app: './main.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname(), 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({  
            title: 'Habit' // 这里的title 会自动替换生成页面的title
        })
    ]
}
```
现在执行 npm run build，再检查 /dist 文件夹。如果一切顺利，你现在应该不会再看到旧的文件，只有构建后生成的文件！(摘抄自官网 T.T)

### 模块热替换(Hot Module Replacement 或 HMR)
每次修改代码后都要 编译 一下，实在是太过麻烦。浪费时间！这时候就需要热替换插件了。

**安装**
```
yarn add webpack-dev-server 
```
`webpack-dev-server` 为你提供了一个简单的 `web` 服务器，并且能够实时重新加载(`live reloading`)
配置
修改配置文件，告诉开发服务器(`dev server`)，在哪里查找文件：
```javascript
const path = require('path')
const WebpackHtmlPlugin = require("html-webpack-plugin")
+ const webpack = require('webpack')   

module.exports = {
    mode: 'development',
    entry: {
        app: './main.js'
    },
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
     +   hot: true
    },
    plugins: [
        new WebpackHtmlPlugin({
            title: 'Habit',
            template: './index.html'
        }),
    +    new webpack.NamedModulesPlugin(),
    +    new webpack.HotModuleReplacementPlugin()
    ]
}
```

`package.json`
```json
{
  "scripts": {
    "start": "webpack",
+    "serve": "webpack-dev-server --open"
  },
  "dependencies": {
    "@babel/core": "7.0.0",
    "babel-loader": "^8.1.0",
    "babel-preset-env": "^1.7.0",
    "html-webpack-plugin": "^4.3.0",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  },
  "devDependencies": {}
}

```
执行 `yarn serve` 或者 `npm serve` 即可。


**热更新 在我们每次改变代码，或者资源文件的时候，整个页面其实都会刷新。而使用热更新之后，会直接替换掉，也仅仅替换更改后的依赖模块，而不用刷新整个页面，你可以简单理解成局部更新。**



### 使用babel

为了编译 `es5` 以上的新语法 安装`babel`
```
babel-loader @babel/core @babel/preset-env
```
**建议**先安装 `babel-loader` 安装完成后会提示安装相应版本的 `@babel/core` 

安装 `@babel/preset-env` `@babel/polyfill`
`@babel/preset-env` 的作用是告诉babel使用哪种转码规则进行文件处理。事实上，babel有几种规则都可以实现对ES6语法的转码，如`babel-preset-es2015`、`babel-preset-latest`、`babel-preset-env`，不过官方现已建议采用`@babel/preset-env`，


配置

`webpack.config.js`
```javascript
const path = require('path')
const WebpackHtmlPlugin = require("html-webpack-plugin")
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        app: './main.js'
    },
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new WebpackHtmlPlugin({
            title: 'Habit',
            template: './index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
+    module: {
+        rules: [
+            {
+                test: /\.js$/,
+                use: 'babel-loader',
+                exclude: /node-modules/ // 排除此文件夹 不编译
+            }
+        ]
+    }
}

```

新建 `.babelrc` 文件，配置 `babel` 规则。

`.babelrc`
```javascript
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "edge": "17", //   程序支持支持 Edge 17
                    "firefox": "60", //   程序支持支持 firefox 60
                    "chrome": "67", //   程序支持支持  chrome 67
                    "safari": "11.1" // 程序支持safari 11.1
                    // 支持的配置有以下： chrome, opera, edge, firefox, safari, ie, ios, android, node, electron.
                },
                "corejs": 2, //新版本需要指定核⼼库版本 
                "useBuiltIns": "usage" //按需注⼊
            }
        ]
    ]
}
```
测试：

index.js
```javascript
function fn() { 
    let arr = ae[1, 2, 3].map(i=> i*2)
    console.log(arr);
 }

module.exports ={
    d: '123',
    fn: fn
}
```

maim.js
```javascript
const a = require('./src/index.js')

a.fn(55)
```

在控制台查看输出即可。




***********
file-loader  加载图片、文字等




