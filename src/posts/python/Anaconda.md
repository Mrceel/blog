---
title: Anaconda 安装以及使用
date: 2018-08-23 17:52:03
tag: [Python]
category: Python
---
Anaconda安装包地址:https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/
<!-- more -->
conda 的包管理：
例如安装`scipy`
```python
# 安装scipy
conda install scipy
# conda会从从远程搜索scipy的相关信息和依赖项目，对于python 3.4，conda会同时安装numpy和mkl（运算加速的库）
 
# 查看已经安装的packages
conda list
# 最新版的conda是从site-packages文件夹中搜索已经安装的包，不依赖于pip，因此可以显示出通过各种方式安装的包

```
conda的一些常用操作如下：
```python
# 查看当前环境下已安装的包
conda list
 
# 查看某个指定环境的已安装包
conda list -n python34
 
# 查找package信息
conda search numpy
 
# 安装package
conda install -n python34 numpy
# 如果不用-n指定环境名称，则被安装在当前活跃环境
# 也可以通过-c指定通过某个channel安装
 
# 更新package
conda update -n python34 numpy
 
# 删除package
conda remove -n python34 numpy
```
前面已经提到，conda将conda、python等都视为package，因此，完全可以使用conda来管理conda和python的版本，例如
```python
# 更新conda，保持conda最新
conda update conda
 
# 更新anaconda
conda update anaconda
 
# 更新python
conda update python
# 假设当前环境是python 3.4, conda会将python升级为3.4.x系列的当前最新版本
```
补充：如果创建新的python环境，比如3.4，运行conda create -n python34 python=3.4之后，conda仅安装python 3.4相关的必须项，如python, pip等，如果希望该环境像默认环境那样，安装anaconda集合包，只需要：
```
# 在当前环境下安装anaconda包集合
conda install anaconda
 
# 结合创建环境的命令，以上操作可以合并为
conda create -n python34 python=3.4 anaconda
# 也可以不用全部安装，根据需求安装自己需要的package即可
```

* 设置国内镜像 *
如果需要安装很多packages，你会发现conda下载的速度经常很慢，因为Anaconda.org的服务器在国外。所幸的是，清华TUNA镜像源有Anaconda仓库的镜像，我们将其加入conda的配置即可：
```python
# 添加Anaconda的TUNA镜像
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
# TUNA的help中镜像地址加有引号，需要去掉
 
# 设置搜索时显示通道地址
conda config --set show_channel_urls yes
```
执行完上述命令后，会生成~/.condarc(Linux/Mac)或C:UsersUSER_NAME.condarc文件，记录着我们对conda的配置，直接手动创建、编辑该文件是相同的效果。(如果是在清华镜像下载的安装包好像是不用配置这个，因为他会自动配置好)

在Anaconda Prompt中利用Anaconda创建一个python3.5的环境，环境名称为tensorflow ，输入下面命令：
```
conda create -n tensorflow python=3.5
```

假设我们需要安装Python 3.4，此时，我们需要做的操作如下：
```python
# 创建一个名为python34的环境，指定Python版本是3.4（不用管是3.4.x，conda会为我们自动寻找3.4.x中的最新版本）
conda create --name python34 python=3.4
 
# 安装好后，使用activate激活某个环境
activate python34 # for Windows
source activate python34 # for Linux & Mac
# 激活后，会发现terminal输入的地方多了python34的字样，实际上，此时系统做的事情就是把默认2.7环境从PATH中去除，再把3.4对应的命令加入PATH
 
# 此时，再次输入
python --version
# 可以得到`Python 3.4.5 :: Anaconda 4.1.1 (64-bit)`，即系统已经切换到了3.4的环境
 
# 如果想返回默认的python 2.7环境，运行
deactivate # for Windows ()
source deactivate python34 # for Linux & Mac
 
# 删除一个已有的环境
conda remove --name python34 --all
```

本文整理于`https://blog.csdn.net/accumulate_zhang/article/details/77371657`