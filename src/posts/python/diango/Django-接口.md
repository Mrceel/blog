---
title: Django-编写前后分离开发接口
date: 2018-09-14 16:13:23
tag: [Django]
category: Django
---
上一篇已经说了django的跨域问题
<!-- more -->
新建一个应用`interfa`，首先设置Django允许跨域。
interfa/ views.py
```python
from django.http import JsonResponse

def interfac(request):
    data = [
        {'name': 'mrceel', 'age': '20'},
        {'name': '二傻', 'age': '19'}
    ]
    return JsonResponse(data, safe=False)
```

interfa/ 新建 urls.py
urls.py
```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.interfac, name='interfac')
]
```

记得在项目目录下配置url 
/ urls.py
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # 添加
    path('interfa/', include('interfa.urls'))
]

```

前端页面 index.html
```html
...
<script>
    $.ajax(
        url: 'http://localhost:8000/interfa/',
        Type: 'GET',
        success: function(data){
            console.log(data)
        }
    )
</script>
...
```
自此你已经完成了一个简单的接口文件...