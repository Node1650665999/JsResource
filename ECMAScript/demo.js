

/*********let 和 const***************/
	//let 申明的变量只在代码块有效 (以前的闭包问题)
	/*
	 * 
		var a = [];
		for (let i = 0; i < 10; i++) {
		  a[i] = function () {
		    console.log(i);
		  };
		}
		console.log(i); //i is not defined var申明的就可以
		a[6](); // 6
		
		var a = [];
		for (var i = 0; i < 10; i++) {
		  a[i] = function () {
		    console.log(i);
		  };
		}
		a[6](); // 10
		
	*/

	//在代码块内，使用 let 命令声明变量之前，该变量都是不可用的
		/*var tmp = 123;
		if (true) {
		  tmp = 'abc'; 
		  let tmp;
		  console.log(tmp); //undefined
		}
		console.log(tmp);  //123*/
	
	//let 申明的变量只在当前代码快中有用
		/*function f1() {
		  var n = 5;
		  if (true) {
		      var n = 10;
		  }
		  console.log(n); // 10
		}
		function f1() {
		  var n = 5;
		  if (true) {
		      var n = 10;
		  }
		  console.log(n); // 10
		}*/


	/*const 命令
	  一旦声明，常量的值就不能改变,常量智能申明一次。常量只读*/
	/*
		const PI = 3.1415;
		//PI = 3;  			// "PI" is read-only
		//const PI = 3.1;   //Duplicate declaration "PI"
		console.log(PI);  //3.1415
		
		if (true) {
		  console.log(MAX); // undefined
		  const MAX = 5;
		}*/
	
	//const 声明的常量，也与 let 一样不可重复声明。
		/*var message = "Hello!";
		let age = 25;
		//const message = "Goodbye!";  //Duplicate declaration "message"
		const age = 30;                //Duplicate declaration "age"*/
	
	//es6中函数本身的作用域，在其所在的块级作用域之内
		/*function f() { console.log('I am outside!'); }
			(function () {
			if(false) {
			    // 重复声明一次函数f
			    function f() { console.log('I am inside!'); }
			}
			
			f();  //I am outside!
		}());*/
	
	//冻结对象
	/*const foo = Object.freeze({}); 
		foo.name = 'aaa';
		console.log(foo); 		//Can't add property name, object is not extensible*/
		/*const foo = {}; 
		foo.name = 'aaa';
		console.log(foo); 		//Object {name: "aaa"}*/
	
	//ES6 规定，var 命令和 function 命令声明的全局变量，属于全局对象的属性；
	//let 命令、const 命令、class 命令声明的全局变量，不属于全局对象的属性。
		/*var a = 1;
		console.log(window.a);  //1
		let b = 1;
		console.log(window.b);  //undefined*/
	
/***************************变量的解构赋值***************************************/
	//数组
	//只要等号两边的模式相同，并且按顺序取值，左边的变量就会被赋予对应的值
		/*var [a, b, c] = [1, 2, 3];  //es6给变量赋值
		console.log(a); //1
		let [,,name] = ['a','b','tcl'];
		console.log(name); //tcl
		let [head, ...tail] = [1, 2, 3, 4];
		console.log(tail);  //[2,3,4]*/
	//不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组
		/*let [a, [b], d] = [1, [2, 3], 4];
		console.log(b); //2
		console.log(d);  //4*/
	//解构的默认值
		/*let [foo = 123] = [789];
		console.log(foo);  //789
		let [foo = 123] = [];
		console.log(foo); //123*/
	//对象的解构赋值，变量必须与属性同名，按属性取值,才能取到正确的值
		/*let { foo, bar } = { foor: "aaa", bar: "bbb" };
		console.log(foo,bar);  //undefined "bbb"*/
	//如果变量名与属性名不一致，必须写成下面这样
		/*let { foo: baz } = { foo: "aaa", bar: "bbb" };
		console.log(baz);  //aaa*/
	//对象的解构也可以指定默认值
		/*let {x = 3} = {};
		console.log(x);*/
	//如果要将一个已经声明的变量用于解构赋值，必须非常小心。
		/*var x;
		{x} = {x:1};
		console.log(x);  //Unexpected token*/
		
		/*let {x} = {x:1};
		console.log(x); //1*/
	//使用对象/模块的方法
