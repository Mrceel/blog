---
title: python-__name__
date: 2018-08-20 17:52:03
tag: [Python]
category: Python
---
__name__ 是内置变量，用于表示当前模块的名字,如果一个模块被直接运行,其 __name__ 值为 __main__。
<!-- more -->
来个小栗子：

** module.py 文件 **
```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

' a test module '

__author__ = 'mrceel'

def say(name):
	print('hello %s' %(name))

print('当前文件的__name__是：', __name__)

if __name__ == '__main__':
	say('world')

```
直接运行->输出位为 
```python
当前文件的__name__是： __main__
hello world
[Finished in 0.1s]
```

再来看下作为模块使用的时候
** test-module.py 文件 **
```python
import module

module.say('二丽') # 调用module 模块的say 函数

print('当前文件的__name__是：', __name__)
```
直接运行->输出位为 
```python
当前文件的__name__是： module # 这里是module.py 文件的输出
hello 二丽 # 调用 module 模块的say 函数的输出
当前文件的__name__是： __main__ # 当前文件输出
[Finished in 0.3s]
```
Python解释器把一个特殊变量`__name__`置为`__main__`，而如果在其他地方导入该module模块时，if判断将失败，因此，这种if测试可以让一个模块通过命令行运行时执行一些额外的代码，最常见的就是运行测试