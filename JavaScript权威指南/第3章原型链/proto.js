

	window.onload=function(){
//	1	__proto__表示类的父类的原型对象，而prototype表示类的原型对象
		/*//原型对象应用__proto__属性时表示该类的父类的原型对象
		alert(Array.prototype.__proto__==Object.prototype);		//true
		//类的实例应用__proto__属性时，返回当前实例所表示的类的原型对象
		alert((new Array()).__proto__==Array.prototype);	//true*/
//	2获取对象的prototype---------getPrototypeOf();
//		alert(Object.getPrototypeOf(new Array(1,2,3))===Array.prototype);

//	3查看对象是否在指定的对象原型链中----isPrototypeOf(对象gf/f/c);
	/*function GrandFather(){}
	function Father(){}
	function Child(){}
	Father.prototype=new GrandFather();
	Child.prototype=new Father();
	//创建实例
	var gf=new GrandFather();
	var f=new Father();
	var c=new Child();
	//所有对象都可以从Object原型链中找到
//	alert(Object.prototype.isPrototypeOf(GrandFather));
//	alert(Object.prototype.isPrototypeOf(Father));
//	alert(Object.prototype.isPrototypeOf(Child));
	//所有子类都可以在父类的原型链中找到
	alert(GrandFather.prototype.isPrototypeOf(f));
	alert(Father.prototype.isPrototypeOf(c));
	alert(GrandFather.prototype.isPrototypeOf(c));*/
	
//	4查看指定对象是否定义了特殊属性和方法----hasOwnProperty("属性")，属性是一个字符串，用引号括起来
/*	var o=new Object();
	o.prop="exit";
	alert(o.hasOwnProperty("prop"));
	delete o.prop;	//删除属性
	alert(o.hasOwnProperty("prop"));*/
	
//	5为类定义属性 Object.defineProperty(obj,prop,desc);增强了对对象属性的控制
	/*"use strict";
	function Person(){}
	//定义对象的属性
	Object.defineProperty(Person.prototype,"name",{
		value:"tom",
		writable:false,
		enumerable:true,
		configurable:false
	});
	var	p=new Person();
		alert(p.name);	
		try{
			p.name="zhangsan";
		}catch(e){
			e.message;
		}*/
		
//	 6枚举属性  Object.keys(obj)可以枚举出对象的属性
		/*var person={
			name:"zhangsan",
			age:32,
			showInfo:function(){
				alert(this.name+this.age);
			}
		}*/
//		自定义一个静态方法，用来进行兼容
	/*	if(!Object.keys){
			Object.keys=function(obj){
				var arr=new Array();
				for (var prop in obj) {		//属性prop在对象obj中
					//过滤从原型链中继承过来的属性,如果对象有自己的属性，保存到数组中
					if(obj.hasOwnProperty(prop)){
						arr.push(prop);
					}
				}
				return arr;
			};
		}
		alert(Object.keys(person));*/
		
//		7密封对象,不允许添加和删除成员

//		7.1密封对象不允许添加成员preventExtensions(obj),isExtensible(obj)检查是否可以添加新的属性
/*		function Person(name,age){
			this.name=name;
			this.age=age;
			this.getInfo=function(){
				return this.name+this.age;
			}
		}
//		Object.preventExtensions(Person);
//		alert(Object.isExtensible(Person));	//false
		//类添加属性
		//Person.salary=300;
		var p=new Person();
//		实例可以添加属性，因为密封的只是类
//		p.salary=5000;
//		alert(p.salary);	//5000
		//阻止向实例添加属性
//		Object.preventExtensions(p);
//			p.school="qinghua";
//			alert(p.school);	//undefined
//		删除属性
//		delete 	p.salary;
//		alert(p.salary);*/
//		7.2密封对象不允许添加和删除成员----seal(obj);检查是否应用了seal方法,isSealed(obj);
//		严格模式下seal()可以阻止删除属性
	/*	"use strict";
		function Person(name,age){
			this.name=name;
			this.age=age;
			this.getInfo=function(){
				return this.name+this.age;
			}
		}
		var p=new Person("tom",23);
		Object.seal(p);
		alert(p.name);
		p.salary=300000;
		alert(p.salary);
		try{
			//密封对象不允许删除属性
			delete p.name;
			alert(p.name);
		}catch(e){
			e.message;
		}*/
		//7.3 完全密封对象 freeze(obj)，对对象只能读，不能修改和删除，isFrozen()检查是否应用了freeze()
//		Object.freeze(p);代码同上
//		自定义一个freeze()方法
		Object.freeze=function(obj){
			//获得所有的属性
			var props=Object.getOwnPropertyNames(obj);
			//遍历所有属性,修改属性的描述符
			for(var i=0;i<props.length;i++){
				//获取属性的描述
				var desc=Object.getOwnPropertyDescriptor(props[i]);
				if("value" in desc){
				desc.writable=false;
				desc.configurable=false;
				Object.defineProperties(obj,props[i],desc);
				}
			}
			//密封对象
			return Object.preventExtensions(obj);
		}
			
	}
