---
title: Node安装配置
date: 2020-05-4 20:22:38
tag: [Node]
category: Node
---

*设置全局缓存存放路径*

```
npm config set cache "D:\ProgramData\node\node_cache"
```

*设置全局模块安装路径*

```
npm config set prefix "D:\ProgramData\node\node_global"
```
<!-- more -->


**查看源地址**： ` npm config get registry `

**设置源地址**：`npm config set registry https://registry.npmmirror.com`

**npm官方源地址**：`https://registry.npmjs.org`



## Node**环境变量设置**

系统环境变量 -> 系统变量 -> path 中新建

`D:\ProgramData\node`

`D:\ProgramData\node\node_global`

好像设置前两个就行了， 下面这个先不设置。

`D:\ProgramData\node\node_global\node_modules`