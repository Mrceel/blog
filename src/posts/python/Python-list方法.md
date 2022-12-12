---
title: Python-list方法
date: 2018-07-12 16:13:23
tag: [Python]
category: Python
---
为了能方便记忆，想看就看。这里记录一下Python3.x的list方法。
<!-- more -->
<style>
table th:first-of-type {
    width: 10%;
}
table th:nth-of-type(2) {
    width: 25%;
}
table:nth-of-type(3) th:first-of-type {
    width: 30%;
}
table:nth-of-type(3) th:nth-of-type(2) {
    width: 25%;
}
table:nth-of-type(4) th:first-of-type {
    width: 30%;
}
table:nth-of-type(4) th:nth-of-type(2) {
    width: 25%;
}
</style>

list(seq) : 将元组转换为列表
tuple(seq) : 将列表转换为元组。

## Python列表函数&方法
 序号 | 函数 | 描述 
:-------: | :------ | :----
1 | len(list) | 列表元素个数
2 | max(list) | 返回列表元素最大值
3 | min(list) | 返回列表元素最小值
4 | list(seq) | 将元组转换为列表

 序号 | 方法 | 描述 
:-------: | :------ | :----
1 | list.append(obj) | 在列表末尾添加新的对象
2 | list.count(obj) | 统计某个元素在列表中出现的次数
3 | list.extend(seq) | 在列表末尾一次性追加另一个序列中的多个值（用新列表扩展原来的列表）
4 | list.index(obj) | 从列表中找出某个值第一个匹配项的索引位置
5 | list.insert(index, obj) | 将对象插入列表
6 | list.pop([index=-1]]) | 移除列表中的一个元素（默认最后一个元素），并且返回该元素的值
7 | list.remove(obj) | 移除列表中某个值的第一个匹配项
8 | list.reverse() | 反向列表中元素
9 | list.sort(cmp=None, key=None, reverse=False) | 对原列表进行排序
10 | list.clear() | 清空列表
11 | list.copy() | 复制列表


## 列表截取

 序号 | 结果 | 描述 
:------- | :------ | :----
L[2] | 'Taobao' | 读取第三个元素
L[-2] | 'Runoob' | 从右侧开始读取倒数第二个元素: count from the right
L[1:] | ['Runoob', 'Taobao'] | 输出从第二个元素开始后的所有元素

## 列表脚本操作符
 序号 | 结果 | 描述 
:------- | :------ | :----
len([1, 2, 3]) | 3 | 长度
[1, 2, 3] + [4, 5, 6] | [1, 2, 3, 4, 5, 6] | 组合
['Hi!'] * 4 | ['Hi!', 'Hi!', 'Hi!', 'Hi!'] | 重复
3 in [1, 2, 3] | True | 元素是否存在于列表中
for x in [1, 2, 3]: print(x, end=" ") | 1 2 3 | 迭代