//		let { log, sin, cos } = Math;    //math可以看成一个模块
//		console.log(sin(1));
		

/***************************************字符串扩展********************************************************/
	/*var str = "吉";
	console.log(str.length,str.charCodeAt(0),str.codePointAt(0));  //返回指定位置处的unicode值 1 21513 21513
	console.log(String.fromCharCode(0x20BB7),String.fromCodePoint(0x20BB7)); //解析unicode值为对应的字符 ஷ 𠮷
		*/
	
	//正则表达式
		/*var str = '吉';
		console.log(/^.$/u.test(str), /^.$/.test(str));  //true， true	对于码点大于 0xFFFF 的 Unicode 字符，点字符不能识别，必须加上 u 修饰符
		console.log(/\u{61}/.test('a'),/\u{61}/u.test('a')); // false ,true 使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上 u 修饰符，才能识别。
		console.log(/𠮷{2}/.test('𠮷𠮷'),/𠮷{2}/u.test('𠮷𠮷'));//	false,true 使用 u 修饰符后，所有量词都会正确识别大于码点大于 0xFFFF 的 Unicode 字符
		console.log('吉吉'.length);*/
	
	//模板字符串（反引号）
	//多行文本不再报错，如果在模板字符串中需要使用反引号，则前面要用反斜杠转义 var greeting = `\`Yo\` World!`;
	//		console.log(`
	//			aaa
	//		`);
	//	模板字符串中嵌入变量和函数，需要将变量名和函数调用写在${}之中。
	/*	var user = {name : 'asd'};
		function test(){return 123};
		console.log("name is " + user.name, `name is ${user.name}`, `func is ${test()}`); 
		//name is asd name is asd
	//String.raw 方法，往往用来充当模板字符串的处理函数,也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有 raw 属性的对象
		console.log(String.raw`Hi\n${2+3}!`);
		console.log(String.raw({ raw: 'test' }, 0, 1, 2));*/
		
		
/****************************************数值扩展***********************************************************************/
	/*console.log(0b111110111 === 503,0o767 === 503);  //0b二进制 0o八进制
	console.log(Number.isFinite(NaN),Number.isNaN('15'),Number.parseInt('12.30'),Number.parseFloat('12.30')); //false false 12 12.3
	console.log(Number.isInteger('15'),Number.isInteger(15),Number.isInteger(15.0),Number.isInteger(15.1),Number.isInteger(true)); //false true true false false
	console.log(Math.clz32(8),Math.imul(2,3)); //32位表示的8的二进制前导零为28个      28 6*/
	
	
