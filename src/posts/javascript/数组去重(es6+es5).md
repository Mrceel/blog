---
title: 数组去重(2)
date: 2017-05-22 10:48:28
tag: ["Array"]
category: JavaScript

---
** 1. ** 利用一个json对象
原理: 循环数组里面的每一项设置为json的`key`, `value`为 1.
<!-- more -->
```javascript
Array.prototype.removal_one = function () {

            let jsn = {},
                arr1 = [],
                len = this.length;
            for (let i = 0; i < len; i++) {
                const item = this[i]
                if (!jsn[item]) {
                    jsn[item] = 1;
                    arr1.push(item);
                }
            }
            return arr1;
        }
```

** 2. ** 利用 indexOf() 
原理: 在新数组里查找旧数组的每一项,没有就添加进来. 
```javascript
        Array.prototype.removal_two = function () {
            let arr1 = [];
            let len = this.length;
            for (let i = 0; i < len; i++) {
                if (arr1.indexOf(this[i]) == -1) {
                    arr1.push(this[i]);
                }
            }
            return arr1;
        }
```


** 3. ** 利用 indexOf()
原理: 同 2.
```javascript
        Array.prototype.removal_three = function () {
            let arr1 = [];
            this.map((x) => {
                if (arr1.indexOf(x) == -1) {
                    arr1.push(x)
                }
            })
            return arr1;
        }
```





** 4. ** 还是利用 indexOf() (原理有差别)
原理: 查找数组里面的每一项,看其下标是否对应.
```javascript
        Array.prototype.removal_four = function () {
            let arr1 = [];
            this.reduce((prev, now, index, arr) => {
                if( arr.indexOf(now) == index ) {
                    arr1.push( now )
                }
            },this[0])
            return arr1;
        }
        //reduce() ES6新增方法. 二个参数: 
            //第一个参数接收一个函数 其接收四个参数: 
            //                 第一个参数(prev) => 前一个值
            //                 第二个参数(now) => 当前值
            //                 第三个参数(index) => 当前值的索引
            //                 第四个参数(arr) => 当前值的数组
            //第二个参数接收一个默认值,对应prev(起始值)

    // 不接收第二个参数
        var arr = [1,2,3,4,5,6];
        arr.reduce((prev, now, index, arr)=>{
            console.log(prev,now)
            })

        //1 2
        //undefined 3
        //undefined 4
        //undefined 5
        //undefined 6
        
    // 接收第二个参数
        var arr1 = [1,2,3,4,5,6];
        arr.reduce((prev, now, index, arr)=>{
            console.log(prev,now)
            },0)
        
        //0 1
        //undefined 3
        //undefined 4
        //undefined 5
        //undefined 6

    
```

** 5. ** ES6 set()

```
let arr1 = [1,2,3,1,2,6,4,8,4,5,6];
let arr = new set(arr1)
```