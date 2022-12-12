---
title: python-urllib模块的使用总结
date: 2018-08-30 17:35:10
tag: [Python]
category: Python
---
urllib模块可以非常方便地抓取URL内容，然后返回内容，
<!-- more -->
__1. urllib.urlopen(url[,data[,proxies]])__
`urllib.request.urlopen(url, data=None, [timeout, ]*, cafile=None, capath=None, cadefault=False, context=None)
`
描述：第一个参数可以传递URL之外，我们还可以传递其它的内容，比如 data （附加参数）， timeout （超时时间）等等。
data 参数是可选的，如果要添加 data ，它要是字节流编码格式的内容，即 bytes 类型，通过 bytes() 函数可以进行转化，另外如果你传递了这个 data 参数，它的请求方式就不再是 GET 方式请求，而是 POST 。
```python
urlopen返回对象提供方法：

        read() , readline() ,readlines() , fileno() , close() ：这些方法的使用方式与文件对象完全一样

        info()：返回一个httplib.HTTPMessage对象，表示远程服务器返回的头信息

        getcode()：返回Http状态码。如果是http请求，200请求成功完成;404网址未找到

        geturl()：返回请求的url
```

__2.urllib.urlretrieve(url[,filename[,reporthook[,data]]])__
描述：将url定位到的html文件下载到你本地的硬盘中。如果不指定filename，则会存为临时文件。
```python
from urllib import request

request.urlretrieve(urlPath, './%s.jpg' % fileName)

urlPath: 网页地址 / 图片地址

fileName: 储存地址 例如：'./python/img/xxx.html'
```
__3.urllib.urlcleanup()__
描述：清除由于urllib.urlretrieve()所产生的缓存

__4.urllib.urlencode(query)__
描述：将URL中的键值对以连接符&划分,这里可以与urlopen结合以实现post方法和get方法
__POST方法__
```python
import urllib
data = urllib.parse.urlencode({'wd':'123456'}).encode('utf-8')
print(data) # b'wd=123456'

html = urllib.request.urlopen("http://httpbin.org/post", data=data).read().decode('utf-8')

print(html)
```
`http://httpbin.org/post `这个地址可以用来测试 POST 请求，它可以输出请求和响应信息，其中就包含我们传递的 data 参数。


__GET方法__
```python
import urllib.request
 
response = urllib.request.urlopen("https://www.baidu.com")

print(response.read().decode("utf-8"))

```

__5.urllib.request.Request的使用__
```python
class urllib.request.Request(url, data=None, headers={}, origin_req_host=None, unverifiable=False, method=None)
```

* `url` 参数是请求链接，这个是必传参数，其他的都是可选参数。
* `data` 参数如果要传必须传 `bytes` （字节流）类型的，如果是一个字典，可以先用 `urllib.parse.urlencode()` 编码。

* `headers` 参数是一个字典，你可以在构造 `Request` 时通过 `headers` 参数传递，也可以通过调用 Request 对象的 add_header() 方法来添加请求头。请求头最常用的用法就是通过修改 `User-Agent` 来伪装浏览器，默认的 `User-Agent` 是 `Python-urllib` ，你可以通过修改它来伪装浏览器，比如要伪装火狐浏览器，你可以把它设置为 `Mozilla/5.0 (X11; U; Linux i686)Gecko/20071127 Firefox/2.0.0.11`
* `origin_req_host` 指的是请求方的 `host` 名称或者 `IP` 地址。
* `unverifiable` 指的是这个请求是否是无法验证的，默认是 `False` 。意思就是说用户没有足够权限来选择接收这个请求的结果。例如我们请求一个HTML文档中的图片，但是我们没有自动抓取图像的权限，这时 `unverifiable` 的值就是 `True` 。
* `method` 是一个字符串，它用来指示请求使用的方法，比如 `GET` ， `POST` ， `PUT` 等等。


```python
import urllib
 
request =urllib.request.Request("http://www.baidu.com")

response = urllib.request.urlopen(request)

print(response.read().decode("utf-8"))

```
我们依然是用 urlopen() 方法来发送这个请求，只不过这次 urlopen() 方法的参数不再是一个URL，而是一个 Request ，通过构造这个这个数据结构，一方面我们可以将请求独立成一个对象，另一方面可配置参数更加丰富和灵活。

实例：
```python
from urllib import request,parse

url = "http://httpbin.org/post"

headers = {
    #伪装一个火狐浏览器
    "User-Agent":'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)',
    "host":'httpbin.org'
}
dict = {
    "name":"Germey"
}
data = parse.urlencode(dict).encode("utf8")
# data = bytes(parse.urlencode(dict),encoding="utf8")

req = request.Request(url=url,data=data,headers=headers,method="POST")
response = request.urlopen(req)
print(response.read().decode("utf-8"))

```
在这里我们通过四个参数构造了一个 Request ， url 即请求链接，在 headers 中指定了 User-Agent 和 Host ，传递的参数 data 用了 urlencode() 和 bytes() 方法来转成字节流，另外指定了请求方式为 POST 。

