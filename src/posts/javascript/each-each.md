---
title: $().each() 与 $.each() 区别
date: 2017-03-22 11:39:32
tag: [JQuery]
category: JQuery
---

<center> 

# $().each() # 
</center>
<!-- more -->
```javascript
$('input[type = "text"]').each((idx,ite)=>{
	console.log(idx,ite)
})
//第一个参数是索引,第二个参数是当前dom元素
```

# $.each()

遍历数组
```javascript
	var json = [{ name: "John", lang: "JS" },{ name: "boy", lang: "html" },{ name: "job", lang: "css" }];

	$.each(json,(idx,ite)=>{
		console.log(idx,ite)
		console.log('name:'+ite['name'] + '; lang:' + ite['lang'])
	})
	//输出
	//0 {name: "John", lang: "JS"}
	//name:John; lang:JS
	//1 {name: "boy", lang: "html"}
	//name:boy; lang:html
	//2 {name: "job", lang: "css"}
	//name:job; lang:css
```

遍历对象
```javascript
var json = { name: "John", lang: "JS" };
	$.each(json,(idx,ite)=>{
		console.log('key:' + idx ,'value:' + ite)

	})
	//输出
	// key:name value:John
	// key:lang value:JS
	
```