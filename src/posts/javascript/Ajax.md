---
title: Ajax
date: 2017-01-20 17:30:46
tag: [ Ajax ]
category: JavaScript
---
<center> ajax 的全称是Asynchronous JavaScript and XML，其中，Asynchronous 是异步的意思，它有别于传统web开发中采用的同步的方式。</center>
<!-- more -->
## ajax原理和XmlHttpRequest对象 ##
** Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。这其中最关键的一步就是从服务器获得请求数据。要清楚这个过程和原理，我们必须对 XMLHttpRequest有所了解。 **

XMLHttpRequest是ajax的核心机制，它是在IE5中首先引入的，是一种支持异步请求的技术。简单的说，也就是javascript可以及时向服务器提出请求和处理响应，而不阻塞用户。达到无刷新的效果。

首先，我们先来看看XMLHttpRequest这个对象的属性。

　　它的属性有：

　　onreadystatechange  每次状态改变所触发事件的事件处理程序。

　　responseText     从服务器进程返回数据的字符串形式。

　　responseXML    从服务器进程返回的DOM兼容的文档数据对象。

　　status           从服务器返回的数字代码，比如常见的404（未找到）和200（已就绪）

　　status Text       伴随状态码的字符串信息

　　readyState       对象状态值

　　　　0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）

　　　　1 (初始化) 对象已建立，尚未调用send方法

　　　　2 (发送数据) send方法已调用，但是当前的状态及http头未知

　　　　3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误，

　　　　4 (完成) 数据接收完毕,此时可以通过通过responseXml和responseText获取完整的回应数据



　　但是，由于各浏览器之间存在差异，所以创建一个XMLHttpRequest对象可能需要不同的方法。这个差异主要体现在IE和其它浏览器之间。下面是一个比较标准的创建XMLHttpRequest对象的方法。
```
//创建传输对象
function createXHR(){
    if(window.XMLHttpRequest){
        return new XMLHrrpRequest();
    }
    return new ActiveXObject("Microsoft.XMLHTTP");
}

//obj {name:huhu,age:18}  => "name=huhu&age=18"
//格式化参数
function params(obj) {
    var arr = [];
    for(var i in obj) {
        var str = i + "=" + obj[i];
        arr.push(str);
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}

function ajax(option){
    option = option || {};
    option.url = option.url || '';
    option.type = option.type.toUpperCase() || 'GET';
    option.data = option.data || '';
    option.async = option.async || true;
    option.success = option.success || function (data) {};
    option.error = option.errro || function (data) {};
    // 第一步 创建对象
    var xhr = createXHR();
    //连接 和 发送 - 第二步
    if (option.type == "GET") {
        xhr.open("GET", option.url + "?" + params(option.data), option.async);
        xhr.send(null);
    } else if (option.type == "POST") {
        xhr.open("POST", option.url, option.async);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params(option.data));
    }else{
        alert('类型有误')
        return;
    }
    xhr.onreadystatechange = function () {
        if (XHR.readyState == 4) {
            var status = xhr.status;
            if (XHR.status >= 200 && XHR.status < 300 || XHR.status == 304) {
                switch (obj.responseType) {
                    case 'document':
                        obj.success(XHR.responseXML);
                        break;
                    case 'json':
                        obj.success(XHR.response);
                        break;
                    default:
                        obj.success(XHR.responseText);
                        break;
                }
            }else{
                option.error(status);
            }
        }
    }
}
/*  使用
    ajax({
        type:请求的方式  get/post 如果省略 默认是get,
        url:不能省略 必须参数 服务器地址,
        data:{} 参数 如果没有参数省略即可,
        async: ture/false 是否是异步 默认不写就是异步,
        success:function(data){} 请求成功的回调函数 data表示请求回来的数据,
        error:function(data){} 请求失败的回调函数,
        responseType:document(请求xml数据)    json(请求json数据) text  如果省略默认返回text
    });
*/
```
还有其他封装方法 不一一列出了~

## Ajax的缺点 ##
下面所阐述的ajax的缺陷都是它先天所产生的。

   　1、ajax干掉了back按钮，即对浏览器后退机制的破坏。后退按钮是一个标准的web站点的重要功能，但是它没法和js进行很好的合作。这是ajax所带来的一个比较严重的问题，因为用户往往是希望能够通过后退来取消前一次操作的。那么对于这个问题有没有办法？答案是肯定的，用过Gmail的知道，Gmail下面采用的ajax技术解决了这个问题，在Gmail下面是可以后退的，但是，它也并不能改变ajax的机制，它只是采用的一个比较笨但是有效的办法，即用户单击后退按钮访问历史记录时，通过创建或使用一个隐藏的IFRAME来重现页面上的变更。（例如，当用户在Google Maps中单击后退时，它在一个隐藏的IFRAME中进行搜索，然后将搜索结果反映到Ajax元素上，以便将应用程序状态恢复到当时的状态。）

但是，虽然说这个问题是可以解决的，但是它所带来的开发成本是非常高的，和ajax框架所要求的快速开发是相背离的。这是ajax所带来的一个非常严重的问题。

2、安全问题

技术同时也对IT企业带来了新的安全威胁，ajax技术就如同对企业数据建立了一个直接通道。这使得开发者在不经意间会暴露比以前更多的数据和服务器逻辑。ajax的逻辑可以对客户端的安全扫描技术隐藏起来，允许黑客从远端服务器上建立新的攻击。还有ajax也难以避免一些已知的安全弱点，诸如跨站点脚步攻击、SQL注入攻击和基于credentials的安全漏洞等。
 3、对搜索引擎的支持比较弱。

 4、破坏了程序的异常机制。至少从目前看来，像ajax.dll，ajaxpro.dll这些ajax框架是会破坏程序的异常机制的。关于这个问题，我曾经在开发过程中遇到过，但是查了一下网上几乎没有相关的介绍。后来我自己做了一次试验，分别采用ajax和传统的form提交的模式来删除一条数据……给我们的调试带来了很大的困难。

 5、另外，像其他方面的一些问题，比如说违背了url和资源定位的初衷。例如，我给你一个url地址，如果采用了ajax技术，也许你在该url地址下面看到的和我在这个url地址下看到的内容是不同的。这个和资源定位的初衷是相背离的。

 6、一些手持设备（如手机、PDA等）现在还不能很好的支持ajax，比如说我们在手机的浏览器上打开采用ajax技术的网站时，它目前是不支持的，当然，这个问题和我们没太多关系。