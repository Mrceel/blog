---
title: webpack 使用 vue
date: 2020-08-19
tag: [ webpack]
category: Webpack
---

# webpack 使用 vue


安装：

`yarn add vue  vue-loader vue-template-compiler`

`webpack` 无法打包 `.vue` 文件，则需要安装 `vue-loader` `vue-template-compiler`

配置： 

webpack.config.js
```javascript
const path = require('path')
const WebpackHtmlPlugin = require("html-webpack-plugin")
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // 重点

module.exports = {
    mode: 'development',
    entry: {
        app: './main.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new VueLoaderPlugin(),
        new WebpackHtmlPlugin({ // 重点
            title: 'Habit',
            template: './index.html' 
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node-modules/
            },
            { // 重点
                test: /\.vue$/,
                use: 'vue-loader'
            },
        ]
    }
}
```
在 src 下新建 a.vue app.vue 文件。

app.vue
```
<template>
  <div>
      <h1>153</h1>
      <A/>
  </div>
</template>

<script>
import A from './a.vue'
export default {
    data() {
        return {}
    },
    components:{
        A
    }
}
</script>

<style></style>
```
a.vue
```
<template>
  <div>
      {{msg}}
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'this is a file'
        }
    },
}
</script>

<style></style>
```



入口文件 main.js

main.js
```javascript
import Vue from 'vue'
import App from './src/app.vue';

new Vue({
    render: h => h(App)
}).$mount('#app')
```

main.js 同级 index.html 文件

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```
至此， 已经可以再页面上看到预期的结果了。


使用 css 在a.vue 中添加样式, 如下。
```
<template>
  <div>
      {{msg}}
      <div>
          a file
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'this is a file'
        }
    },
}
</script>

<style scoped>
    div{
        color: red;
    }
</style>
```
此时 `webpack` 编译会报错，因为它无法识别 `style` 因此需要下载 对应的 `loader`

```
yarn add css-loder vue-style-loader
```
配置 

在 `webpack.donfig.js` 中添加一条规则， 用来解析 `.vue` 中的 `style` 。

webpack.donfig.js
```
{
    test: /\.css$/,
    use: [
        'vue-style-loader',
        'css-loader'
    ]
},
```
解析器的执行顺序是从下往上(先 `css-loader` 再 `vue-style-loader`)
这时候可以试着把 `scoped` 去掉，看看 `app.vue` 中的文字是不是跟着变色。


******

使用 `scss/sass/less`

安装

```
yarn add sass-loader  node-sass
```

如果没有安装 `node-sass` 可能会报错 `Error: Cannot find module 'sass'`

`webpack.config.js rules` 中添加一条规则。

```javascript
{
    test: /\.sass$/,
    use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
    ]
},
```

试一下吧：

```
<template>
  <div>
      {{msg}}
      <div>
          a file

          <p>
              this is p element
          </p>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'this is a file'
        }
    },
}
</script>

<style scoped lang='scss'>
    div{
        color: red;
        p{
            color: blue;
        }
    }
</style>
```

如果是使用 `Sass` 添加以下 

```
{
    test: /\.sass$/,
    use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
    ]
},
```

如果是使用 `Less` 添加以下 

```
{
    test: /\.less$/,
    use: [
        'vue-style-loader',
        'css-loader',
        'less-loader'
    ]
},
```

`css-loader` 和 `style-loader` 区别及作用 https://www.jianshu.com/p/d2470f719fee
****

`babel-present-env` 仅仅转换 新版的语法 `箭头函数` ，并不转换新版`api ``Array.include`