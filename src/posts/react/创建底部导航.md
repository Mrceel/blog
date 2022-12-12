---
title: React-native 创建底部导航栏
date: 2019-11-27 18:45:12
tag: [React-native]
category: React
---
基于上篇 `路由` 
首先需要安装新的插件
```
react-navigation-tabs
```
<!-- more -->

思路就是先创建2个路由。然后由 `createBottomTabNavigator()` 直接生成导航栏。
官网代码如下:

```
import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// 路由  组件 HomeScreen
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}
// 路由  组件 SettingsScreen
class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}
// 生成导航栏
const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});

export default createAppContainer(TabNavigator);

```
使用图标icon， 这个就比较简单了，如下:
```
import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;  // 更换引用
        let iconName;
        if (routeName === 'Home') {
          iconName = 'book'
        } else if (routeName === 'Settings') {
          iconName = `user`;
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'yellow',  // 选中项的颜色
      inactiveTintColor: 'blue', // 未选中项的颜色
    },
  }
);

export default createAppContainer(TabNavigator);

```