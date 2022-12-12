---
title: call 函数的理解
date: 2018-10-30
tag: [JavaScript]
category: JavaScript
---
call() 用来改变this的指向，先来看下call函数的用法。
<!-- more -->
```javascript
function fn(){
	console.log(this.a, this.b);
}

fn(); //  undefined undefined

let c = {
	'a': 12,
	'b': 24
}

fn.call(c); // 12  24

```
再来看下这个小栗子（原文地址：`https://www.cnblogs.com/donghezi/p/9742778.html`）
```javascript

function fn1() { 
    console.log('fn1----', this);
}

function fn2() { 
    console.log('fn2-----', this);
}

fn1.call(fn2);  //fn1---- function fn2() {    重点一
                //    console.log('fn2-----', this);
                //}

```
结合上边的例子，再来看下这个。
```javascript
// ES6 call 实现
Function.prototype.es6Call = function (context) {
  var context = context || window;
  context.fn = this;
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }
  const result = context.fn(...args);
  delete context.fn;
  return result;
}
//原文：https://blog.csdn.net/u010377383/article/details/80646415 
```
这里的 `context.fn = this;` `this`其实就是上边例子输出的 `fn2`函数.
`args.push('arguments[' + i + ']');` 相当于是在数组中放入了`[ arguments[1], arguments[2], ... ]`


