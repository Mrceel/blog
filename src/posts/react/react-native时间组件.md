---
title: react-native 时间组件的使用
date: 2019-11-30 16:13:23
tag: [React-native]
category: React
---
安装
```
 yarn add react-native-picker
 react-native link react-native-picker
 or 
 
 npm install react-native-picker --save
 react-native link react-native-picker
```
<!-- more -->
官网的例子：
```javascript
import Picker from 'react-native-picker';
  let data = [[],[]];
  for(var i=0;i<100;i++){
      data[0].push(i);
  }
  for(var j=0;j<100;j++){
    data[1].push(j);
}
   

Picker.init({
	pickerData: data,
	selectedValue: [25],
	onPickerConfirm: data => { // 点击(confirm)确定时回调函数
		console.log(data);
	},
	onPickerCancel: data => { // 点击(cancel)取消时回调函数
		console.log(data);
	},
	onPickerSelect: data => { // 点击确定时回调函数
		console.log(data);
	}
});
Picker.show();

```
这也是一个可以自定义的组件： 例如[看这里](https://www.cnblogs.com/bruce-gou/p/8583793.html)





babel-plugin-root-import








react-native-calendars
react-native-datetime

npm install beeshell        [beeshell](https://github.com/meituan/beeshell/blob/master/docs/index.md)

<Text numberOfLines={2} />