结果是：
```python
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "name": "Germey"
  }, 
  "headers": {
    "Accept-Encoding": "identity", 
    "Connection": "close", 
    "Content-Length": "11", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "User-Agent": "Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)"
  }, 
  "json": null, 
  "origin": "125.46.249.76", 
  "url": "http://httpbin.org/post"
}

[Finished in 1.3s]
```

__6.高级特性__
接下来就需要更强大的工具 `Handler` 登场了。

简而言之你可以把它理解为各种处理器，有专门处理登录验证的，有处理 `Cookies` 的，有处理代理设置的，利用它们我们几乎可以做到任何 `HTTP` 请求中所有的事情。

首先介绍下 `urllib.request.BaseHandler` ，它是所有其他 `Handler` 的父类，它提供了最基本的 `Handler` 的方法，例
如 `default_open()` 、 `protocol_request()` 等。
接下来就有各种 `Handler` 类继承这个 `BaseHandler` ，列举如下：

* `HTTPDefaultErrorHandler` 用于处理`HTTP`响应错误，错误都会抛出 `HTTPError` 类型的异常。
* `HTTPRedirectHandler` 用于处理重定向。
* `HTTPCookieProcessor` 用于处理 `Cookie` 。
* `ProxyHandler` 用于设置代理，默认代理为空。
* `HTTPPasswordMgr` 用于管理密码，它维护了用户名密码的表。
* `HTTPBasicAuthHandler` 用于管理认证，如果一个链接打开时需要认证，那么可以用它来解决认证问题。 


另外还有其他的 `Handler` ，可以参考官方文档。
```
https://docs.python.org/3/library/urllib.request.html#urllib.request.BaseHandler
```

它们怎么来使用，不用着急，下面会有实例为你演示。
另外一个比较重要的就是 OpenerDirector ，我们可以称之为 Opener ，我们之前用过 urllib.request.urlopen() 这个方法，实际上它就是一个 Opener 。
那么为什么要引入 Opener 呢？因为我们需要实现更高级的功能，之前我们使用的 Request 、 urlopen() 相当于类库为你封装好了极其常用的请求方法，利用它们两个我们就可以完成基本的请求，但是现在不一样了，我们需要实现更高级的功能，所以我们需要深入一层，使用更上层的实例来完成我们的操作。所以，在这里我们就用到了比调用 urlopen() 的对象的更普遍的对象，也就是 Opener 。

Opener 可以使用 open() 方法，返回的类型和 urlopen() 如出一辙。那么它和 Handler 有什么关系？简而言之，就是利用 Handler 来构建 Opener 。
*认证*
我们先用一个实例来感受一下
```python
import urllib.request
auth_handler = urllib.request.HTTPBasicAuthHandler()
auth_handler.add_password(realm='PDQ Application',
                          uri='https://mahler:8092/site-updates.py',
                          user='klem',
                          passwd='kadidd!ehopper')
opener = urllib.request.build_opener(auth_handler)
urllib.request.install_opener(opener)
urllib.request.urlopen('http://www.example.com/login.html')
```
此处代码为实例代码，用于说明 `Handler` 和 `Opener` 的使用方法。在这里，首先实例化了一个 `HTTPBasicAuthHandler` 对象，然后利用 `add_password()` 添加进去用户名和密码，相当于建立了一个处理认证的处理器。
接下来利用 `urllib.request.build_opener()` 方法来利用这个处理器构建一个 `Opener` ，那么这个 `Opener` 在发送请求的时候就具备了认证功能了。接下来利用 `Opener` 的 `open()` 方法打开链接，就可以完成认证了。

*代理*
如果添加代理，可以这样做：
```python
import urllib.request
proxy_handler = urllib.request.ProxyHandler({
'http': 'http://218.202.111.10:80',
'https': 'https://180.250.163.34:8888'
})
opener = urllib.request.build_opener(proxy_handler)
response = opener.open('https://www.baidu.com')
print(response.read())
```
此处代码为实例代码，用于说明代理的设置方法，代理可能已经失效。

在这里使用了 ProxyHandler ， ProxyHandler 的参数是一个字典，key是协议类型，比如 http 还是 https 等，value是代理链接，可以添加多个代理。
然后利用 build_opener() 方法利用这个 Handler 构造一个 Opener ，然后发送请求即可。


__7.Cookie设置__
```python
import http.cookiejar, urllib.request
cookie = http.cookiejar.CookieJar()
handler = urllib.request.HTTPCookieProcessor(cookie)
opener = urllib.request.build_opener(handler)
response = opener.open('http://www.baidu.com')
for item in cookie:
   print(item.name+"="+item.value)

```

运行结果：
```python
BAIDUID=FA5D3EA91FC106883E2C63D56E7C667B:FG=1
BIDUPSID=FA5D3EA91FC106883E2C63D56E7C667B
H_PS_PSSID=
PSTM=1535618742
BDSVRTM=0
BD_HOME=0
delPer=0
[Finished in 0.8s]
```


文章整理自`https://blog.csdn.net/bo_mask/article/details/76067790`