---
title: CommonJS规范
date: 2017-01-28 16:36:31
tag: [CommonJS]
category: 前端
---
<center> 

# 定义模块 # 
</center>
<!-- more -->
在每个模块内部，module变量代表当前模块。它的exports属性是对外的接口，将模块的接口暴露出去。其他文件加载该模块，实际上就是读取module.exports变量。

```
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
```

# 加载模块 #

require方法用于加载模块，后缀名默认为.js

```
var app = require('./app.js');
```
** 模块加载的顺序，按照其在代码中出现的顺序 **
根据参数的不同格式，require命令去不同路径寻找模块文件。
1) 如果参数字符串以“/”开头，则表示加载的是一个位于绝对路径的模块文件。
2) 如果参数字符串以“./”开头，则表示加载的是一个位于相对路径的模块文件
3) 如果参数字符串不以“./“或”/“开头，则表示加载的是一个默认提供的核心模块（node核心模块，或者通过全局安装或局部安装在node_modules目录中的模块）

# 入口文件 #

一般都会有一个主文件（入口文件），在index.html中加载这个入口文件，然后在这个入口文件中加载其他文件。
** 可以通过在package.json中配置main字段来指定入口文件。 **

# 模块缓存 #

第一次加载某个模块时，Node会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的module.exports属性。

# 加载机制 #

CommonJS模块的加载机制是，** 输入的是被输出的值的拷贝。  ** 也就是说， ** 一旦输出一个值，模块内部的变化就影响不到这个值。 **

# CommonJS 规范 #

1. CommonJs规范的出发点：JS没有模块系统、标准库较少、缺乏包管理工具；为了让JS可以在任何地方运行，以达到Java、C#、PHP这些后台语言具备开发大型应用的能力；

2. 在CommonJs规范中：

    一个文件就是一个模块，拥有单独的作用域；

    普通方式定义的变量、函数、对象都属于该模块内；

    通过require来加载模块；

    通过exports和modul.exports来暴露模块中的内容；

3. 所有代码都运行在模块作用域，不会污染全局作用域；模块可以多次加载，但只会在第一次加载的时候运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果；模块的加载顺序，按照代码的出现顺序是同步加载的;

4. __dirname代表当前模块文件所在的文件夹路径，__filename代表当前模块文件所在的文件夹路径+文件名;

5. require（同步加载）基本功能：读取并执行一个JS文件，然后返回该模块的exports对象，如果没有发现指定模块会报错;

6. 模块内的exports：为了方便，node为每个模块提供一个exports变量，其指向module.exports，相当于在模块头部加了这句话：var exports = module.exports，在对外输出时，可以给exports对象添加方法，PS：不能直接赋值（因为这样就切断了exports和module.exports的联系）;

7. npm root -g：查看npm全局包安装位置，建议在nvm目录下新建npm\node_modules目录，然后设置npm的全局包安装位置：npm config set prefix ""，然后将该路径添加到环境变量中;

8. npm init -y：初始化一个package.json文件，加上-y就会默认生成该文件，无需一步一步填写；npm docs 包名：查看包的文档；npm install：安装package.json中dependencies属性中所有依赖的包

9. 由于npm的服务器是国外的，所以如果你没有和谐工具是下载不了的，这里推荐使用淘宝NPM镜像：http://npm.taobao.org/，与官方NPM的同步频率目前为10分钟一次；安装命令：npm install -g cnpm --registry=https://registry.npm.taobao.org，安装包：cnpm install 包名（其它命令基本一致）;

10. 如果你不想下载cnpm，npm还提供了一个镜像源管理工具：npm install -g nrm，通过：nrm ls，查看镜像源列表 ，通过：npm use 镜像源，来切换;

11. NPM的模块加载机制：

      如果require的是绝对路径文件，查找不会去遍历每个node_modules目录，其速度最快

　　1）.从module.paths数组中（由当前执行文件目录到磁盘根目录）取出第一个目录作为查找基准

　　2）.直接从目录中查找该文件，如果存在则结束查找，如果不存在则进行下一条查找

　　3）.尝试添加.js、.json、.node后缀之后查找，如果存在文件则结束查找，如果不存在则进行下一条查找

　　4）.尝试将require的参数作为一个包来进行查找，读取目录下的package.json文件，取得Main参数指定的文件

　　5）.尝试查找该文件，如果存在则结束查找，如果不存在则进行第3条查找

　　6）.如果继续失败，则取出module.paths数组中的下一目录作为基准查找，循环第1-5个步骤

　　7）.如果继续失败，循环第1-6个步骤，直到module.paths中的最后一个值

　　8）.如果继续失败，则抛出异常