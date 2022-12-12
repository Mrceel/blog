---
title: MySQLClient 安装以及使用
date: 2018-09-05 17:35:10
tag: [Python]
category: Python
---
安装MySQLClient pip3安装是会报错
<!-- more -->
所以到下面链接安装相应的版本。例如 python3.6  就下载cp36
https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient
下载完成以后直接进入文件目录`pip3 install <文件名>`进行安装即可~



__MySQLClient 的使用__

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import MySQLdb

# 链接数据库

con = MySQLdb.connect(
        host="localhost",
        port="3306",
        user="root",
        passwd="******",
        db="python_test"
        )
# 获取游标
cur = con.cursor()

# 添加一条数据
cur.execute('insert into test values(34, "timo", "12year", 22)')

# 删除一条数据
cur.execute('delete from test where id="34"')

# 修改数据
cur.execute('update test set id="33" where id="32')

# 查询 返回 1 or 0
print(cur.execute('select * from test where id= "31" '))

#一次插入多条记录
sqli="insert into test values(%s,%s,%s,%s)"
cur.executemany(sqli,[
    ('3','Tom','1 year 1 class','6'),
    ('3','Jack','2 year 1 class','7'),
    ('3','Yaheng','2 year 2 class','7'),
    ])

#cur.close() 关闭游标
cur.close()

#conn.commit()方法在提交事物，在向数据库插入一条数据时必须要有这个方法，否则数据不会被真正的插入
conn.commit()

#conn.close()关闭数据库连接
conn.close()

# executemany()方法可以一次插入多条值，执行单挑sql语句,但是重复执行参数列表里的参数,返回值为受影响的行数。


```


__fetchone()__
```python3
>>> import MySQLdb
>>> conn = MySQLdb.connect(host='localhost',port = 3306,user='root', passwd='123456', db ='test',)
>>> cur = conn.cursor()
>>> cur.execute("select * from student")
5L
>>> cur.fetchone()
(1L, 'Alen', '1 year 2 class', '6')
>>> cur.fetchone()
(3L, 'Huhu', '2 year 1 class', '7')
>>> cur.fetchone()
(3L, 'Tom', '1 year 1 class', '6')
...
>>>cur.scroll(0,'absolute')
```

fetchone()方法可以帮助我们获得表中的数据，可是每次执行cur.fetchone() 获得的数据都不一样，换句话说每执行一次，游标会从表中的第一条数据移动到下一条数据的位置，所以，再次执行的时候得到的是第二条数据。


__fetchmany()__
```python3
#获得表中有多少条数据
aa=cur.execute("select * from student")
print aa

#打印表中的多少数据
info = cur.fetchmany(aa)
for ii in info:
    print ii
```
fetchmany()方法可以获得多条数据，但需要指定数据的条数，通过一个for循环就可以把多条数据打印出来。