---
title: Js 基础算法
date: 2017-05-27 17:35:10
tag: [算法]
category: JavaScript
---
** 1. ** 返回字符串中字符出现次数最多的那字符
<!-- more -->
```javascript
var str = 'tecasdasdsfgjoertioerldgibidflksdsssssllllldnwekroiwrdslfashnology';

		String.prototype.maxnum = function () {
			if(this.length <= 1) {
				return this
			};
			let arr = this.split('');
			let josn = {};
			for(let i = 0, L = this.length; i < L; i++){
				if(!josn[arr[i]]){
					josn[arr[i]] = 1
				} else {
					josn[arr[i]] += 1
				}
			}
			let num = 0;
			let wrop = '';
			for (let item in josn) {
				if(josn[item] > num) {
					num = josn[item];
					wrop = item;
				}
			}
			return wrop;
		}

		console.log(str.maxnum())

```

** 2. ** 不借助第三变量, 交换值.

```
function swop (a, b) {
    a = a - b;
    b = a + b;
    a = b - a;
    return [a, b]
}

console.log(45, 68)

```