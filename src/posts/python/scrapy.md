---
title: Scrapy - 快速入门
date: 2018-08-26 17:52:03
tag: [Python]
category: Python
---
Spider是用户编写用于从单个网站(或者一些网站)爬取数据的类。
<!-- more -->

__创建项目__
```python
scrapy startproject <your project-name>
```
会创建一个类似以下的目录(例如名字叫tutorial)
```python
tutorial/
    scrapy.cfg            # deploy configuration file

    tutorial/             # project's Python module, you'll import your code from here
        __init__.py

        items.py          # project items definition file

        middlewares.py    # project middlewares file

        pipelines.py      # project pipelines file

        settings.py       # project settings file

        spiders/          # a directory where you'll later put your spiders
            __init__.py
```

我们的爬虫代码一般放在`tutorial/spider/`下
例如：`jimi.py`
```python
import scrapy
from tutorial.items import JimiItem

class JimiSpider(scrapy.Spider):
	name = "jimi"
	start_urls = ["https://book.douban.com/author/4504814/"]

	def parse(self, response):
		pass
```
为了创建一个`Spider`，您必须继承 `scrapy.Spider` 类， 且定义以下三个属性:
我们的Spider子类scrapy.Spider 并定义了一些属性和方法：
* name：识别爬虫。它在项目中必须是唯一的，也就是说，不能为不同的`Spiders`设置相同的名称。
* start_requests()：必须返回`Spider`将开始爬行的可迭代请求（可以返回请求列表或编写生成器函数）。后续请求将从这些初始请求中连续生成。
* parse()：将调用一个方法来处理为每个请求下载的响应。响应参数是`TextResponse`保存页面内容的实例，并具有处理它的其他有用方法。
该`parse()`方法通常解析响应，将抽取的数据提取为`dicts`，并查找要遵循的新`URL`并`Request`从中创建新的`request（）`。

运行我们的文件：
转到项目根目录，输入下面代码(这里的`quotes`就是`quotes_spider.py`文件里面的`name`值)
```
scrapy crawl quotes
```

__提取数据__

学习如何使用Scrapy提取数据的最佳方法是使用shell Scrapy shell尝试选择器。运行(url 需要带上引号)：
```python
scrapy shell 'https://book.douban.com/author/4504814/'
```
你会看到类似的输出日志：
```python
2018-08-28 18:06:49 [scrapy.middleware] INFO: Enabled item pipelines:
['tutorial.pipelines.TutorialPipeline']
2018-08-28 18:06:49 [scrapy.extensions.telnet] DEBUG: Telnet console listening on 127.0.0.1:6023
2018-08-28 18:06:49 [scrapy.core.engine] INFO: Spider opened
2018-08-28 18:06:50 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://book.douban.com/robots.txt> (referer: None)
2018-08-28 18:06:50 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://book.douban.com/author/4504814/> (referer: None)
[s] Available Scrapy objects:
[s]   scrapy     scrapy module (contains scrapy.Request, scrapy.Selector, etc)
[s]   crawler    <scrapy.crawler.Crawler object at 0x000002363EE7BB70>
[s]   item       {}
[s]   request    <GET https://book.douban.com/author/4504814/>
[s]   response   <200 https://book.douban.com/author/4504814/>
[s]   settings   <scrapy.settings.Settings object at 0x00000236414B2A20>
[s]   spider     <DefaultSpider 'default' at 0x236419cb198>
[s] Useful shortcuts:
[s]   fetch(url[, redirect=True]) Fetch URL and update local objects (by default, redirects are followed)
[s]   fetch(req)                  Fetch a scrapy.Request and update local objects
[s]   shelp()           Shell help (print this help)
[s]   view(response)    View response in a browser
In [1]:
```
此时可以测试提取数据的代码 例如：
```python
In [1]:response.xpath('//div[@id="wrapper"]/div[@id="content"]/h1/text()').extract_first()
```
退出shell： `ctrl + d`

`jimi.py`
```python
# -*- coding: utf-8 -*-
import scrapy
from tutorial.items import JimiItem

class JimiSpider(scrapy.Spider):
	name = "jimi"
	start_urls = ["https://book.douban.com/author/4504814/"]

	def parse(self, response):
		item = JimiItem()
		item["title"] = response.xpath('//div[@id="wrapper"]/div[@id="content"]/h1/text()').extract_first()
		item["describe"] = response.xpath('//div[@id="wrapper"]/div[@id="content"]/div/div[@class="article"]/div[@id="intro"]/div[@class="bd"]/text()').extract_first()
		yield item       
```
上面文件引入了`JimiItem`，现在看下`items.py`文件。（items文件具体是做什么的我也不清楚...）
`items.py`
```python
# -*- coding: utf-8 -*-
import scrapy
from scrapy import Field, Item

class JimiItem(Item):
	title = Field()
	describe = Field()
	book_title = Field()
	book_link = Field()
    # 这里定义了4个 其实只用了前两个
```
接下来看下`pipelines.py`文件
```python
# -*- coding: utf-8 -*-
import json
class TutorialPipeline(object):
	def open_spider(self, spider): # 该方法在spider启用的时候调用
		self.file = open('3.json', 'w')
	def process_item(self, item, spider): # 大概是在中间的时候调用...
		line = json.dumps(dict(item)) + "\n"
		self.file.write(line)
		return item
	def close_spider(self, spider): # 该方法在spider结束的时候调用
		self.file.close()
```
还有就是要在`settings.py`文件中释放
```python
ITEM_PIPELINES = {
    'tutorial.pipelines.TutorialPipeline': 300,
}
```
后面的数字“300”，是优先级，数字越小，越优先执行

__总结__

在终端中输入以下命令，查看scrapy有哪些命令语法
```python
scrapy -h
```
__生成spider__
创建spider。一般创建的spider名字是跟域名一样的，比如`www.baidu.com`，我们穿件的爬虫命令(个人感觉有点麻烦，还不如直接手动新建文件)
```python
scrapy genspider baidu baidu.com
```
__开始爬取__
```python
scrapy crawl <spidername>
```

结语： “这个框架我也没有感觉到特别的地方，接下来尝试不使用框架爬取数据。”