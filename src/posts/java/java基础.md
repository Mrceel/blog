---
title: java基础
date: 2018-04-01 09:39:32
tag: [Java]
category: Java
---

<center>

# Hello World
</center>
<!-- more -->
javascript
```javascript
console.log('hello world')
```

创建文件 HelloWorld.java(文件名需与类名一致), 代码如下：
java
```
public class HelloWorld {
	public static void main(String [] srgs) {
		System.out.println("hello world")
	}
}
```
注：String args[] 与 String[] args 都可以执行，但推荐使用 String[] args，这样可以避免歧义和误读

# Java中的对象

现在让我们深入了解什么是对象。看看周围真实的世界，会发现身边有很多对象，车，狗，人等等。所有这些对象都有自己的状态和行为。

拿一条狗来举例，它的状态有：名字、品种、颜色，行为有：叫、摇尾巴和跑。

对比现实对象和软件对象，它们之间十分相似。

软件对象也有状态和行为。软件对象的状态就是属性，行为通过方法体现。

在软件开发中，方法操作对象内部状态的改变，对象的相互调用也是通过方法来完成。

# Java中的类

类可以看成是创建Java对象的模板。
通过下面一个简单的类来理解下Java中类的定义：
```
public class Dog{
  String breed;
  int age;
  String color;
  void barking(){
  }
 
  void hungry(){
  }
 
  void sleeping(){
  }
}
```
一个类可以包含以下类型变量：

> * 局部变量：在方法、构造方法或者语句块中定义的变量被称为局部变量。变量声明和初始化都是在方法中，方法结束后，变量就会自动销毁。
> * 成员变量：成员变量是定义在类中，方法体之外的变量。这种变量在创建对象的时候实例化。成员变量可以被类中方法、构造方法和特定类的语句块访问。
> * 类变量：类变量也声明在类中，方法体之外，但必须声明为static类型。

一个类可以拥有多个方法，在上面的例子中：barking()、hungry()和sleeping()都是Dog类的方法。

# 创建对象
对象是根据类创建的。在Java中，使用关键字new来创建一个新的对象。创建对象需要以下三步：

+ **  声明：**声明一个对象，包括对象名称和对象类型。
+ **实例化：**使用关键字new来创建一个对象。
+ ** 初始化：**使用new创建对象时，会调用构造方法初始化对象。
下面是一个创建对象的例子：
```
public class Puppy {
	public Puppy(String name) {
		//这个构造器仅有一个参数：name
		System.out.println("小狗的名字是:" + name);
	}
	// 下面的语句将创建一个Puppy对象
	public static void main(String [] srgs) {
		Puppy myPuppy = new Puppy("Dog");
	}
}
```
编译并运行上面的程序，会打印出下面的结果：
```
小狗的名字是 : Dog
```
在来看下javascript的:
```javascript
function Puppy(name){
	this.name = name;
	this.getName = ()=>{
		console.log('狗狗的名字是:' + this.name)
	}
};
const Dog = new Puppy('狗狗');

Dog.getName() // 狗狗的名字是: 狗狗
```

# 访问实例变量和方法

通过已创建的对象来访问成员变量和成员方法，如下所示：
```
/* 实例化对象 */
ObjectReference = new Constructor();
/* 访问类中的变量 */
ObjectReference.variableName;
/* 访问类中的方法 */
ObjectReference.MethodName();
```

## 实例

下面的例子展示如何访问实例变量和调用成员方法：
```
public class Puppy{
   int puppyAge;
   public Puppy(String name){
      // 这个构造器仅有一个参数：name
      System.out.println("小狗的名字是 : " + name ); 
   }
 
   public void setAge( int age ){
       puppyAge = age;
   }
 
   public int getAge( ){
       System.out.println("小狗的年龄为 : " + puppyAge ); 
       return puppyAge;
   }
 
   public static void main(String []args){
      /* 创建对象 */
      Puppy myPuppy = new Puppy( "tommy" );
      /* 通过方法来设定age */
      myPuppy.setAge( 2 );
      /* 调用另一个方法获取age */
      myPuppy.getAge( );
      /*你也可以像下面这样访问成员变量 */
      System.out.println("变量值 : " + myPuppy.puppyAge ); 
   }
}

```
编译并运行上面的程序，产生如下结果：
```
小狗的名字是 : tommy
小狗的年龄为 : 2
变量值 : 2
```
# Java 基本数据类型
* Java语言提供了八种基本类型。六种数字类型（四个整数型，两个浮点型），一种字符类型，还有一种布尔型。
- byte
	- byte 数据类型是8位、有符号的，以二进制补码表示的整数；
	- 最小值是 -128（-2^7）；
	- 最大值是 127（2^7-1）；
	- byte 类型用在大型数组中节约空间，主要代替整数，因为 byte 变量占用的空间只有 int 类型的四分之一；
	- 例子：byte a = 100，byte b = -50。
