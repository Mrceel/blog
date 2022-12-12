---
title: CentOS7部署flask项目
date: 2019-12-15 12:53:31
tag: [ flask]
category: Python
---

本想在`winserver`部署`flask`项目奈何坑太多，以至于短时间填不平。所以就转到`linux`系统了。
<!-- more -->

在服务器上找个目录创建一个`python`虚拟环境
[参考这里](https://www.jianshu.com/p/da28ec28ef4b)
如果按照上面的教程不能成功的话，就接着往下看吧。因为我按照上面的教程完成了大部分。但仍然没有成功部署。
因为第一次使用`linux`系统，第一次部署`python`项目。走了很多弯路...

默认已经安装好 `nginx` 和 `虚拟环境` 还有 `gunicorn`。 如果没有安装好请 **参考上面链接安装**。

我的 `flask` 项目放在了 `/mysource/ceel/pyproject/wallpaper/*` 目录。

## 重点
1. 激活并进入虚拟环境
2. 安装项目需要的模块
3. 启动 `gunicorn` 
		`gunicorn -w 2 -b 127.0.0.1:8070 app:app`
		 #                 指定运行端口   运行 app.py中的 app = flask(__name__)
4. 配置启动 `nginx` 
		我的做法是在 nginx.conf 文件添加了
		
		// nginx.conf 文件
		http{
			....
			server {
				listen 8060;
				server_name 服务器IP地址/域名（***.***.***.***）;
			 
				location / {
					proxy_pass http://127.0.0.1:8070;
					proxy_set_header Host $host;
					proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
					proxy_set_header Host $http_host;
				}
			}
			...
		}
		
		nginx -t 命令检查配置是否正确
		nginx -s reload 重启 nginx
		
可能遇到的问题（`nginx` 和 `gunicorn` 都有可能遇到 反正我是遇到了...倒霉）：
-  Connection in use: ('127.0.0.1', 8070)
	[2019-12-16 10:34:27 +0800] [9997] [ERROR] Retrying in 1 second.
	[2019-12-16 10:34:28 +0800] [9997] [ERROR] Connection in use: ('127.0.0.1', 8070)
	[2019-12-16 10:34:28 +0800] [9997] [ERROR] Retrying in 1 second.
	[2019-12-16 10:34:29 +0800] [9997] [ERROR] Connection in use: ('127.0.0.1', 8070)
	[2019-12-16 10:34:29 +0800] [9997] [ERROR] Retrying in 1 second.
	[2019-12-16 10:34:30 +0800] [9997] [ERROR] Connection in use: ('127.0.0.1', 8070)
	[2019-12-16 10:34:30 +0800] [9997] [ERROR] Retrying in 1 second.
	[2019-12-16 10:34:31 +0800] [9997] [ERROR] Connection in use: ('127.0.0.1', 8070)
	[2019-12-16 10:34:31 +0800] [9997] [ERROR] Retrying in 1 second.
	[2019-12-16 10:34:32 +0800] [9997] [ERROR] Can't connect to ('127.0.0.1', 8070)
端口被占用...

解决办法：先检查一下是谁占用了，用kill -9 *** 杀一下进程，如果还是不行用下面的办法
强制关闭端口的占用， 
`sudo fuser -k 8070/tcp`
- 还要增加阿里云或者腾讯云的安全组策略。添加出站入站规则。


最后就能访问了[一个壁纸网站](http://ceel.vip:8086)

1. 通过执行如下命令，可以获取Gunicorn进程树：
`pstree -ap|grep gunicorn`
2. 重启Gunicorn任务

Python
kill -HUP 14226
3. 退出Gunicorn任务

Python
kill -9 28097