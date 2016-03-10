/*
 	typeof undefinde instanceof null	等关键字的问题
 * 
 * */

window.onload=function(){
	//js的数据类型有number，string，Undefined，null,object等，什么样的变量它的数据类型是undefined和null？
	//区别又是什么？


	//1		当调用一个没有定义的变量时程序会报错
//		alert(a);	//如果a在下文的全局定义(var 申明)，会是undefined的，因为变量会提升,
//		注意：提升的是变量的定义而不是变量的值，即使下文给a赋值，这里的a的值还为undefined
//		alert(typeof a);	//undefined
		
		
	//2 	没有赋值的变量，值为undefined，类型也为undefined
//	var a;
//	alert(a);	//undefined
//	alert(typeof a);	//	undefined

//		2.1		赋值为undefined的变量，值为undefined，类型也为undefined
//	var c=undefined;
//	alert(typeof c);	//undefined

	
	//3		值为null的变量，数据类型就Object
//		3.1 将变量的值赋值为null
//		var b=null;
//		alert(b);	//b的值为null
//		alert(typeof b);	//类型为Object
//		3.2 将变量的值赋值为一个空对象
//		var b=new Object();
//		alert(b);	//值是一个对象，[Object,Object]前面的是类型，后面的是对象
//		alert(typeof b);	//类型是对象

	//4		赋值了的变量类型就是它所对应的那个类型
//		var c="asb";
//		alert(typeof c);	//string
//		var a;
//		alert(a+1);		//NAN，这是一个系统常量
//		alert(typeof NaN);	//number	NAN是一个随机数

	//5		堆栈问题，栈中的数据可以共享值，堆中的数据可以共享位置
//		var a=3;
//		var b=3;	//不会再在栈区开辟一块空间，先在栈区查找值3，有的话直接指向了3，如果找不到3，则会自己创建
		
	//6		typeof	数组的类型是对象，函数名是一个函数，加了括号的函数名类型由函数的返回结果决定
/*	function ff(){
		return "htt";
	}
	var a=ff;
	alert(typeof a);	//类型是一个方法 function
	var a=ff();
	alert(typeof a);	//类型是String，类型由函数的返回值决定	
	
	var a=[1,2,3];
		alert(typeof a);	//object
		alert(a[0]); //number
*/


	//7		intanceof 检测表达式是否为指定类的实例
		
		var a=[1,2,p={name:"zhangsan",age:23}];
		alert(a instanceof Array);	//true，a是Array类的一个实例

}
