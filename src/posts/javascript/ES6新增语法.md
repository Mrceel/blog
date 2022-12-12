---
title: ES6新增语法
date: 2017-02-05 14:47:14
tag: [Es6]
category: JavaScript
---
<center> 

# let,const # 
</center>
<!-- more -->
let命令的用法类似于var，用来声明变量。可以把let看成var，只是它定义的变量被限定在了特定范围内才能使用，而离开这个范围则无效。
```
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```

const也用来声明变量，但是声明的是常量。一旦声明，常量的值就不能改变。
```
const PI = Math.PI
PI = 23 //Module build failed:  "PI" is read-only
```
# class 定义 类 #
类实际上是个“特殊的函数”，就像你能够定义的函数表达式和函数声明一样，类语法有两个组成部分：类表达式和类声明

## 类声明 ##
定义一个类的一种方法是使用一个类声明。要声明一个类，你可以使用带有class关键字的类名（这里是“Rectangle”）。
```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```
# 箭头函数 #
ES6允许使用“箭头”（=>）定义函数
```
var f = v => v;

//上面的箭头函数等于:

var f = function(v){
    return v;
}
```
箭头函数除了能简化代码，还有更大的好处：减少this的使用。箭头函数内部没有constructor方法，也没有prototype，所以不支持new操作。但是它对this的处理与一般的普通函数不一样。* 箭头函数的 this 始终指向函数定义时的 this，而非执行时。 *
例如:
```
var o = {
    x : 1,
    func : function() { console.log(this.x) },
    test : function() {
        setTimeout(function() {
            this.func();
        }, 100);
    }
};

o.test(); // TypeError : this.func is not a function
```
上面的代码会出现错误，因为this的指向从o变为了全局（函数调用中的this都是指向全局的）。我们需要使用外部变量事先保存this，修改上面的代码如下：
```
var o = {
    x : 1,
    func : function() { console.log(this.x) },
    test : function() {
        var _this = this;
        setTimeout(function() {
            _this.func();
        }, 100);
    }
};

o.test();
```
这段代码如果使用箭头函数，就不需要使用this，因为箭头函数的 this 始终指向函数定义时的 this，而非执行时。所以我们将上面的代码修改如下：
```
var o = {
    x : 1,
    func : function() { console.log(this.x) },
    test : function() {
        setTimeout(() => { this.func() }, 100);
    }
};

o.test();
```

# 字符串模板（反引号 `） #
ES6中提供了用反引号｀来创建字符串，里面可包含${…}，即在字符串中可以添加变量
```
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```

# rest, spread #
扩展运算符（ spread ）和Rest操作符都是用三个点（…）表示，但作用整好相反。Rest操作符一般用在函数参数的声明中，而扩展运算符用在函数的调用中。
```
function func(...args){
    console.log(args);//[1,2,3,4]
}
func(1,2,3,4);
```
# for…of #
for...of(这里先记录一下之后在深入了解一下)
```
let arr = [1,2,3];
for (let itr of arr) {
  console.log(itr); //1 2 3
}
```

# Map, Set #
(依然是先做记录之后深入了解)
ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。
```
四个操作方法：
add(value)：添加某个值，返回Set结构本身。
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
has(value)：返回一个布尔值，表示该值是否为Set的成员。
clear()：清除所有成员，没有返回值
```

Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

```
//实例属性和方法：size、set、get、has、delete、clear

list = supportList.map(
    (item,index) =>
        <option key={item.a} value={item.b}>
            {item.c}
        </option>
    );
```

# Symbols #
(目前我也不知道是做什么用的,先记录一下吧!)
Symbol 是一种新的数据类型，它的值是唯一的，不可变的。ES6 中提出 symbol 的目的是为了生成一个唯一的标识符，不过你访问不到这个标识符.
```
var sym = Symbol( "Symbol" );
console.log(typeof sym); // symbol
```
如果要获取对象 symbol 属性，需要使用Object.getOwnPropertySymbols(o)

# Iterators（迭代器） #
(先记录,之后深入了解一下)
ES6 中可以通过 Symbol.iterator 给对象设置默认的遍历器，直到状态为true退出。
```
var arr = [11,12,13];
var itr = arr[Symbol.iterator]();

itr.next(); //{ value: 11, done: false }
itr.next(); //{ value: 12, done: false }
itr.next(); //{ value: 13, done: false }
itr.next(); //{ value: undefined, done: true }
```
# 解构 #
(值得深入了解一下...)
解构赋值是ES6中推出的一种高效、简洁的赋值方法
```
//通常情况下
var arr = [1,2,3];
var first = arr[0];
var two = arr[1];
var three = arr[2];

//解构赋值
let [first, two, three] = arr;

//first = 1;
//two = 2;
//three = 3;
```