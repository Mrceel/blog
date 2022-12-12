---
title: 使用js判断是Pc端或者移动端
date: 2018-07-30 17:35:10
tag: [JavaScript]
category: JavaScript
---
使用js判断是Pc端或者移动端
<!-- more -->
源代码：
```
function goPAGE() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        /*window.location.href="你的手机版地址";*/
        alert("mobile")
    }
    else {
        /*window.location.href="你的电脑版地址";    */
        alert("pc")
    }
}
goPAGE();
```
稍微改下：
解决了：判断完成后页面不停刷新,停不下来。
```
<script>  
    function goPAGE() {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            return "你的手机版地址";
        }
        else {
            return "你的电脑版地址";
        }
    }
    window.location.href = goPAGE();
</script>
```
还有一种方法是：在移动端的里面只写上跳pc的代码, 在pc端里面只写上跳移动端的代码就可以了。

出现这个问题的原因是：
例如:你有pc版的index和移动的index，俩页面。
在两个index里面写入了判断代码，当它进入pc版的index/移动的index页面时候会在判断了一次，此番下去变成了一个无限的循环...