---
title: Object.entries() and Object.values()
date: 2017-03-05 10:10:16
tag: [ES7 ES8]
category: JavaScript
---

<center> 

# Object.entries(); # 
</center>
<!-- more -->
** 如果一个对象是具有键值对的数据结构，则每一个键值对都将会编译成一个具有两个元素的数组，这些数组最终会放到一个数组中，返回一个二维数组。 **
简言之，该方法会将某个对象的可枚举属性与值按照二维数组的方式返回。
若目标对象是数组时，则会将数组的下标作为键值返回。
例如：
```
Object.entries({ one: 1, two: 2 })    //[['one', 1], ['two', 2]]

Object.entries([1, 2])                //[['0', 1], ['1', 2]]
```

Object.entries()返回的数组的顺序与for-in循环保持一致，即如果对象的key值是数字，则返回值会对key值进行排序，返回的是排序后的结果。
例如：
```
Object.entries({ 3: 'a', 4: 'b', 1: 'c' })    //[['1', 'c'], ['3', 'a'], ['4', 'b']]
```

使用Object.entries()，我们还可以进行对象属性的遍历。例如：
```
let obj = { one: 1, two: 2 };
for (let [k,v] of Object.entries(obj)) {
  console.log(`${JSON.stringify(k)}: ${JSON.stringify(v)}`);
}

//输出结果如下：
'one': 1
'two': 2
```

# Object.values()

它的工作原理跟Object.entries()很像，顾名思义，它只返回自己的键值对中属性的值。它返回的数组顺序，也跟Object.entries()保持一致。

```
Object.values({ one: 1, two: 2 })            //[1, 2]
Object.values({ 3: 'a', 4: 'b', 1: 'c' })    //['c', 'a', 'b']
```