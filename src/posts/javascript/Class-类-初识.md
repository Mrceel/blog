---
title: class 类--初识
date: 2017-01-17 15:37:03
tag: [Es6]
category: JavaScript
---
<center>

 # 类的声明 # 
 </center>
<!-- more -->
定义一个类的一种方法是使用一个类声明。要声明一个类，你可以使用带有class关键字的类名
>```
class Remou {
    constructor(name,age) {
      this.name = name;
      this.age = age;
    }
  }
```

## 不存在变量提升 ##

类不存在变量提升（hoist），这一点与 ES5 完全不同。
>```
new Foo(); // ReferenceError
class Foo {}
```
上面代码中，Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。
>```
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
```
上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义。

# 类的表达式 #

一个** 类表达式 **是定义一个类的另一种方式。类表达式可以是被命名的或匿名的。赋予一个命名类表达式的名称是类的主体的本地名称。
>```
//匿名的类
let Rou = class {
    constructor(name,age) {
      this.name = name;
      this.age = age;
    }
  }

//命名的类
let Rou = class Remou{
    constructor(name,age) {
      this.name = name;
      this.age = age;
    }
  }
```
** 注意:  ** 类**表达式**也同样受到**类声明**中提到的提升问题的困扰。

-------

# 类的方法和定义 #
<br>
> 一个类的类体是一对花括号 {} 中的部分。这是你定义类成员的位置，如方法或构造函数。

## 严格模式

>类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

>考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

类声明和类表达式的主体都执行在严格模式下。比如，构造函数，静态方法，原型方法，getter和setter都在严格模式下执行。

## constructor 方法

<span style="display:inline-block;background-color:#999">constructor</span>方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有<span style="display:inline-block;background-color:#999">constructor</span>方法，如果没有显式定义，一个空的constructor方法会被默认添加。

```
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```
上面代码中，定义了一个空的类Point，JavaScript 引擎会自动为它添加一个空的constructor方法。

constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
```
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```
上面代码中，constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。

-----
类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
```
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

# 类的实例化对象 #
生成类的实例对象的写法，与 ES5 完全一样，也是使用new命令。前面说过，如果忘记加上new，像函数那样调用Class，将会报错。
```
class Point {
  // ...
}

// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);
```
与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
```
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```
上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），所以hasOwnProperty方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以hasOwnProperty方法返回false。这些都与 ES5 的行为保持一致。

与 ES5 一样，类的所有实例共享一个原型对象。
```
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```
上面代码中，p1和p2都是Point的实例，它们的原型都是Point.prototype，所以\_\_proto\_\_属性是相等的。<br>
这也意味着，可以通过实例的\_\_proto\_\_属性为“类”添加方法。

\_\_proto\_\_ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。
```
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```
上面代码在p1的原型上添加了一个printName方法，由于p1的原型就是p2的原型，因此p2也可以调用这个方法。而且，此后新建的实例p3也可以调用这个方法。这意味着，使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。

# Class 表达式

与函数一样，类也可以使用表达式的形式定义。
```
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```
上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。
```
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```
上面代码表示，Me只在 Class 内部有定义。<br>
如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。

`const MyClass = class { /* ... */ };`
采用 Class 表达式，可以写出立即执行的 Class。
```
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```
上面代码中，person是一个立即执行的类的实例。
---------

# 私有方法

私有方法是常见需求，但 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。
>```
class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
```
上面代码中，_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。<br>
另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。
>```
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
```
上面代码中，foo是公有方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。<br>

还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。
>```
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```
上面代码中，bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

# this 的指向

类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
>```
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。<br>
一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
>```
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```
另一种解决方法是使用箭头函数。
>```
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```
还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。(目前水平达不到先记录一下)
>```
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```

# name属性

由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
>```
class Point {}
Point.name // "Point"
```
name属性总是返回紧跟在class关键字后面的类名。
-----------
# Class 的取值函数（getter）和存值函数（setter）

与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
>```
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```
上面代码中，prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。<br>
存值函数和取值函数是设置在属性的 Descriptor 对象上的。
>```
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
```
上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。
---------
# Class 的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
>```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```
上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。<br>
>注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。
>```
class Foo {
  static bar () {
    this.baz();
  }
  static baz () {
    console.log('hello');
  }
  baz () {
    console.log('world');
  }
}

Foo.bar() // hello
```
上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。<br>
父类的静态方法，可以被子类继承。
>```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```
上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法。<br>
静态方法也是可以从super对象上调用的。
>```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```
# Class 的静态属性和实例属性
静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
>```
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```
上面的写法为Foo类定义了一个静态属性prop。

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
>```
// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}

Foo.prop // undefined
```

# new.target 属性

new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
>```
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```
上面代码确保构造函数只能通过new命令调用。

Class 内部调用new.target，返回当前 Class。
>```
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```
需要注意的是，子类继承父类时，new.target会返回子类。
>```
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}

var obj = new Square(3); // 输出 false
```
上面代码中，new.target会返回子类。

利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
>```
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```
上面代码中，Shape类不能被实例化，只能用于继承。

注意，在函数外部，使用new.target会报错。