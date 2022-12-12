---
title: 汉诺塔 -- Python
date: 2018-05-20 17:35:10
tag: [Python]
category: Python
---

最主要的还是要搞明白 递归的意思
<!-- more -->
```
move(3,'A', 'B', 'C')

def move(3,a,b,c):  这里传入参数为 move(3, 'A', 'B', 'C')
    if n==1:
        print(a,'->',c)
    else:
        move(n-1,a,c,b) 改变参数顺序 -> 这里传入参数为 move(2, 'A', 'C', 'B')
		|
		|			
		▼   
		move(n, a, b, c)  参数发生变化: n = 2 a = 'A' b = 'C' c = 'B' 牢记此处参数的值

		if n == 1 : n = 2 条件不成立 不执行

			print(a,'-->',c)
		else :
			move(n-1,a,c,b) 改变参数顺序 -> 这里传入参数为 move(1, 'A', 'B', 'C')
						|
						|
						▼
						move(n, a, b, c) 参数发生变化: n = 1 a = 'A' b = 'B' c = 'C'

						if n == 1 : n = 1 条件成立 执行

							print(a,'-->',c) ① 输出 A --> C .执行完毕,回退
			<--回退完毕-----<-----<------<------<----
			|			else :
			|				move(n-1,a,c,b)
			|				move(1,a,b,c)
			|				move(n-1,b,a,c)
			▼向下执行
			move(1,a,b,c)  n = 2 a = 'A' b = 'C' c = 'B' 
						|
						|
						▼
						move(n, a, b, c) 这里传入参数为 move(1, 'A', 'C', 'B')
						a = 'A' b = 'C' c = 'B'
						if n == 1 : n = 1 条件成立 执行完毕
							print(a,'-->',c) **② 输出 A --> B** .执行完毕,回退
			<--回退完毕-----<-----<------<------<----
			|			else :
			|				move(n-1,a,c,b)
			|				move(1,a,b,c)
			|				move(n-1,b,a,c)
			▼向下执行  n = 2 a = 'A' b = 'C' c = 'B'
			move(n-1,b,a,c) 改变参数顺序 -> 这里传入参数为 move(1, 'C', 'A', 'B')
						|
						|
						▼
						move(n, a, b, c) 这里传入参数为 move(1, 'C', 'A', 'B')
						a = 'C' b = 'A' c = 'B'
						if n == 1 : n = 1 条件成立 执行完毕
							print(a,'-->',c) ③ 输出 C --> B .执行完毕,回退
			<--回退完毕-----<-----<------<------<----
			|			else :
			|				move(n-1,a,c,b)
			|				move(1,a,b,c)
			|				move(n-1,b,a,c)
			▼
		<--------
		|
		▼
        move(1,a,b,c) 参数为: n = 1 a = 'A' b = 'B' c = 'C'  ④ 输出 A --> C 
        move(n-1,b,a,c) 同理 -> 参数变化 执行顺序同上
```

奉上代码:
```python
def move(n,a,b,c):
    if n==1:
        print(a,'->',c)
    else:
        move(n-1,a,c,b)
        move(1,a,b,c)
        move(n-1,b,a,c)
		
move(3,'A', 'B', 'C')
```