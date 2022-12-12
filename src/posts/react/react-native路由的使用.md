---
title: React-native 路由的使用
date: 2019-11-20 18:45:12
tag: [React-native]
category: React
---

官方网址： [传送门](https://reactnative.cn/docs/0.46/navigation.html)


在安装几个库：(不要问为什么，我也不知道。如果有知道的请告知。万分感谢！！！)
```
react-navigation
react-native-reanimated 
react-native-gesture-handler 
react-native-screens
react-navigation-stack
```
使用 `react-navigation-stack` 
<!-- more -->
## 路由
### 路由配置
路由配置对象是从路由名称到路由配置的映射，它告诉导航器针对该路由显示什么内容

`createStackNavigator(RouteConfigs, StackNavigatorConfig);`
`RouteConfigs`: 路由配置对象中的键是路由名称，值是该路由的配置。配置上唯一需要的属性是screen（用于路由的组件）。
`StackNavigatorConfig`: `createStackNavigator` 是一个函数，它接受一个路由配置对象和一个选项对象，并返回一个React组件。
例子:
```javascript
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { 
  Text, 
  View, 
  Button,
} from 'react-native';

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Detailss: DetailsScreen
});

```
多个的时候呢~
```javascript
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { 
  Text, 
  View, 
  Button,
} from 'react-native';

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Detailss: DetailsScreen,   // 堆栈导航器上定义路由
  Home: HomeScreen           // 堆栈导航器上定义路由
},{
	initialRouteName: 'Home'   // 初始化的时候要显示的路由
});

```
### 路由的跳转:
 - `this.props.navigation.navigate('RouteName')` 只能导航到堆栈导航器上定义好的路由，如果不在堆栈上则不会有反应。
 - `this.props.navigation.push('RouteName')` 将新路由添加到堆栈导航器。
 - `this.props.navigation.goBack();` 返回上一个路由(与设备的返回键相同作用) 在Android上，React Navigation会挂接到硬件后退按钮，并goBack()在用户按下它时为您触发该功能
   ，因此其行为与用户期望的一样。
 - `this.props.navigation.popToTop()` 返回到堆栈中的第一个路由。
```javascript
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { 
  Text, 
  View, 
  Button,
} from 'react-native';

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
		<Button 
		          title='add screen'
		          onPress={ () => this.props.navigation.push('Details') } // 跳转至DEtails
		        />
		        <Button 
		          title='Go to Home'
		          onPress={ () => this.props.navigation.navigate('Home') } // 返回home路由
		        />
		        <Button 
		          title='Go back'
		          onPress={ () => this.props.navigation.goBack() }  // 返回上一个路由
		        />
		        <Button 
		          title='one'
		          onPress={ () => this.props.navigation.popToTop() }  // 返回第一个路由
		        />
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
		<Button
		  title='Go to detail'
		  onPress={() => this.props.navigation.navigate('Details')}  // 跳到Details路由
		/>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Detailss: DetailsScreen,   // 堆栈导航器上定义路由
  Home: HomeScreen           // 堆栈导航器上定义路由
},{
	initialRouteName: 'Home'   // 初始化的时候要显示的路由
});
```
### 路由的生命周期


待整理..




### 路由的参数传递.
 - `this.props.navigation.navigate('Details', {})` 第二个参数就是要传递的参数。
 - `this.props.navigation.getParam('name', 'NO-ID')` 接收参数，第一个参数是要接收的`key`
还可以通过 `this.props.navigation.state.params` 拿到所有的参数
 - `this.props.navigation.setParams({ name: 'Updated!' })` // 更新接收到的值 (把`name:`原值修改为 `Updated!`)

基于原来的例子:
```
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { 
  Text, 
  View, 
  Button,
} from 'react-native';


class HomeScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title='Go to detail'
          onPress={
            () => {
              this.props.navigation.navigate('Details', {
                number: 568,
                name: 'mrceel'
              })  // 第二个参数就是要传递的参数。
              
            }
          }
        />
      </View>
    )
  }
}

class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>
          参数: {JSON.stringify(navigation.state.params)}   //拿到所有的参数
        </Text>
        <Text>
          name:
          {JSON.stringify(navigation.getParam('name', 'default value'))}     // 接收参数
        </Text>
        <Button 
          title='add screen'
          onPress={ () => {this.props.navigation.push('Details', {
            number: Math.floor(Math.random() * 100), // 传递参数
          })} }
        />
		<Button
		  title="Update the title"
		  onPress={() => this.props.navigation.setParams({ name: 'Updated!' })}  // 更新接收到的值
		/>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen
},
{
  initialRouteName: 'Home',
});

// export default createAppContainer(AppNavigator);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
```


传递给navigationOptions函数的参数是具有以下属性的对象：
	
 - `navigation`- 屏幕的导航道具，屏幕的路径为`navigation.state`。
 - `screenProps` -从导航器组件上方传递的道具
 - `navigationOptions` -如果未提供新值，则将使用默认或先前的选项
 - `navigation`在上面的示例中，我们只需要`prop`。但是在某些情况下，您可能想使用`screenPropsor` `navigationOptions`。

### 调整标题样式
关键性能用途：`headerStyle`，`headerTintColor`，和`headerTitleStyle`。
 - `headerStyle`：设置标题行的样式。
 - `headerTintColor`：后退按钮和标题都使用此属性作为其颜色。在下面的示例中，我们将颜色设置为白色（#fff），
	因此后退按钮和标题标题将为白色。
 - `headerTitleStyle`：如果要自定义标题的fontFamily，fontWeight以及其他Text样式属性，可以使用它来完成。

```
class HomeScreen extends Component {

// 定义单个组件的样式
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',  // 设置标题行的背景颜色
    },
    headerTintColor: '#fff',  // 标题颜色
    headerTitleStyle: {
      fontWeight: 'bold', // 其它样式
    },
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title='Go to detail'
          onPress={
            () => {
              this.props.navigation.navigate('Details', {
                number: 568,
                name: 'mrceel'
              })
              
            }
          }
        />


      </View>
    )
  }
}
```
如果要定义多个组件的样式可以直接写在 `createStackNavigator()` 里面。 例如:
```
const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});

```
这样所有的标题头部样式都一样了。 如果想某一个的样式不一样呢？也是可以的。如下：
```
class DetailsScreen extends React.Component {

  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: navigation.getParam('name', 'a test deetails screen'),
      headerStyle: {
        backgroundColor: 'red',  // 样式覆盖
      },
      headerTintColor: 'yellow', // 样式覆盖
    }
  }

  render() {}
}
```
如此便成功了。
那如果我想用图片或者自定义的组件代替标题能行吗？！答案是肯定的。 如下:
```
// 创建一个图片'组件'   (自定义组件) 
class ImageTitle extends Component {
  render(){
    return(
      <Image 
        source={require('./source/img/title.jpg')}
        style={{ width: 30, height: 30 }}
      />
    )
  }
}

class HomeScreen extends Component {

  static navigationOptions = {
    headerTitle: () => <ImageTitle />,   // 直接使用即可
	headerRight: () => <Button onPress={() => alert('This is a button!')} title="Infos" color="#fff"/>,  // 右边增加按钮
	headerLeft: () => <Button onPress={() => alert('This is a button!')} title="Infos" color="#fff"/>, // 左边增加按钮
	  
  }

  render() {
	  // ....
  }
```
`onNavigationStateChange(prevState, newState, action)`
每次由导航器管理的导航状态更改时都会调用的函数。它接收先前的状态，导航的新状态以及发出状态更改的动作。
默认情况下，它将状态更改打印到控制台。