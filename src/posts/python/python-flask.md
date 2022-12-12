---
title: Python-Flask
date: 2018-11-08 17:35:10
tag: [Flask]
category: Python
---
因为要做一个比较实用的小程序，后台代码不多。所以选择Flask，毕竟他是公认的轻量级！！！
之前都是用Django, 这也算熟悉一下Flask吧。 开工~
<!-- more -->
### 安装

`版本 python3.6.5  Flask 1.0 (windows)`

为了不污染全局环境，新建一个虚拟环境。
*新建*
<span style='font-size: 12px'>该步骤不会有成功提示，执行完直接看是否新建了venv文件夹。</span>
`python -m venv venv`

*激活环境*
`venv\Scripts\activate`

*安装Flask*
<span style='font-size: 12px'>设置了下镜像，不然会报错。</span>
`pip install Flask -i https://pypi.tuna.tsinghua.edu.cn/simple/`