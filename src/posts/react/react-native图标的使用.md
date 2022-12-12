---
title: React-native 图标的使用
date: 2019-11-27 18:45:12
tag: [React-native]
category: React
---

```
npm install --save react-native-vector-icons // 下载库
react-native link react-native-vector-icons // 自动关联
```
[可以在这里挑选图标...](https://oblador.github.io/react-native-vector-icons/)
<!-- more -->
使用：
```
import Icon from 'react-native-vector-icons/FontAwesome';  // 注意这里
<Icon name='home' size={25} color='blue' />;
```
打开上面的网址你会发现有很多图标。分好几个系列。这里使用的是 `FontAwesome` 系列的图标
还有其他的 `Feather`、 `EvilIcons`等。按需引入最好。