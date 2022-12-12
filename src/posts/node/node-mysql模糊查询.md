---
title: node(express) + mysql 实现模糊查询
date: 2017-05-4 20:22:38
tag: [Node]
category: Node
---
<center>** Node + express + mysql + Navicat for mysql 实现模糊查询 **</center>
<!-- more -->
仓库地址 -> [点击这里](https://github.com/Mrceel/VagueQuery.git)

话不多说直接上代码..
app.js
```
const express = require('express');
// const bodyparser = require('body-parser');
const mysql = require('mysql');
const app = express();
const router = express.Router();

app.use(express.urlencoded({}));

let pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'root',
	database:'query',
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

//这里是 /login  前端请求地址为 http://localhost:8001/login
app.get('/login',(req,res)=>{
	var value = req.query.val;
	pool.query(`SELECT * FROM students where name like '%${value}%'`, (qerr,vals,fields)=>{
		let rows = JSON.stringify(vals);
		res.send(rows)
	})	
})

app.use(express.static('./'))

app.listen(8001,() => {
	console.log('ok');
})
```