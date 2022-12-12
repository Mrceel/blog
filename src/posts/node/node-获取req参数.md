---
title: node 获取req参数
date: 2017-04-6 10:35:15
tag: [Node]
category: Node
---

<center>
 
# 获取request参数的四种方法: #
 </center>
<!-- more -->
1. ** req.body **
	解析body不是nodejs默认提供的，你需要载入body-parser中间件才可以使用req.body
	此方法通常用来解析POST请求中的数据

2. ** req.query **
	由nodejs默认提供，无需载入中间件
	此方法多适用于GET请求，解析GET里的参数

3. ** req.params **
	nodejs默认提供，无需载入其他中间件
	多适用于restful风格url中的参数的解析。

# req.query与req.params的区别
* req.params包含路由参数（在URL的路径部分），而req.query包含URL的查询参数（在URL的？后的参数）。