- short
	- short 数据类型是 16 位、有符号的以二进制补码表示的整数
	- 最小值是 -32768（-2^15）；
	- 最大值是 32767（2^15 - 1）；
	- Short 数据类型也可以像 byte 那样节省空间。一个short变量是int型变量所占空间的二分之一；
- int
	- int 数据类型是32位、有符号的以二进制补码表示的整数；
	- 最小值是 -2,147,483,648（-2^31）；
	- 最大值是 2,147,483,647（2^31 - 1）；
	- 一般地整型变量默认为 int 类型；
	- 例子：int a = 100000, int b = -200000。
- long
	- long 数据类型是 64 位、有符号的以二进制补码表示的整数；
	- 最小值是 -9,223,372,036,854,775,808（-2^63）；
	- 最大值是 9,223,372,036,854,775,807（2^63 -1）；
	- 这种类型主要使用在需要比较大整数的系统上；
	- 例子： long a = 100000L，Long b = -200000L。
	- "L"理论上不分大小写，但是若写成"l"容易与数字"1"混淆，不容易分辩。所以最好大写。
- float：
	- float 数据类型是单精度、32位、符合IEEE 754标准的浮点数；
	- float 在储存大型浮点数组的时候可节省内存空间；
	- 默认值是 0.0f；
	- 浮点数不能用来表示精确的值，如货币；
	- 例子：float f1 = 234.5f。
- double：
	- double 数据类型是双精度、64 位、符合IEEE 754标准的浮点数；
	- 浮点数的默认类型为double类型；
	- double类型同样不能表示精确的值，如货币；
	- 默认值是 0.0d；
	- 例子：double d1 = 123.4。
- boolean：
	- boolean数据类型表示一位的信息；
	- 只有两个取值：true 和 false；
	- 这种类型只作为一种标志来记录 true/false 情况；
	- 默认值是 false；
	- 例子：boolean one = true。
- char：
	- har类型是一个单一的 16 位 Unicode 字符；
	- 最小值是 \u0000（即为0）；
	- 最大值是 \uffff（即为65,535）；
	- char 数据类型可以储存任何字符；
	- 例子：char letter = 'A';。
	
对于数值类型的基本类型的取值范围，我们无需强制去记忆，因为它们的值都已经以常量的形式定义在对应的包装类中了。
```
int.MIN_VALUE //最小值
int.MAX_VALUE //最大值
```

	
# 强制类型转换
1. 条件是转换的数据类型必须是兼容的。

2. 格式：(type)value type是要强制类型转换后的数据类型 实例：

实例
```
public class QiangZhiZhuanHuan{
    public static void main(String[] args){
        int i1 = 123;
        byte b = (byte)i1;//强制类型转换为byte
        System.out.println("int强制类型转换为byte后的值等于"+b);
    }
}
```
运行结果：
```
int强制类型转换为byte后的值等于123
```

# 自动类型转换
 ** 整型、实型（常量）、字符型数据可以混合运算。运算中，不同类型的数据先转化为同一类型，然后进行运算。 **

转换从低级到高级。
```
低  ------------------------------------>  高

byte,short,char—> int —> long—> float —> double 
```

## 数据类型转换必须满足如下规则：

1. 不能对boolean类型进行类型转换。

2. 不能把对象类型转换成不相关类的对象。

3. 在把容量大的类型转换为容量小的类型时必须使用强制类型转换。

4. 转换过程中可能导致溢出或损失精度，例如：
```
int i =128;   
byte b = (byte)i;
因为 byte 类型是 8 位，最大值为127，所以当 int 强制转换为 byte 类型时，值 128 时候就会导致溢出。
```
5. 浮点数到整数的转换是通过舍弃小数得到，而不是四舍五入，例如：
```
(int)23.7 == 23;        
(int)-45.89f == -45
```

## Java 常量
常量在程序运行时是不能被修改的。

在 Java 中使用 final 关键字来修饰常量，声明方式和变量类似：

final double PI = 3.1415927;
虽然常量名也可以用小写，但为了便于识别，通常使用大写字母表示常量。

## 实例变量

