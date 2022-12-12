---
title: node+mySQL接口
date: 2017-03-29 09:48:13
tag: [ Node]
category: Node
---

<center> 

# 数据库
</center>
<!-- more -->
Navicat for mysql 建表写入数据

# node.js

app.js
```javascript
const express = require('express');
const mysql = require('mysql');
const app = express();

//建立连接
const pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'dataBaseName',
	port:3306
})

// 设置为可跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 前端请求地址为  http://localhost:8001/login
app.get('/login',(req,res)=>{
	pool.query(`SELECT * FROM login`, (qerr,vals,fields)=>{
		let rows = JSON.stringify(vals);
		res.send(rows)
	})	
})

app.listen(8001,() => {
	console.log('ok');
})
```