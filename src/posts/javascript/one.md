---
title: 数组去重
date: 2017-02-13 21:58:49
tag: [ Array]
category: JavaScript
---
**Array**
<!-- more -->
**1.**思想:遍历元素组,建立新数组。利用indexOf判断新数组中是否存在原数组中的第i项,不存在便添加进去。
ps:这里可以封装函数

```javascript
var arr = [12, 5, 8, 12, 6, 4, 8, 5, 3],
    arr2 = [];
    for (let i = 0, j = arr.length; i &lt; j; i++) {
        if (arr2.indexOf(arr[i]) === -1) {
            arr2.push(arr[i])
        }
    }
    console.log(arr2) // [12,5,8,6,4,3]
```

**2.**思想:利用indexOf判断数组中第i项的索引值是否等于其索引.(细细想想indexOf的用法及返回值)
```javascript
var arr = [12, 5, 8, 12, 6, 4, 8, 5, 3];
Array.prototype.removal=function(){
    let arr = [];
    for(let i=0,j=this.length;i&lt;j;i++){
        if(this.indexOf(this[i]) == i){
            arr.push(this[i])
        }
    }
    return arr
}
var arr2 = arr.removal()
console.log(arr2) // [12,5,8,6,4,3]
```
<p></p>
**3.**思想:利用对象的属性不能相同的特点进行去重
```javascript
var arr = [12, 5, 8, 12, 6, 4, 8, 5, 3];
    Array.prototype.removal=function(){
        let obj = {},
            result = [];
        for(let i=0,j=this.length;i&lt;j;i++){
            if(!obj[this[i]]){
                obj[this[i]] = 1;
                result.push(this[i])
            }
        }
        return result
    }
    console.log(arr.removal()) // [12,5,8,6,4,3]
```


**4.**思想:数组递归去重
```javascript
var arr = [12, 5, 8, 12, 6, 4, 8, 5, 3];
Array.prototype.removal = function (){
    var arr1 = this,
        len = arr1.length;
    arr1.sort(function(a,b){  //对数组进行排序才能方便比较
        return a - b;
    })
    function loop(index){
        if(index >= 1){
            if(arr1[index] === arr1[index-1]){
                arr1.splice(index,1);
            }
            loop(index - 1); //递归loop函数进行去重
        }
    }
    loop(len-1);
    return arr1;
};
console.log(arr.removal()) // [12,5,8,6,4,3]
```
<p></p>
**5.**思想:利用indexOf以及forEach
```javascript
var arr = [12, 5, 8, 12, 6, 4, 8, 5, 3];
Array.prototype.removal = function (){
    var arr = this,
        result = [],
        len = arr.length;
    arr.forEach(function(v, i ,arr){  //这里利用map，filter方法也可以实现
        var bool = arr.indexOf(v,i+1);  //从传入参数的下一个索引值开始寻找是否存在重复
        if(bool === -1){
            result.push(v);
        }
    })
    return result;
};
console.log(arr.removal()) // [12,5,8,6,4,3]
```


**6.**思想:利用ES6的set
Set数据结构，它类似于数组，其成员的值都是唯一的。
利用Array.from将Set结构转换成数组
```javascript
function dedupe(array){
 return Array.from(new Set(array));
}
dedupe([1,1,2,3]) //[1,2,3]
```


Array.from() 使用方法
```javascript
 Array.from(arrayLike, mapFn, thisArg)
 ```
**参数**
 ***arrayLike***
想要转换成数组的伪数组对象或可迭代对象。
 ***mapFn*** (可选参数)
如果指定了该参数，新数组中的每个元素会执行该回调函数。
 ***thisArg*** (可选参数)
可选参数，执行回调函数 mapFn 时 this 对象。
***返回值***
一个新的数组实例