- 实例变量声明在一个类中，但在方法、构造方法和语句块之外；
- 当一个对象被实例化之后，每个实例变量的值就跟着确定；
- 实例变量在对象创建的时候创建，在对象被销毁的时候销毁；
- 实例变量的值应该至少被一个方法、构造方法或者语句块引用，使得外部能够通过这些方式获取实例变量信息；
- 实例变量可以声明在使用前或者使用后；
- 访问修饰符可以修饰实例变量；
- 实例变量对于类中的方法、构造方法或者语句块是可见的。一般情况下应该把实例变量设为私有。通过使用访问修饰符可以使实例变量对子类可见；
- 实例变量具有默认值。数值型变量的默认值是0，布尔型变量的默认值是false，引用类型变量的默认值是null。变量的值可以在声明时指定，也可以在构造方法中指定；
- 实例变量可以直接通过变量名访问。但在静态方法以及其他类中，就应该使用完全限定名：ObejectReference.VariableName。

** 实例 **
```
import java.io.*;
public class Employee{
   // 这个实例变量对子类可见
   public String name;
   // 私有变量，仅在该类可见
   private double salary;
   //在构造器中对name赋值
   public Employee (String empName){
      name = empName;
   }
   //设定salary的值
   public void setSalary(double empSal){
      salary = empSal;
   }  
   // 打印信息
   public void printEmp(){
      System.out.println("名字 : " + name );
      System.out.println("薪水 : " + salary);
   }
 
   public static void main(String args[]){
      Employee empOne = new Employee("RUNOOB");
      empOne.setSalary(1000);
      empOne.printEmp();
   }
}
```
以上实例编译运行结果如下:
```
$ javac Employee.java 
$ java Employee
名字 : RUNOOB
薪水 : 1000.0
```

## 类变量（静态变量）

- 类变量也称为静态变量，在类中以static关键字声明，但必须在方法构造方法和语句块之外。
- 无论一个类创建了多少个对象，类只拥有类变量的一份拷贝。
- 静态变量除了被声明为常量外很少使用。常量是指声明为public/private，final和static类型的变量。常量初始化后不可改变。
- 静态变量储存在静态存储区。经常被声明为常量，很少单独使用static声明变量。
- 静态变量在程序开始时创建，在程序结束时销毁。
- 与实例变量具有相似的可见性。但为了对类的使用者可见，大多数静态变量声明为public类型。
- 默认值和实例变量相似。数值型变量默认值是0，布尔型默认值是false，引用类型默认值是null。变量的值可以在声明的时候指定，也可以在构造方法中指定。此外，静态变量还可以在静态语句块中初始化。
- 静态变量可以通过：ClassName.VariableName的方式访问。
- 类变量被声明为public static final类型时，类变量名称一般建议使用大写字母。如果静态变量不是public和final类型，其命名方式与实例变量以及局部变量的命名方式一致。

```
import java.io.*;
 
public class Employee {
    //salary是静态的私有变量
    private static double salary;
    // DEPARTMENT是一个常量
    public static final String DEPARTMENT = "开发人员";
    public static void main(String args[]){
    salary = 10000;
        System.out.println(DEPARTMENT+"平均工资:"+salary);
    }
}
```

# 访问控制修饰符

Java中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。Java 支持 4 种不同的访问权限。

default (即缺省，什么也不写）: 在同一包内可见，不使用任何修饰符。使用对象：类、接口、变量、方法。
private : 在同一类内可见。使用对象：变量、方法。 注意：不能修饰类（外部类）
public : 对所有类可见。使用对象：类、接口、变量、方法
protected : 对同一包内的类和所有子类可见。使用对象：变量、方法。 注意：不能修饰类（外部类）。
# 访问控制和继承

请注意以下方法继承的规则：
父类中声明为 public 的方法在子类中也必须为 public。
父类中声明为 protected 的方法在子类中要么声明为 protected，要么声明为 public，不能声明为 private。
父类中声明为 private 的方法，不能够被继承。

# 非访问修饰符

## static 修饰符

1. 静态变量：
	- static 关键字用来声明独立于对象的静态变量，无论一个类实例化多少对象，它的静态变量只有一份拷贝。 静态变量也被称为类变量。局部变量不能被声明为 static 变量。
2. 静态方法：
	- static 关键字用来声明独立于对象的静态方法。静态方法不能使用类的非静态变量。静态方法从参数列表得到数据，然后计算这些数据。

## final 修饰符
1. final 变量：
	- final 变量能被显式地初始化并且只能初始化一次。被声明为 final 的对象的引用不能指向不同的对象。但是 final 对象里的数据可以被改变。也就是说 final 对象的引用不能改变，但是里面的值可以改变。
	- final 修饰符通常和 static 修饰符一起使用来创建类常量。
2. final 方法:
	- 类中的 final 方法可以被子类继承，但是不能被子类修改。声明 final 方法的主要目的是防止该方法的内容被修改。
3. final 类
	- final 类不能被继承，没有类能够继承 final 类的任何特性。