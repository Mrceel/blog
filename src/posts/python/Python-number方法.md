---
title: Python-number方法
date: 2018-06-25 16:13:23
tag: [Python]
category: Python
---
为了能方便记忆，想看就看。这里记录一下Python3.x的number方法。
<!-- more -->
<style>
table th:first-of-type {
    width: 10%;
}
table th:nth-of-type(2) {
    width: 25%;
}
</style>

Python 数字类型转换
有时候，我们需要对数据内置的类型进行转换，数据类型的转换，你只需要将数据类型作为函数名即可。

+ int(x) 将x转换为一个整数。
+ float(x) 将x转换到一个浮点数。
+ complex(x) 将x转换到一个复数，实数部分为 x，虚数部分为 0。
+ complex(x, y) 将 x 和 y 转换到一个复数，实数部分为 x，虚数部分为 y。x 和 y 是数字表达式。

### 数学函数

序号 | 方法 | 描述
:------|:------
1 | abs(x) | 返回 `x` 的绝对值。
2 | math.ceil(8.1) | 向上取整。
3 | math.exp() | 返回x的指数,e^x。
4 | math.fabs() | 方法返回数字的绝对值，如math.fabs(-10) 返回10.0。<br>fabs() 函数类似于 abs() 函数，但是他有两点区别:<br>1. abs() 是内置函数。 fabs() 函数在 math 模块中定义。<br>2.fabs() 函数只对浮点型跟整型数值有效。 abs() 还可以运用在复数中。
5 | math.floor(x) | 返回数字的下舍整数，小于或等于 x
6 | math.log(x) | 方法返回x的自然对数，x > 0
7 | math.log10() | 方法返回以10为基数的x对数，x>0。
8 | max(5, 10) | 方法返回给定参数的最大值，参数可以为序列。
9 | min([14,64,21]) | 方法返回给定参数的最大值，参数可以为序列。
10 | math.modf(x) | 方法返回x的整数部分与小数部分，两部分的数值符号与x相同，整数部分以浮点型表示<br>例如：`math.modf(100.12) => (0.12000000000000455, 100.0)`
11 | math.pow(x, y[, z]) | 函数是计算x的y次方，如果z在存在，则再对结果进行取模，其结果等效于pow(x,y) %z返回值是浮点型。
12 | round( x [, n]  ) | x -- 数字表达式。n -- 表示从小数点位数，其中 x 需要四舍五入，默认值为 0。方法返回浮点数x的四舍五入值。
13 | math.sqrt(x) | 方法返回数字x的平方根。

### 随机数函数
随机数可以用于数学，游戏，安全等领域中，还经常被嵌入到算法中，用以提高算法效率，并提高程序的安全性。

序号 | 方法 | 描述
:------|:------
1 | random.choice( seq  ) | seq -- 可以是一个列表，元组或字符串。返回一个列表，元组或字符串中的随机项。
2 | random.randrange ([start,] stop [,step]) | start -- 指定范围内的开始值，包含在范围内。<br>stop -- 指定范围内的结束值，不包含在范围内。<br>step -- 指定递增基数。<br>返回指定递增基数集合中的一个随机数，基数缺省值为1。
3 | random.random() | 返回随机生成的一个实数，它在[0,1)范围内。
4 | random.seed ( [x] ) | 改变随机数生成器的种子，可以在调用其他随机模块函数之前调用此函数。
5 | random.shuffle (lst ) | 将序列的所有元素随机排序。
6 | random.uniform(x, y) | 将随机生成下一个实数，它在[x,y]范围内。
实例
以下展示了使用 seed() 方法的实例：
```
import random

random.seed()
print ("使用默认种子生成随机数：", random.random())

random.seed(10)
print ("使用整数种子生成随机数：", random.random())

random.seed("hello",2)
print ("使用字符串种子生成随机数：", random.random())
以上实例运行后输出结果为：

使用默认种子生成随机数： 0.9186252047469824
使用整数种子生成随机数： 0.5714025946899135
使用字符串种子生成随机数： 0.3537754404730722
```


### 三角函数

序号 | 方法 | 描述
:------|:------
1 | math.acos(x) | 返回x的反余弦弧度值。
2 | math.asin(x) | 返回x的反正弦弧度值。
3 | math.atan(x) | 返回x的反正切弧度值。
4 | math.atan2(y, x) | 返回给定的 X 及 Y 坐标值的反正切值。
5 | math.cos(x) | 返回x的弧度的余弦值。
6 | math.hypot(x, y) | 返回欧几里德范数 sqrt(x*x + y*y)。
7 | math.sin(x) | 返回的x弧度的正弦值。
8 | math.tan(x) | 返回x弧度的正切值。
9 | math.degrees(x) | 将弧度转换为角度,如degrees(math.pi/2)， 返回90.0
10 | math.radians(x) | 将角度转换为弧