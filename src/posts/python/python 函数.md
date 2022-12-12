---
title: Python 函数
date: 2018-05-15 17:35:10
tag: [Python]
category: Python
---
#### 在Python中，定义一个函数要使用def语句，依次写出函数名、括号、括号中的参数和冒号:，然后，在缩进块中编写函数体，函数的返回值用return语句返回。

pass 语句什么都不做, 用来占位、定义空函数、满足某条件的时候暂时不做处理.
```
if 18 > 9 :
    pass  //这里没有pass 将会报错
```

给函数添加一个检查参数的判断
``` 
def my_abs(x):
    if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
    if x >= 0:
        return x
    else:
        return -x
```
添加了参数检查后，如果传入错误的参数类型，函数就可以抛出一个错误.

一个求一元二次方程的函数:
```
def quadratic(a,b,c):
    if a == 0 :
        raise TypeError('二次项系数不能为 0')
    if not isinstance(a,(int,float)):
        raise TypeError('参数错误')
    if not isinstance(b,(int,float)):
        raise TypeError('参数错误')
    if not isinstance(c,(int,float)):
        raise TypeError('参数错误')
    num = b*b - 4*a*c
    if num < 0 :
        return '无解'
    elif num == 0 :
        x = -b / 2*a
        return x
    else :
        x1 = (-b - math.sqrt(num))/(2*a)
        x2 = (-b + math.sqrt(num))/(2*a)
        return x2,x1
```

#### 默认参数

函数可以有默认参数:
```
def mrceel(name, age=18):
    print('name=',name)
    print('age=',age)

print(mrceel('cyq'))

```

>> 定义默认参数要牢记一点：默认参数必须指向不变对象！


先定义一个函数，传入一个list，添加一个END再返回：
```
def add_end(L=[]):
    L.append('END')
    return L
```
当你正常调用时，结果似乎不错：
```
>>> add_end([1, 2, 3])
[1, 2, 3, 'END']
>>> add_end(['x', 'y', 'z'])
['x', 'y', 'z', 'END']
```
当你使用默认参数调用时，一开始结果也是对的：
```
>>> add_end()
['END']
```
但是，再次调用add_end()时，结果就不对了：
```
>>> add_end()
['END', 'END']
>>> add_end()
['END', 'END', 'END']
```
原因解释如下：

** Python函数在定义的时候，默认参数L的值就被计算出来了，即[]，因为默认参数L也是一个变量，它指向对象[]，每次调用该函数，如果改变了L的内容，则下次调用时，默认参数的内容就变了，不再是函数定义时的[]了。 ** 

#### 可变参数

```
def calc(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum
```
定义可变参数和定义一个list或tuple参数相比，仅仅在参数前面加了一个*号。在函数内部，参数numbers接收到的是一个tuple，因此，函数代码完全不变。但是，调用该函数时，可以传入任意个参数，包括0个参数：
```
>>> calc(1, 2)
5
>>> calc()
0
```
如果已经有一个list或者tuple，要调用一个可变参数,在list或tuple前面加一个*号，把list或tuple的元素变成可变参数传进去：
```
>>> nums = [1, 2, 3]
>>> calc(*nums)
14
```
*nums表示把nums这个list的所有元素作为可变参数传进去。

#### 关键字参数

可变参数允许你传入0个或任意个参数，这些可变参数在函数调用时自动组装为一个tuple。而关键字参数允许你传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict。请看示例：
```
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)
```
函数person除了必选参数name和age外，还接受关键字参数kw。在调用该函数时，可以只传入必选参数：
```
>>> person('Michael', 30)
name: Michael age: 30 other: {}
```
也可以传入任意个数的关键字参数：
```
>>> person('Bob', 35, city='Beijing')
name: Bob age: 35 other: {'city': 'Beijing'}
>>> person('Adam', 45, gender='M', job='Engineer')
name: Adam age: 45 other: {'gender': 'M', 'job': 'Engineer'}
```

** 关键字参数的作用:
> 它可以扩展函数的功能。比如，在person函数里，我们保证能接收到name和age这两个参数，但是，如果调用者愿意提供更多的参数，我们也能收到。试想你正在做一个用户注册的功能，除了用户名和年龄是必填项外，其他都是可选项，利用关键字参数来定义这个函数就能满足注册的需求。 

#### 命名关键字参数

对于关键字参数，函数的调用者可以传入任意不受限制的关键字参数。至于到底传入了哪些，就需要在函数内部通过kw检查。

仍以person()函数为例，我们希望检查是否有city和job参数：
```
def person(name, age, **kw):
    if 'city' in kw:
        # 有city参数
        pass
    if 'job' in kw:
        # 有job参数
        pass
    print('name:', name, 'age:', age, 'other:', kw)
```

如果要限制关键字参数的名字，就可以用命名关键字参数，例如，只接收city和job作为关键字参数。这种方式定义的函数如下：
```
def person(name, age, *, city, job):
    print(name, age, city, job)
```

