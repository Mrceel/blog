---
title: Python-Django解决跨域的问题
date: 2018-09-12 16:13:23
tag: [Python]
category: Python
---
跨域的问题是在前后段分离开发时....
<!-- more -->
安装django-cors-headers

```
pip3 install django-cors-headers
```

在项目目录里面的settings.py添加下面的代码
```python
INSTALLED_APPS = [
    ...
    'corsheaders'，
 ] 

MIDDLEWARE_CLASSES = (
    ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware', # 注意顺序
    ...
)
#跨域增加忽略
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    '*'
)
# 设置允许请求方式
CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    'VIEW',
)

CORS_ALLOW_HEADERS = (
    'XMLHttpRequest',
    'X_FILENAME',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'Pragma',
)
```
一定要注意 __tab__ 不要和 __空格__  混用!!!
使用JSONP也是可以进行跨域请求的。。。



