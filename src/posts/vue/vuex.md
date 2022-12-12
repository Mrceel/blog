---
title: vue项目使用vuex
date: 2019-11-28 12:53:31
tag: [vue]
category: Vue
---
因为要做一个个人作品。也重新捡捡vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
<!-- more -->

## 安装vuex
```
yarn add vuex
```


## 使用
1. 在项目 `src` 目录下新建 `store` 文件夹，并在其中新建 `index.js`文件。
```
// 官方结构目录
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```


2. `store` 文件夹中新建 `modules/bing.js` 文件，`modules` 是存放 `vuex` 模块的。
```
	// bing.js
	
	const state = {
	    imgList: [1,2,3,4,5,6,7,8,9,10],
		img: '123'
	}
	
	const getters = {
	    imgList: state => state.imgList
	}
	
	const actions = {
	    imgList(context){
	        window.console.log(arguments)  // 打印一下看看它都有哪些参数 见下图
	        // 通过输出可以发现他有两个参数
			// 第一个是包含 commit dispatch getters state ...等 (此处的 state getters均为当前模块的state getters)
			// 第二个则是 imgList
			//  官网说明如下
			// Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
			// 因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
			context.commit('imgList', value)
	    },
		img(context){
			//...
		}
	}
	
	const mutations = {
	    imgList(state, value) { // state 是当前模块的state value 是在调用时接收的参数
	        state.imgList = value;
	    }
	}
	
	export default {
	    namespaced: true,  // 启用模块命名空间， 防止命名冲突。
	    state,
	    getters,
	    actions,
	    mutations
	}
	
```


**actions**
* `Action` 函数接受一个与 `store` 实例具有相同方法和属性的 `context` 对象，因此你可以调用 `context.commit` 提交一个 `mutation`，
	或者通过 `context.state` 和 `context.getters` 来获取 `state` 和 `getters`。
* `Action` 不受约束！我们可以在 `action` 内部执行异步操作。
* `Action` 通过 `store.dispatch` 方法触发：
	```
	this.$store.dispatch('imgList')  // 如此便可以调用 bing 模块 actions 中的 imgList 函数。
	```

**mutations**
* `Mutation` 必须是同步函数
* 我自己的理解就是： mutation 就是一个事件注册的地方。在mutation改变数据。通过store.commit()调用提交。
达到修改store（vuex）内部的数据。

2. 写入：

```
	import Vue from 'vue'
	import Vuex from 'vuex'
	import Bing from './modules/bing'

	Vue.use(Vuex);
	const state = {}
	const actions = {}
	const mutations = {}
	
	export default new Vuex.Store({
	    modules: {
			// 模块都放到这里
	        Bing
	    },
	    actions,
	    state,
	    mutations,
	})
```


3. 在项目 `main.js` 中导入 `store/index`
```
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import Axios from 'axios'
import store from './store/index'


Vue.config.productionTip = false
Vue.prototype.$axios = Axios

Vue.use(ElementUI)

new Vue({
  router,
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  render: h => h(App),
}).$mount('#app')

```


4. 现在就可以在别的地方使用了，例如在 `App.vue` 中使用
```javascript
<script>
import Heade from './components/header.vue';

export default {
	name: 'app',
	components: {
		Heade,
	},
	created(){
		this.$axios.get('wwww.baidu.com',{
			params:{
				title: ''
			}
		}).then((res) => {

			this.$store.dispatch('Bing/imgList', ['这', '是', '传', '给', 'imgList', '的', '值'])
			// 这里会掉用vuex bing模块actions中imgList函数。
		}).catch( (error) => {
			window.console.log(error);
		});
	},
	methods: {
		get(){
			// 这样就能拿到imgList的数据了
			return return this.$store.state.Bing.imgList
		}
	}
};
</script>
```


vue单页面应用刷新网页后vuex的state数据丢失的解决方案
1. 产生原因
其实很简单，因为store里的数据是保存在运行内存中的,当页面刷新时，页面会重新加载vue实例，store里面的数据就会被重新赋值。

2. 解决思路
一种是state里的数据全部是通过请求来触发action或mutation来改变

一种是将state里的数据保存一份到本地存储(localStorage、sessionStorage、cookie）中

很显然，第一种方案基本不可行，除非项目很小或者vuex存储的数据很少。而第二种可以保证刷新页面数据不丢失且易于读取。

```javascript
// App.vue
created(){
	//在页面加载时读取sessionStorage里的状态信息
	let sessionStorage = window.sessionStorage;  
	if (sessionStorage.getItem("store") ) {
		this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
	}

	//在页面刷新时将vuex里的信息保存到sessionStorage里
	window.addEventListener("beforeunload",()=>{
		sessionStorage.setItem("store",JSON.stringify(this.$store.state))
	})
}
```