和关键字参数**kw不同，命名关键字参数需要一个特殊分隔符*

*后面的参数被视为命名关键字参数。
调用方式如下：
```
>>> person('Jack', 24, city='Beijing', job='Engineer')
Jack 24 Beijing Engineer
```

如果函数定义中已经有了一个可变参数，后面跟着的命名关键字参数就不再需要一个特殊分隔符*了：
```
def person(name, age, *args, city, job):
    print(name, age, args, city, job)
```
命名关键字参数必须传入参数名，这和位置参数不同。如果没有传入参数名，调用将报错:
```
>>> person('Jack', 24, 'Beijing', 'Engineer')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: person() takes 2 positional arguments but 4 were given
```
由于调用时缺少参数名city和job，Python解释器把这4个参数均视为位置参数，但person()函数仅接受2个位置参数。

命名关键字参数可以有缺省值，从而简化调用：
```
def person(name, age, *, city='Beijing', job):
    print(name, age, city, job)
```
由于命名关键字参数city具有默认值，调用时，可不传入city参数

** 使用命名关键字参数时，要特别注意，如果没有可变参数，就必须加一个\*作为特殊分隔符。如果缺少\*，Python解释器将无法识别位置参数和命名关键字参数：
```
def person(name, age, city, job):
    # 缺少 *，city和job被视为位置参数
    pass
```

#### 参数组合

在Python中定义函数，可以用必选参数、默认参数、可变参数、关键字参数和命名关键字参数，这5种参数都可以组合使用。但是请注意，参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。

比如定义一个函数，包含上述若干种参数：
```
def f1(a, b, c=0, *args, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kw)

def f2(a, b, c=0, *, d, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'd =', d, 'kw =', kw)
```
在函数调用的时候，Python解释器自动按照参数位置和参数名把对应的参数传进去。
```
>>> f1(1, 2)
a = 1 b = 2 c = 0 args = () kw = {}
>>> f1(1, 2, c=3)
a = 1 b = 2 c = 3 args = () kw = {}
>>> f1(1, 2, 3, 'a', 'b')
a = 1 b = 2 c = 3 args = ('a', 'b') kw = {}
>>> f1(1, 2, 3, 'a', 'b', x=99)
a = 1 b = 2 c = 3 args = ('a', 'b') kw = {'x': 99}
>>> f2(1, 2, d=99, ext=None)
a = 1 b = 2 c = 0 d = 99 kw = {'ext': None}
```
最神奇的是通过一个tuple和dict，你也可以调用上述函数：
```
>>> args = (1, 2, 3, 4)
>>> kw = {'d': 99, 'x': '#'}
>>> f1(*args, **kw)
a = 1 b = 2 c = 3 args = (4,) kw = {'d': 99, 'x': '#'}
>>> args = (1, 2, 3)
>>> kw = {'d': 88, 'x': '#'}
>>> f2(*args, **kw)
a = 1 b = 2 c = 3 d = 88 kw = {'x': '#'}
```
所以，对于任意函数，都可以通过类似func(\*args, \*\*kw)的形式调用它，无论它的参数是如何定义的。

>虽然可以组合多达5种参数，但不要同时使用太多的组合，否则函数接口的可理解性很差。

#### 递归函数

在函数内部，可以调用其他函数。如果一个函数在内部调用自身本身，这个函数就是递归函数。

** 至于递归,简单来说就是方法内部自己调用自己, 同时也一定有一个结束点. 如果对方法调用栈了解的话,其实是很容易理解方法的调用过程的, 就是从主线程开始调用方法进行不停的压栈和出栈操作. 方法的调入就是将方法压入栈中, 方法的结束就是方法出栈的过程, 这样保证了方法调用的顺序流. 如果跟踪递归的调用情况会发现也是如此, 到最后一定是这个方法最后从栈中弹出回到主线程, 并且结束. **
小结
Python的函数具有非常灵活的参数形态，既可以实现简单的调用，又可以传入非常复杂的参数。

默认参数一定要用不可变对象，如果是可变对象，程序运行时会有逻辑错误！

要注意定义可变参数和关键字参数的语法：

*args是可变参数，args接收的是一个tuple；

**kw是关键字参数，kw接收的是一个dict。

以及调用函数时如何传入可变参数和关键字参数的语法：

可变参数既可以直接传入：func(1, 2, 3)，又可以先组装list或tuple，再通过*args传入：func(*(1, 2, 3))；

关键字参数既可以直接传入：func(a=1, b=2)，又可以先组装dict，再通过**kw传入：func(**{'a': 1, 'b': 2})。

使用*args和**kw是Python的习惯写法，当然也可以用其他参数名，但最好使用习惯用法。

命名的关键字参数是为了限制调用者可以传入的参数名，同时可以提供默认值。

定义命名的关键字参数在没有可变参数的情况下不要忘了写分隔符*，否则定义的将是位置参数。

以上内容总结自--->[廖雪峰的官方网站](https://www.liaoxuefeng.com)