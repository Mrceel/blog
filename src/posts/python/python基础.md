---
title: Python 基础
date: 2018-05-11 17:35:10
tag: [Python]
category: Python
---
input() 用于输入 
print() 用于输出
<!-- more -->
## 数据类型: 

>1、整数 、浮点数 
	' / ' 表示除 得出的结果一定是个浮点型.
	' // ' 表示除 得出的结果一定是整数.(如果是小数会自动取整)
	' % ' 表示除 取余数(自动取得小数点后面的数)

>2、字符串('' / "") 
	可以使用 ' \ ' 转义,  `r''`表示`''`内部的字符串默认不转义
	`''' line1 '''`  表示多行内容
	`Python提供了ord()函数获取字符的整数表示，chr()函数把编码转换为对应的字符`

	`len()` 获取字符串的长度
	replace() 替换
	Python对bytes类型的数据用带b前缀的单引号或双引号表示.
	`x = b'ABC'`
	要注意区分'ABC'和b'ABC'，前者是str，后者虽然内容显示得和前者一样，但bytes的每个字符都只占用一个字节。
	以Unicode表示的str通过encode()方法可以编码为指定的bytes，例如：
	```python
	>>> 'ABC'.encode('ascii')
	b'ABC'
	>>> '中文'.encode('utf-8')
	b'\xe4\xb8\xad\xe6\x96\x87'
	>>> '中文'.encode('ascii')
	Traceback (most recent call last):
	  File "<stdin>", line 1, in <module>
	UnicodeEncodeError: 'ascii' codec can't encode characters in position 0-1: ordinal not in range(128)
	```
	如果bytes中包含无法解码的字节，decode()方法会报错
	如果bytes中只有一小部分无效的字节，可以传入errors='ignore'忽略错误的字节
	`>>> b'\xe4\xb8\xad\xff'.decode('utf-8', errors='ignore')
	'中'`

	>在字符串内部，%s表示用字符串替换，%d表示用整数替换，有几个%?占位符，后面就跟几个变量或者值，顺序要对应好。如果只有一个%?，括号可以省略。

	占位符 | 替换内容
	------|------
	%d	|	整数
	%f	|	浮点数
	%s	|	字符串
	%x	|	十六进制整数

	另一种格式化字符串的方法是使用字符串的format()方法，它会用传入的参数依次替换字符串内的占位符{0}、{1}……
	`hi, {0}, {1}`.format('cyq',123)
	// hi, cyq, 123

>3、布尔值(True / False) 
	`and、or、not` 运算
	and 运算是与运算，只有所有都为True，and运算结果才是True
	or运算是或运算，只要其中有一个为True，or运算结果就是True
	not运算是非运算，它是一个单目运算符，把True变成False，False变成True

>4、空值(None)
	None不能理解为0，因为0是有意义的，而None是一个特殊的空值


## list and tuple

** list **

索引从0开始,直到len(arr) - 1 , 
arr[-1] 将获取最后一项, -2 -3 -4 依次倒数获取

向list末尾添加元素 --> append(item)
把元素添加到指定的位置 --> insert(i,'item')
删除末尾项 --> pop() ==> 返回删除项
删除指定位置的元素 --> pop(i) ==> 返回删除项

** 另一种有序列表叫元组：tuple。tuple和list非常类似，但是tuple一旦初始化就不能修改 **

t = (1,2,3,)  没有append()  insert() pop() 等方法,其它都一样.
t = (1,2,3,[2,2,3,3]) tuple 是不可以变的 但是他里面的 list 可变

## 条件判断 

** if ... else 
elif是else if的缩写.
```
if <条件判断1>:
    <执行1>
elif <条件判断2>:
    <执行2>
elif <条件判断3>:
    <执行3>
else:
    <执行4>
```

input()返回的数据类型是str，str不能直接和整数比较，必须先把str转换成整数。Python提供了int()函数来完成这件事情.


## 循环

range()函数，可以生成一个整数序列.
例如: range(5)  生成0到小于5的整数. // 0,1,2,3,4
list()函数可以转换为list.
list(range(5)) // [0,1,2,3,4]

1. for ...  in  ... 
2. while 

> continue  break


## dict 

```
>>> d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
>>> d['Michael']
95

>>> Jun in d  
False

>>> d.get('Jun')
// dict提供的get()方法，如果key不存在，可以返回None
// 返回None的时候Python的交互环境不显示结果。


```
要删除一个key，用pop(key)方法，对应的value也会从dict中删除：
```
d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
d.pop('Bob')
75
>>> d
 {'Michael': 95, 'Tracy': 85}
```
> 和list比较，dict有以下几个特点：

查找和插入的速度极快，不会随着key的增加而变慢；
需要占用大量的内存，内存浪费多。

而list相反：

> 查找和插入的时间随着元素的增加而增加；
占用空间小，浪费内存很少。
所以，dict是用空间来换取时间的一种方法。

## set

set和dict类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在set中，没有重复的key。
重复元素在set中自动被过滤：
```
>>> s = set([1, 1, 2, 2, 3, 3])
>>> s
{1, 2, 3}
```
通过add(key)方法可以添加元素到set中，可以重复添加，但不会有效果
通过remove(key)方法可以删除元素
set可以看成数学意义上的无序和无重复元素的集合，因此，两个set可以做数学意义上的交集、并集等操作:
交集 &  并集 |
```
>>> s1 = set([1, 2, 3])
>>> s2 = set([2, 3, 4])
>>> s1 & s2
{2, 3}
>>> s1 | s2
{1, 2, 3, 4}
```