/*****************************************数组扩展************************************************************************/
	//Array.from()
		/*//转换为数组(将dom集合转换为数组),只有两种可以转换--类似数组的对象（array-like object）和可遍历（iterable）的对象
			let p = document.querySelectorAll("p");
			Array.from(p).forEach(function(ele){  //只有将这个对象转为真正的数组,才能使用 forEach
				console.log(ele);     
			});
		//任何有length属性的对象都可以通过from方法转换为数组
			var arr = Array.from({ 0: "a", 1: "b", 2: "c", length: 3 });
			arr.forEach(function(ele){
				console.log(ele);  // a b c
			});
			var arr = Array.from({ name: "a", age: "b", length: 2 });
			arr.forEach(function(ele){
				console.log(ele);  //undefined undefined (没有转换成功)
			});
		//from还可以接受第二个参数，类似于数组的map方法
			console.log(Array.from([1,2,3], x => x%2==0));   //[false, true, false]
		*/
		
	//Array.of()
		//将一组值转换为数组
			/*console.log(Array.of(1,1,1));  //[1, 1, 1]
		//模拟实现转换为数组
			function ArrayOf(){
				return [].slice.call(arguments);
			}
			console.log(ArrayOf('m',1)); //['m', 1]*/
			
	/*//find() 用于找出第一个符合条件的数组成员然后返回。它的参数是一个回调函数
			console.log([1, 4, -5, 10].find((n) => n < 0));  //-5
			
	//findIndex() 找出第一个符合条件的元素的位置，如果没有找到返回-1
			console.log([1, 4, -5, 10].findIndex((n) => n < 0)); //2
			
	//fill(value[, start, end]) 给定的value去填充一个数组从 start位置开始，end位置结束
			console.log([,,].fill(1)); // [1,1]*/
			
	//数组的遍历 entries()对键值遍历,keys()对键名遍历,values()对键值遍历
			/*for (let index of['a', 'b'].keys()) {
				console.log(index); //0,1
			}
			for (let elem of['a', 'b'].values()) {
				console.log(elem); // a, b    经测试报错
			}
			for (let [index, elem] of['a', 'b'].entries()) {
				console.log(index, elem); // 0 "a"  1 "b"
			}*/
	//includes()  判断数组是否含有特定值
			//console.log([1,2,3].includes(2),[1,2,3].includes(NaN)); //true false
	//数组推倒   经测试报错
			/*var a1 = [1, 2, 3, 4];
			var a2 = [for (i of a1) i * 2];
			console.log(a2);*/
			
	
/*********************************************对象扩展*********************************************************/
	//属性的简洁表示法
/*			function getPoint() {
				var x = 1;
				var y = 10;
				return {x, 	y};  //类似于 {x:1 , y:10}
			}
			console.log(getPoint()); //Object {x: 1, y: 10}*/
	//Object.is(val, val2) 比较两个值是否相等 注意： -0 不等于 +0 ，NaN等于自身
			//console.log(Object.is(-0, +0), Object.is(NaN, NaN));  //false, true
	//Object.assign(target, rs1 ,rs2[,...rsn])对象合成,类似于jquery的$.extend() ps:Object.assign(),会忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
			//console.log(Object.assign({},{a:1},{b:2}));
	// proto属性
		//Object.setPrototypeOf 用来设置一个对象的 prototype 对象(对象.__proto__),这和继承不一样
		    /*var a = {}, b = {name:12};
			Object.setPrototypeOf(a, b);  //等同于 var obj = Object.create(proto);  a.__proto__ = b;
			console.log(a.__proto__,a.prototype); //{name: 12} 	undefined(对象没有prototype属性)
		//Object.getPrototypeOf()用于读取一个对象的 prototype 对象
			var a = {}, b = {name:12};
			Object.setPrototypeOf(a, b);
			console.log(Object.getPrototypeOf(a));  //获取a.__proto__属性值*/
	//属性枚举  返回指定对象所有自身属性（非继承属性）的描述对象
			//let obj = { foo: 'asd' };
			//console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));  //{value: "asd", writable: true, enumerable: true, configurable: true}
	//属性遍历
			/*for...in 循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）
			Object.keys(obj) 				返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性)
			Object.getOwnPropertyNames(obj) 返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）
			Reflect.ownKeys(obj) 			返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。
			Object.getOwnPropertySymbols 	返回一个数组，包含对象自身的所有Symbol属性。 */
		// Object.keys() (键遍历)
			//var obj = { foo: "bar", baz: 42 };
			//console.log(Object.keys(obj));  //["foo", "baz"]
		// Object.values() (值遍历) ，Object.values() (键值遍历)
			/*let {keys, values, entries} = Object;
			let obj = { a: 1, b: 2, c: 3 };
			for (let key of keys(obj)) {
			  console.log(key); // 'a', 'b', 'c'
			}
			for (let value of values(obj)) {
			  console.log(value); // 1, 2, 3
			}
			for (let [key, value] of entries(obj)) {
			  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
			}*/
	//对象的扩展运算符  (...)	
		//变量z是Rest解构赋值所在的对象。它获取等号右边的所有尚未读取的键（a和b），将它们和它们的值拷贝过来
			//let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
			//console.log(x,y,z);
