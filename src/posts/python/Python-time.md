---
title: python-时间
date: 2018-07-22 17:52:03
tag: [Python]
category: Python
---
python-time
<!-- more -->
当前时间：
```python
localtime = time.localtime(time.time())
print("本地时间为 :", localtime)
# 输出
# 本地时间为 : time.struct_time(tm_year=2016, tm_mon=4, tm_mday=7, tm_hour=10, tm_min=3, tm_sec=27, tm_wday=3, tm_yday=98, tm_isdst=0)
```
`time.localtime()` 不传入参数(时间戳)时， 默认当前时间。 传入指定时间戳时为指定时间。
```python
from datetime import datetime,date,timedelta,time
today = date.today();
print(today);
print(date.fromtimestamp(1457877369.650549));# 将时间戳的日期输出	
print(date.fromordinal(1));# 将天数+最小日期 转换成日期输出    0001-01-01
print(date.min);#0001-01-01
print(date.max);#9999-12-31
print(date.resolution);#1 day, 0:00:00
 
d = date(2017,1,4);
d1 = d.replace(year=2016,day=26);
print(d);# d的值不变，
print(d1);#2016-01-26
print(d.toordinal()); #该日期距离最小日期的天数  
print(d.weekday());#返回当前日期是所在周的第几天  0 表示周一 6 表示周日
print(d.isoweekday());#返回当前日期是所在周的第几天  1 表示周一 7 表示周日
print(d.isocalendar());#返回格式如(year，这一年中的第几周，周几)的元组  
print(d.isocalendar()[1]);#返回该日期是这一年中的第几周
print(d.isocalendar()[2]);#返回该日期是周几
print(d.isoformat());#返回 ISO 8601格式  YYYY-MM-DD
print(d.strftime("%d/%m/%y"));#格式化日期为指定格式
print(d.__format__("%d/%m/%y"));#格式化日期为指定格式

```
--------------------------------
格式化日期
使用 `time` 模块的 `strftime` 方法来格式化日期:

```python
time.strftime(format[, t])
```
实例：
```python
# 格式化成2016-03-20 11:45:39形式
print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) )

print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
 
# 格式化成Sat Mar 28 22:24:24 2016形式
print(time.strftime("%a %b %d %H:%M:%S %Y", time.localtime()) )
  
# 将格式字符串转换为时间戳
a = "Sat Mar 28 22:24:24 2016"
print(time.mktime(time.strptime(a,"%a %b %d %H:%M:%S %Y")) )
```

python中时间日期格式化符号：|----
:----|:----
`%y` 两位数的年份表示（00-99） | `%B` 本地完整的月份名称 
`%Y` 四位数的年份表示（000-9999） | `%c` 本地相应的日期表示和时间表示 
`%m` 月份（01-12） | `%j` 年内的一天（001-366） 
`%d` 月内中的一天（0-31） | `%p` 本地A.M.或P.M.的等价符
`%H` 24小时制小时数（0-23） | `%U` 一年中的星期数（00-53）星期天为星期的开始
`%I` 12小时制小时数（01-12） | `%w` 星期（0-6），星期天为星期的开始
`%M` 分钟数（00=59） | `%W` 一年中的星期数（00-53）星期一为星期的开始
`%S` 秒（00-59） | `%x` 本地相应的日期表示
`%a` 本地简化星期名称 | `%X` 本地相应的时间表示
`%A` 本地完整星期名称 | `%Z` 当前时区的名称
`%b` 本地简化的月份名称 | `%%` %号本身




 
 
 
 
 
 
 
 