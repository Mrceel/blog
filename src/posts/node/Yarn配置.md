---
title: Yarn 配置
date: 2020-05-09 20:22:38
tag: [Node]
category: Node
---
## 查看当前源
```
yarn config get registry
```
<!-- more -->

## 修改为淘宝镜像源
```
yarn config set registry https://registry.npmmirror.com
```

## 全局安装目录
```
yarn global dir  //查看全局位置
yarn config set global-folder D:\ProgramData\Yarn\global
```

## 修改全局缓存目录
```
yarn cache dir //查看缓存位置
yarn cache clean // 清除缓存,在目录
yarn config set cache-folder D:\ProgramData\Yarn\cache
```


重新设置bin目录非常重要一步,设置`yarn` 全局模块读取目录 也不知道有没有用
而且需要把此目录加到系统环境变量 `D:\ProgramData\Yarn\global\node_modules\.bin`
```
yarn global bin  查看
yarn config set prefix D:\ProgramData\Yarn\global\node_modules\.bin
```