/***************************************************Symbol**************************************************************************/
	//Symbol,新的数据类型，解决属性重名问题
			//let b = Symbol();
			//console.log(typeof b);  //symbol,注意前面不能用new关键字
	//Symbol值作为属性,赋值时不能用.,Symbol值必须放在方括号之中
			//var a = {};
			//a[b] = 'Hello!';  
	//Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值。
			/*var obj = {};
			var a = Symbol('a');
			var b = Symbol('b');
			obj[a] = 'Hello';
			obj[b] = 'World';
			var objectSymbols = Object.getOwnPropertySymbols(obj);
			console.log(objectSymbols);  //[Symbol(a), Symbol(b)]*/
	// Symbol遍历
			/*var obj = {};
			var foo = Symbol("foo");
			Object.defineProperty(obj, foo, {
				value: "foobar",
			});
			for (var i in obj) {
				console.log(i); // 无输出
			}
			console.log(Object.getOwnPropertyNames(obj)); //[]
			console.log(Object.getOwnPropertySymbols(obj)); //[Symbol(foo)]*/
	//Symbol.for(),Symbol.keyFor()
			/*Symbol.for("bar") === Symbol.for("bar");	//true
			Symbol("bar") === Symbol("bar");			//false
			var s1 = Symbol.for("foo");
			Symbol.keyFor(s1) // "foo" ,获取Symbol.for()注册的Symbol属性*/
/*********************************Proxy 和 Reflect******************************************************************************************************/
//			var handler = {
//				get: function(target, name) {
//					if (name === 'prototype') {
//						return Object.prototype;
//					}
//					return 'Hello, ' + name;
//				},
//				apply: function(target, thisBinding, args) {
//					return args[0];
//				},
//				construct: function(target, args) {
//					return {
//						value: args[1]
//					};
//				}
//			};
//			var fproxy = new Proxy(function(x, y) {
//				return x + y;
//			}, handler);
//			console.log(fproxy(1, 2)); // 1
//			new fproxy(1, 2) // {value: 2}
//			fproxy.prototype === Object.prototype // true
//			fproxy.foo // "Hello, foo"

/*********************************二进制数组******************************************************************************************************/
			/*var buffer = new ArrayBuffer(8);  //分配8个字节的空间  buffer.byteLength = 8
			//一个字节有8位，按照32位视图，一个数组元素占字节为(32/8)4个字节 ,所以 数组元素个数 = buffer.byteLength/(32/8) = 2，换算关系下同
			var i32 = new Int32Array(buffer);  
			console.log(i32);  //[0, 0]
			var i16 = new Int16Array(buffer);  
			console.log(i16);   //[0,0,0,0]
			var i8 = new Int8Array(buffer); 
			console.log(i8); //[0,0,0,0,0,0,0,0]
			
			var buffer = new ArrayBuffer(8);
			var i16Offset = new Int16Array(buffer, byteOffset, length)  //byteOffset: 从第几个字节开始(要计算元素占的字节)， length: 读取的数组元素的个数
			var i16Offset = new Int16Array(buffer, 2,2);  //一个字符占两个字节，如果byteoffset不是2的倍数，则切割不正确会报错
			console.log(i16Offset); //[0, 0]
			var i16Offset = new Int16Array(buffer, 2,3);
			console.log(i16Offset); //[0, 0, 0]*/
			
//			var buffer = new ArrayBuffer(24);
//			var dv = new DataView(buffer);
//			
//			// 从第1个字节读取一个8位无符号整数
//			dv.setUint8(0,25);
//			dv.setUint8(1,22);
//			var v1 = dv.getUint8(0,2);
//			console.log(v1);
//			// 从第2个字节读取一个16位无符号整数
//			var v2 = dv.getUint16(1);
//			console.log(v2);
//			// 从第4个字节读取一个16位无符号整数
//			var v3 = dv.getUint16(3);
//			console.log(v3);