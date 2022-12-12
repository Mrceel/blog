---
title: Webpack 使用/配置
date: 2018-03-25 17:52:03
tag: [ webpack ]
category: Webpack
---
从零开始配置 Webpack； 在实际项目开发中，零配置是不存在的。
<!-- more -->
新建一个webpa文件夹， 初始化改文件夹
```
npm init
```
目的是生成 `package.json` 文件.

安装最新版本或特定版本的webpack
```
npm install --save-dev webpack
npm install --save-dev webpack@&lt;version&gl;
```

安装webpack-cli; 这里要全局安装，否者会出一个非法命令
```
npm i -g webpack-cli
```
`--save-dev` 是指在package.json里面生成安装的webpack等插件的版本信息
好了顺利的话已经可以使用了.

在`webp`文件夹内新建`src/index.js`
```javascript
document.write('hello webpack4!')
```

命令行输入：
```javascript
webpack --mode=development
```

成功后显示，打开 dist 文件夹会看到 main.js (默认输出到 dist)
```
Hash: f1dff803bf82cb639132
Version: webpack 4.17.1
Time: 135ms
Built at: 2018-08-29 20:42:46
  Asset     Size  Chunks             Chunk Names
main.js  3.8 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/index.js] 34 bytes {main} [built]
```

> --mode 模式 (必选，不然会有 WARNING)，是 webpack4 新增的参数选项，默认是 production

* --mode production 生产环境

 > * 提供 uglifyjs-webpack-plugin 代码压缩
  * 不需要定义 new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }) 默认 production
  * 默认开启 NoEmitOnErrorsPlugin -> optimization.noEmitOnErrors, 编译出错时跳过输出，以确保输出资源不包含错误
  * 默认开启 ModuleConcatenationPlugin -> optimization.concatenateModules, webpack3 添加的作用域提升(Scope Hoisting)


* --mode development 开发环境

 > * 使用 eval 构建 module, 提升增量构建速度
  * 不需要定义 new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }) 默认 development
  * 默认开启 NamedModulesPlugin -> optimization.namedModules 使用模块热替换(HMR)时会显示模块的相对路径


接下来创建 dist/index.html 并引入 main.js, 浏览器中打开看内容。
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>webpack-simple</title>
</head>
<body>
  <script type="text/javascript" src="./main.js"></script>
</body>
</html>
```

再创建一个文件 src/content.js, 在 src/index.js 中引入该模块
```javascript
// content.js
module.exports = 'Looooooooooooooong content!';
```

```javascript
// index.js
document.write(`Hello webpack4!${require('./content.js')}`);
```

再次执行 webpack --mode=development 完了打开 index.html
```
// 内容
Hello webpack4!Looooooooooooooong content!
```
