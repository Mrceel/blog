---
title: 无具体宽高元素水平垂直居中
date: 2017-05-11 23:52:24
tag: [Css]
category: Css
---
居中效果在CSS中很是普通的效果，平时大家所看到的居中效果主要分为三大类：水平居中、垂直居中和水平垂直居中。而其中水平居中相对于后两者来说要简单得.
<!-- more -->
### 水平居中

** 1. 浮动 **
```html
<style media="screen" type="text/css">
    .wrap{position:relative;left:50%; float:left;}
    .cont{position:relative;left:-50%;}
</style>

<div class="wrap">
    <div class="cont">
        没有宽度的div实现水平居中显示
    </div>
</div>
```
> 原理:先让元素左浮动 父元素的左边距页面的左边为0,设置父元素的`position:relative;left:50%;`后 父元素的左边距页面的左边为50%.
> 此时子元素的左边距页面的左边也是50%, 这时如果设置子元素的`position:relative;left:-50%;` 或者 `position:relative;right:50%;`
> 子元素都会像左边移动50%的距离.(此时的50%是页面的25%)

** 2. 定位 **

```html
<style media="screen" type="text/css">
    .con {position: relative;}
    .wrap{position: absolute;left:50%;}
    .cont{position: relative;left:-50%;}
</style>

<div class="con">
    <div class="wrap">
        <div class="cont">
            没有宽度的div实现水平居中显示
        </div>
    </div>
</div>
```
原理: 与方法1 一样

** 3. display: box **

```html
<style media="screen" type="text/css">
    .cont { 
        display: -webkit-box; 
        -webkit-box-orient: horizontal; 
        -webkit-box-pack: center; 
        display: -moz-box; 
        -moz-box-orient: horizontal; 
        -moz-box-pack: center; 
        display: -o-box; 
        -o-box-orient: horizontal; 
        -o-box-pack: center; display: 
        -ms-box; -ms-box-orient: horizontal; 
        -ms-box-pack: center; 
        display: box; 
        box-orient: horizontal; 
        box-pack: center; 
    }
</style>

<div class="cont">
    没有宽度的div实现水平居中显示
</div>

```
** 4. fit-content **

```html
<style media="screen" type="text/css">
    .cont{
        width: -moz-fit-content; 
        width:-webkit-fit-content; 
        width: fit-content; 
        margin-left: auto; 
        margin-right: auto;
    }
</style>

<div class="cont">
    没有宽度的div实现水平居中显示
</div>

```

** 5. display: table **

```html
<style media="screen" type="text/css">
    .cont{
        display: table;
        margin: auto;
    }
</style>

<div class="cont">
    没有宽度的div实现水平居中显示
</div>

```

### 垂直居中

** 1. 方法一 **

```html

.cont {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 220px;
    width: 70%;
    background: red;
}

<div class="cont">
    垂直居中显示  需要设置宽度,高度
</div>

```

** 2. 方法二 **

```html

.cont {
    width: 70%;
    height: 200px;
    position: absolute;
    top: 50%;
    margin-top: -100px;
    background: red;
}

<div class="cont">
    垂直居中显示  需要设置宽度,高度
</div>

```

** 3. 方法三 **

```html

.cont {
 position: absolute;
    top:50%;
    transform:translateY(-50%);
}

<div class="cont">
    垂直居中显示 无需宽高 
</div>

```


** 4. 方法四 **

```html

.wrap{
    display: flex;
    align-items:center;
}
.cont{margin: auto;}

<div class="wrap">
    <div class="cont">
        没有宽度
    </div>
</div>

```
### 水平垂直居中

** 1. 方法一 **

```html

.cont {
  width: 50%; 
  height: 50%; 
  background: #000;
  /* overflow: auto;  */
  margin: auto; 
  position: absolute; 
  top: 0; left: 0; bottom: 0; right: 0; 
}

<div class="cont">
    垂直居中显示 需宽高
</div>

```

** 2. 方法二 **

```html

.cont {
 position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}

<div class="cont">
    垂直居中显示 无需宽高 
</div>

```