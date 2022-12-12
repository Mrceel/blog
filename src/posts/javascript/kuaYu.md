---
title: js 跨域
date: 2017-02-20 22:26:45
tag: [Ajax]
category: JavaScript
---

## 首先要知道什么是跨域！
<!-- more -->
跨域，指的是浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器施加的安全限制。

所谓同源是指，域名，协议，端口均相同，不明白没关系，举个栗子：


```
http://www.123.com/index.html 调用 http://www.123.com/server.php （非跨域）

http://www.123.com/index.html 调用 http://www.456.com/server.php （主域名不同:123/456，跨域）

http://abc.123.com/index.html 调用 http://def.123.com/server.php （子域名不同:abc/def，跨域）

http://www.123.com:8080/index.html 调用 http://www.123.com:8081/server.php （端口不同:8080/8081，跨域）

http://www.123.com/index.html 调用 https://www.123.com/server.php （协议不同:http/https，跨域）

请注意：localhost和127.0.0.1虽然都指向本机，但也属于跨域。
```


浏览器执行javascript脚本时，会检查这个脚本属于哪个页面，如果不是同源页面，就不会被执行。

------------
## 使用JSONP进行跨域请求！

```JavaScript
var script = document.createElement("script");
script.src = "https://api.douban.com/v2/book/search?q=javascript&count=1&callback=handleResponse";
document.body.insertBefore(script, document.body.firstChild);
function handleResponse(response){
    // 对response数据进行操作代码
    console.log(response)
}
```

**jsonp原理：**
其本质是利用了标签的src属性具有可跨域的特性，由服务端返回预先定义好的javascript函数的调用，并且将服务端数据以该函数参数的形式传递过来。

## 使用JQuery $.ajax()进行请求
```
$.ajax({
    async : true,
    url : "https://api.douban.com/v2/book/search",
    type : "GET",
    dataType : "jsonp", // 返回的数据类型，设置为JSONP方式
    jsonp : 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
    jsonpCallback: 'handleResponse', //设置回调函数名
    data : {
        q : "javascript",
        count : 1
    },
    success: function(response, status, xhr){
        console.log('状态为：' + status + ',状态是：' + xhr.statusText);
        console.log(response);
    }
});
```
## 使用 $.getJSON()进行请求
在路径后加  '？callback=？'  即可


```
$.getJSON("https://api.douban.com/v2/book/search?q=javascript&count=1&callback=?", function(data){
    console.log(data);
});
```


ajax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加'< script >'标签来调用服务器提供的js脚本。


ajax与jsonp的区别不在于是否跨域，ajax通过服务端代理一样可以实现跨域，jsonp本身也不排斥同域的数据的获取。

*本文参考https://blog.csdn.net/u014607184/article/details/52027879*