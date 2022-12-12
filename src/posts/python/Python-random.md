---
title: python-random
date: 2018-08-05 17:52:03
tag: [Python]
category: Python
---
python-random(随机数)
<!-- more -->
```python
random.seed(a=None, version=2)  
# 初始化伪随机数生成器。如果未提供a或者a=None，则使用系统时间为种子。如果a是一个整数，则作为种子。

random.getstate()
# 返回一个当前生成器的内部状态的对象

random.setstate(state)
# 传入一个先前利用getstate方法获得的状态对象，使得生成器恢复到这个状态。

random.getrandbits(k)
# 返回range(0,2**k)之间的一个整数，相当于randrange(0,2**k)

random.randrange(stop)
# 返回range(0,stop)之间的一个整数

random.randrange(start, stop[, step])
# 返回range[start,stop)之间的一个整数，可加step，跟range(0,10,2)类似

random.randint(a, b)
# 返回range[a,b]之间的一个整数，等价于然的range(a,b+1)

random.choice(seq)
# 从非空序列seq中随机选取一个元素。如果seq为空则弹出 IndexError异常。

random.choices(population, weights=None, *, cum_weights=None, k=1)
# 3.6版本新增。从population集群中随机抽取K个元素（可重复）。
# weights是相对权重列表，cum_weights是累计权重，两个参数不能同时存在。

random.shuffle(x[, random])
# 随机打乱序列x内元素的排列顺序。只能针对可变的序列，对于不可变序列，请使用下面的sample()方法。

random.sample(population, k)
# 从population样本或集合中随机抽取K个不重复的元素形成新的序列。
# 常用于不重复的随机抽样。返回的是一个新的序列，不会破坏原有序列。
# 要从一个整数区间随机抽取一定数量的整数，请使用sample(range(10000000), k=60)类似的方法，
# 这非常有效和节省空间。如果k大于population的长度，则弹出ValueError异常。

random.random()
# 返回一个介于左闭右开[0.0, 1.0)区间的浮点数

random.uniform(a, b)
# 返回一个介于a和b之间的浮点数。如果a>b，则是b到a之间的浮点数。这里的a和b都有可能出现在结果中。

random.triangular(low, high, mode)
# 返回一个low <= N <=high的三角形分布的随机数。参数mode指明众数出现位置。

random.betavariate(alpha, beta)
# β分布。返回的结果在0~1之间

random.expovariate(lambd)
# 指数分布

random.gammavariate(alpha, beta)
# 伽玛分布

random.gauss(mu, sigma)
# 高斯分布

random.lognormvariate(mu, sigma)
# 对数正态分布

random.normalvariate(mu, sigma)
# 正态分布

random.vonmisesvariate(mu, kappa)
# 卡帕分布

random.paretovariate(alpha)
# 帕累托分布

random.weibullvariate(alpha, beta)
# 威布尔分布

```

实例：

```
 >>> random()                             # 随机浮点数:  0.0 <= x < 1.0
0.37444887175646646
 
>>> uniform(2.5, 10.0)                   # 随机浮点数:  2.5 <= x < 10.0
3.1800146073117523
 
 
>>> randrange(10)                        # 0-9的整数：
7
 
>>> randrange(0, 101, 2)                 # 0-100的偶数
26
 
>>> choice(['win', 'lose', 'draw'])      # 从序列随机选择一个元素
'draw'
 
>>> deck = 'ace two three four'.split()
>>> shuffle(deck)                        # 对序列进行洗牌，改变原序列
>>> deck
['four', 'two', 'ace', 'three']
 
>>> sample([10, 20, 30, 40, 50], k=4)    # 不改变原序列的抽取指定数目样本，并生成新序列
[40, 10, 50, 30]
 
 
>>> # 6次旋转红黑绿轮盘(带权重可重复的取样)，不破坏原序列,weight[18,18,2]
>>> choices(['red', 'black', 'green'], [18, 18, 2], k=6)
['red', 'green', 'black', 'black', 'red', 'black']
 
>>> # 德州扑克计算概率Deal 20 cards without replacement from a deck of 52 playing cards
>>> # and determine the proportion of cards with a ten-value
>>> # (a ten, jack, queen, or king).
>>> deck = collections.Counter(tens=16, low_cards=36)
>>> seen = sample(list(deck.elements()), k=20)
>>> seen.count('tens') / 20
0.15
 
>>> # 模拟概率Estimate the probability of getting 5 or more heads from 7 spins
>>> # of a biased coin that settles on heads 60% of the time.'H'的概率是0.6，“T”的概率是1-0.6
>>> trial = lambda: choices('HT', cum_weights=(0.60, 1.00), k=7).count('H') >= 5
>>> sum(trial() for i in range(10000)) / 10000
0.4169
 
>>> # Probability of the median of 5 samples being in middle two quartiles
>>> trial = lambda : 2500 <= sorted(choices(range(10000), k=5))[2]  < 7500
>>> sum(trial() for i in range(10000)) / 10000
0.7958
 
>>> from statistics import mean
>>> from random import choices
 
>>> data = 1, 2, 4, 4, 10
>>> means = sorted(mean(choices(data, k=5)) for i in range(20))  # mean是求平均
>>> print(f'The sample mean of {mean(data):.1f} has a 90% confidence '
      f'interval from {means[1]:.1f} to {means[-2]:.1f}')  # 这里的f用法
```