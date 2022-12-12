---
title: slice.call( arguments )祥解
date: 2019-07-16 17:35:10
tag: [JavaScript]
category: JavaScript
---
[].shift.call( arguments ) 和 [].slice.call( arguments ) 祥解
经典的 `[].slice.call( arguments )` 关于这个的解释网上有很多，大多是 _“把类数组对象转为数组对象”_。确实这是我们想要实现的功能！ 但这仅仅是说明了结果并没有解答其原理。
<!-- more -->
来点基础知识：
```javascript
[].slice.call( arguments )
// 等效于
Array.prototype.slice.call( arguments )
```

**个人理解：**
要把`arguments` 转为数组对象！
本着 **能少写就少写，能不写就不写的想法**，想到` slice():可从已有的数组中返回选定的元素。 `
`slice` 不会改变原来的数组，而是返回一个子数组。
```javascript
let kindle = [1,2,3,4,5,6,7]
console.log(kindle.slice())  // [ 1, 2, 3, 4, 5, 6, 7 ]
```
那么下一个问题又来了，`arguments` 不是数组对象，不能调用数组的方法。
` arguments `想要转为数组对象，怎么转？ ` for `循环等。。。

 但是**能少写就少写，能不写就不写**
 这时候又要解锁一个` call `函数，或者 `apply` 函数。这两个函数都可以改变函数 `this` 的指向，函数运行时的作用域。区别就是参数不一样，**第一个参数都是一个对象或者 ‘this’ 注意this加引号了，  apply第二个参数接收一个数组，call则不是，call可以有n个参数有多少放多少就行**

**call函数详解**[点击这里](https://mrceel.cn/call%E5%87%BD%E6%95%B0%E7%90%86%E8%A7%A3.html)

`slice` 方法原理就是根据传入的参数（值）对原数组（或者类数组）进行遍历获取，赋给新数组然后返回。如果没有参数便复制整个原数组（或者类数组），后赋给新数组然后返回。

**重点来了**
**因为` slice `内部实现是使用的` this `代表调用对象。那么当` [].slice.call() ` 传入 `arguments  `对象的时候，通过 `call `函数改变原来 `slice`方法的` this `指向, 使其指向` arguments `，并对` arguments `进行复制操作，而后返回一个新数组。至此便是完成了` arguments `类数组转为数组的目的！**

其实这可以理解为，**让类数组调用数组的方法！**
### `[].shift.call( arguments )` 
`[].shift.call( arguments )` 这便是一个例子。
`shift()` 方法删除数组第一项，并返回删除项。
根据上边的理解，这句代码意思就是： “删除并拿到`arguments`的第一项”