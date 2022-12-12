---
title: css3 media的使用及其兼容
date: 2018-10-04 22:26:45
tag: [Css]
category: Css
---
利用css判断不同分辨率显示不同宽度布局实现自适应宽度即 css3 @media样式的使用
<!-- more -->
CSS 语法
```css
@media mediatype and|not|only (media feature) {
    CSS-Code;
}

mediatype 取值：
    all -> 用于所有设备
    print -> 用于打印机和打印预览
    screen -> 用于电脑屏幕，平板电脑，智能手机等。
    speech -> 应用于屏幕阅读器等发声设备
    菜鸟教程显示其他的都已经弃用，便不再罗列。
```
## media type的几种使用方法
__方法一__
`<link href="style.css" media="screen print" ...`
__方法二__
`<?xml-stylesheet media="screen" href="style.css"...`
__方法三__
`@import url("style.css") screen;`
__方法四__
```html
<style media="screen">
@import url("style.css");
</style>
```
__方法五__
```
@media screen{
selector{rules}
}
```
当然，这几种方法各有利弊，而我们常用的是第一种和最后一种方法。
## media query

css属性判断可以只是某个CSS属性的名称，也可以是属性+值：
```
<link rel="stylesheet" media="screen and (animation)” herf=“…”
```
如果设备支持CSS动画，那么就能执行这个外部样式表文件。

## 媒体查询语句结构

我们可以将上述语句称为媒体查询语句，这样也更能理解一些。从上面的例子也可以看出，媒体查询语句一般由media type+一到多个CSS属性判断组成，而多个CSS属性判断可以用关键字and连接：
```
@media screen and (min-width:1024px) and (max-width:1280px){
	body{font-size:20px;}
}
@media screen and (min-width:800px),print and (min-width:7in){
body{font-size:small;}
}
```
可理解为 在宽度为1024 - 1280之间 使用 body{font-size:20px;}
------------------

```html index.html
<!DOCTYPE html> 
    <html> 
    <head> 
        <meta charset="utf-8" /> 
        <title>无标题文档</title> 
        <style> 
            .abc{ height:300px; border:1px solid #000; margin:0 auto} 
            @media screen and (min-width: 1201px) { 
                .abc {width: 1200px}  
            } 
            /* css 注释说明：设置了浏览器宽度不小于1201px时 abc 显示1200px宽度 */ 
            
            @media screen and (max-width: 1200px) { 
                .abc {width: 900px}  
            } 
            /* 设置了浏览器宽度不大于1200px时 abc 显示900px宽度 */ 
            
            @media screen and (max-width: 900px) { 
                .abc {width: 200px;}  
            } 
            /* 设置了浏览器宽度不大于900px时 abc 显示200px宽度 */ 
            
            @media screen and (max-width: 500px) { 
                .abc {width: 100px;}  
            } 
            /* 设置了浏览器宽度不大于500px时 abc 显示100px宽度 */ 
            
        </style> 
        <!--[if lt IE 9]> 
        <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script> 
        <![endif]--> 
    </head> 
    <body> 
        <div class="abc">DIVCSS5实例：我这个DIV宽度会随浏览器宽度变化哦，试试改变浏览器宽度</div> 
    </body> 
</html> 
```
[实例地址](http://www.divcss5.com/yanshi/2014/2014031601/)

IE9以下版本不支持CSS3技术，可以使用加入一个google的JS
```
<!--[if lt IE 9]> 
<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script> 
<![endif]--> 
```
以上内容转载自：`http://www.divcss5.com/jiqiao/j662.shtml`
`http://www.cnblogs.com/august-8/p/4537685.html`