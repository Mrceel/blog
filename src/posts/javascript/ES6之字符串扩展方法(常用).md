---
title: ES6之字符串扩展方法(常用)
date: 2017-01-30 19:23:23
tag: [ String]
category: JavaScript
---
<center> 

# includes # 
</center>
<!-- more -->
includes是判断是否包含的,直接返回布尔值
```
let str='google';
if(str.includes('o')){
   console.log('yes');
}else{
   console.log('no');
}
```

# startsWith ，endsWith #
startsWith用于判断是否位于头部，endsWith判断是否位于尾部，可以说这两个方法是includes方法的扩展；
```
let str='google';

console.log(str.startsWith('g'));  //true

console.log(str.endsWith('e'));    //true
```

# repeat #
顾名思义，这个方法就是可以获取字符串重复N次后的方法；
```
let str='google';
console.log(str.repeat(3)); //googlegooglegoogle
```

repeat方法接受一个数字类型的参数，可以是正式也可以是小数，如果是浮点型会自动调用Math.floor方法转为整型；
```
let str='google';
console.log(str.repeat(3.5)); //googlegooglegoogle
console.log(str.repeat(Math.floor(3.5)));//googlegooglegoogle
```

参数可以为0这样就会返回一个空字符串，但是不能为负数，否则会报错；
```
let str='google';
console.log(str.repeat(0)); //''
console.log(str.repeat(-3.5));//RangeError: Invalid count value
```

# padStart,padEnd #

这两个方法其实是ES7标准下扩展的方法，作用就是自动补全；
```
let str='goo';<br>　　　 str.padStart(5, 'le') // 'legoo'
str.padStart(4, 'le') // 'lgoo'

str.padEnd(5, 'le') // 'goole'
str.padEnd(4, 'le') // 'gool'
```
这两个方法类似都是接受两个参数，第一个是补全的长度，第二个是要补充的内容，由于是es7标准的方法，现在浏览器还不能直接运行，可以尝试借助babel运行；