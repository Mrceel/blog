---
title: python-dict
date: 2018-07-18 17:52:03
tag: [Python]
category: Python
---
python数据类型之dict
<!-- more -->
1、clear:删除所有元素
```
#D.clear() -> None.  Remove all items from D
dic_a  ={1:'kong',2:'zha',3:'gen'}
dic_a.clear()
print(dic_a)
结果：{}
```

2、fromkeys():从序列键和值生成字典的key,value来构建一个新字典
```
#dict.fromkeys(seq[, value]))
seq:是为字典的键准备的
value:是字典的默认值

seq = ('Name','Age','Sex')
new_dic = dict.fromkeys(seq,10)
print(new_dic)
结果：{'Age': 10, 'Sex': 10, 'Name': 10}
```
3、get:获取字典值
```
#get(self, k, d=None)
如果字典中没有1键，则值返回默认值10，如果不返回默认值，则返回None
dic = {1:'kong',2:'zha'}
print(dic.get(1,10))
结果：'kong'
```
4、items:返回一个类集合对象
```
dic = {1:'kong',2:'zha'}
print(dic.items())
结果：dict_items([(1, 'kong'), (2, 'zha')])
```
5、keys:返回一个类集合对象
```
dic = {1:'kong',2:'zha'}
new_dic = dic.keys()
print(new_dic)
for x in new_dic:
    print(x)
结果：
dict_keys([1, 2])
1
2
```
6、pop:删除字典指定的键值，返回一个value值，必须指定键删除
```
#D.pop(k[,d]) -> v, remove specified key and return the corresponding value
dic = {1:'kong',2:'zha'}
print(dic.pop(1))
print(dic)
结果：
kong
{2: 'zha'}
```
7、popitem:随机移除字典的键值对，返回一个元组，如果字典为空则报错
```
#D.popitem() -> (k, v), remove and return some (key, value) pair as a
        2-tuple; but raise KeyError if D is empty.
dic = {1:'kong',2:'zha',3:'gen'}
print(dic.popitem())
print(dic)
结果：
(1, 'kong')
{2: 'zha', 3: 'gen'}
```
8、setdefault:如果键在字典中，返回键对应的值，如果键不在字典中，向字典中插入这个键值
```
#D.setdefault(k[,d]) -> D.get(k,d), also set D[k]=d if k not in D
dic = {1:'kong',2:'zha',3:'gen',4:'ff',5:'pp'}
pp = dic.setdefault(6,'ppp')
print(dic)
print(pp)
结果：
{1: 'kong', 2: 'zha', 3: 'gen', 4: 'ff', 5: 'pp', 6: 'ppp'}
ppp
```
9、update:用dic2更新dic1:如果dic2的键在dic1中不存在，则dic2插入到dic1,否则更用dic2的键值，更新dic1
```
dic1 = {'Name':'kong','Age':33}
dic2 = {'Name':'Hucli','Sex':'M'}
print(dic1,dic2)
dic1.update(dic2)
print(dic1)
结果：
{'Age': 33, 'Name': 'kong'} {'Name': 'Hucli', 'Sex': 'M'}
{'Age': 33, 'Name': 'Hucli', 'Sex': 'M'}
```
10、values:返回字典的所有值
```
#D.values() -> an object providing a view on D's values
dic1 = {'Name':'kong','Age':33}
print(dic1.values())
结果：dict_values([33, 'kong'])
```
总结：

方法|描述  
:----|:---
D.clear()                         |移除D中的所有项  
D.copy()                          |返回D的副本  
D.fromkeys(seq[,val])             |返回从seq中获得的键和被设置为val的值的字典。可做类方法调用  
D.get(key[,default])              |如果D[key]存在，将其返回；否则返回给定的默认值None  
D.has_key(key)                    |检查D是否有给定键key  
D.items()                         |返回表示D项的(键，值)对列表  
D.iteritems()                     |从D.items()返回的(键，值)对中返回一个可迭代的对象  
D.iterkeys()                      |从D的键中返回一个可迭代对象  
D.itervalues()                    |从D的值中返回一个可迭代对象  
D.keys()                          |返回D键的列表  
D.pop(key[,d])                    |移除并且返回对应给定键key或给定的默认值D的值  
D.popitem()                       |从D中移除任意一项，并将其作为(键，值)对返回  
D.setdefault(key[,default])       |如果D[key]存在则将其返回；否则返回默认值None  
D.update(other)                   |将other中的每一项加入到D中。  
D.values()                        |返回D中值的列表