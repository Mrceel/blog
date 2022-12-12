---
title: Python-iamge模块
date: 2018-08-13 23:52:24
tag: [Python]
category: Python
---
from PIL import Image 引入 模块
<!-- more -->
1、 打开(读取)图片
`img = Image.open('tu.png')`

2、 显示(查看)图片
`img.show()`

3、 保存图片
`img.save("save.gif","GIF") `
保存图像为gif格式

4、 创建新图片
```
Image.new(mode,size)
Image.new(mode,size,color)
```
例如：`newImg = Image.new("RGBA",(640,480),(0,255,0))`

5、 两张图片相加
`Image.blend(img1,img2,alpha) `
这里`alpha`表示`img1`和`img2`的比例参数

6、 点操作
`im.point(function) `
这个`function`接受一个参数，且对图片中的每一个点执行这个函数
比如：`out=im.point(lambdai:i*1.5)`
对每个点进行50%的加强

7、 查看图像信息
`im.format, im.size, im.mode`

8、 图片裁剪 
```
img.crop(box)
box=(100,100,500,500)
```
设置要裁剪的区域
`region=img.crop(box) `
此时，`region`是一个新的图像对象。

9、 图像黏贴（合并）
`im.paste(region,box)`
粘贴box大小的region到原先的图片对象中。

10、 通道分离
`r,g,b=im.split()`
分割成三个通道，此时r,g,b分别为三个图像对象。

11、 通道合并
`im=Image.merge("RGB",(b,g,r))`
将b,r两个通道进行翻转。

12、 改变图像的大小
`out=img.resize((128,128))`
resize成128*128像素大小

13、 旋转图像
`out=img.rotate(45) `
逆时针旋转45度

有更方便的
`region = region.transpose(Image.ROTATE_180）`

14、 图像转换
`out = im.transpose(Image.FLIP_LEFT_RIGHT)`
左右对换。

`out = im.transpose(Image.FLIP_TOP_BOTTOM)`
上下对换

15、 图像类型转换
`im=im.convert("RGBA")`

16、 获取某个像素位置的值
`im.getpixel((4,4))`

17、 写某个像素位置的值
`img.putpixel((4,4),(255,0,0))`

18、 创建画笔,用于在图片上生成内容
`draw1 = ImageDraw.Draw(img1, mode="RGB")  `

19、 在图片上画线
`draw1.line((100,100,350,300),fill="red")` `

20、 图上画圆 第一个元组里面的4个参数代表圆的左上角点和右下角的点（一共俩点）
`draw1.arc((0,0,400,400),0,360,fill="red")`

21、 在图片在写文本 
`draw1.text([220,330],"python","blue", font="")`
* 第一个参数 指定写入的位置
* 第二个参数 要写的内容
* 第三个参数 文字的颜色
* 第四个参数 指定文字的样式（一般用字体文件）

