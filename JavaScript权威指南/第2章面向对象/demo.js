
window.onload=function(){
	//1创建一个类
	/*function mkClass(){
		this.mess="hello";		//创建对象的属性用this
		this.say=function(){
			alert(this.mess+"javascript");
		}
	}
	var mc=new mkClass();
	mc.say();
//	2获取对象的构造方法construator
	document.write(mc.constructor);*/
	
	
//	3访问对象的属性
	/*var	obj=[{name:"zhangsan",age:24},{name:"lisi",age:{age1:34,age2:44}}];
	obj[1].age.age1=23;
	alert(obj[1].age.age1);*/
	
	
//	4使用prototype定义方法和属性,原型是所有对象的顶级父辈，实例化的对象可以共享原型的属性和方法
//	prototype是构造器方法(类，可以共享)的属性，__proto__是类实例的属性(只属于实例化后的这个对象)

	/*function Demo(){
		this.say=function(){
						alert("名字"+this.name+"年龄"+this.age)
		}
	}
	var demo=new Demo();
	demo.name="zhangsan";
	demo.age=23;
//	demo.say();
	//新创建的一个对象
	var	demo2=new Demo();
//	alert(demo2.say())	//name和age为undifiend
	//prototype定义的属性和方法
	Demo.prototype.sing=function(){
		alert(Demo.prototype.salary);
	}
	Demo.prototype.salary=5000;
	demo2.sing();
	alert(demo2.salary);*/
	
//	5set和get方法定义属性和方法
	/*function Person(){
		var sex="defualt";
		this.setSex=function(m){
			sex=m;
		}
		this.getSex=function(){
			return sex;
		}
	}
	var p=new Person();
	p.setSex("man");
	alert(p.getSex());*/
	
//	6 this的使用，作用域问题
//		6.1函数内部嵌套函数
	/*function Person(){
		this.name="张三";
		this.age=34;
		that=this;	
		function getInfo(){
			//嵌入在函数内部的函数，this指向的是谁呢？通过that把this传递进来
			alert("姓名为"+that.name+"年龄为"+that.age);
		}
		return getInfo();
	}
	var p=new Person();*/


//		6.2闭包方法里面的this
	/*	function Person(){
			function people(){
				var temp="本地变量";    //定义一个本地变量，将在函数外部访问到
				this.a=function(){
					return	this.b;		//返回闭包方法 ,将函数当做返回值是闭包的一个特点
				}
				this.b=function(){	//定义的闭包方法
					return (temp+this);	
				}
			}
			//实例化people类
			var p=new people();
			var demo=p.a();    //将函数a的值赋值给demo，也就是demo=b;
			alert(demo());		//访问到了变量temp()，因为demo不是在people的一个实例上调用，所以this指向的
//			是window对象，这里的demo其实相当于window.demo(),由此可见this的指向是谁
		}
		Person();*/

//		6.3将函数作为参数传递给一个函数也可以实现闭包
		/*function Person(){
			var temp="本地变量";
			function peolple(){		//定义一个闭包方法
				this.a=function(){
					return (temp+this);
				}
				this.b=function(param){
					return param();
				}
			}
			var p=new peolple();
			var demo=p.b(p.a);
			alert(demo);
		}
		Person();
		*/
//		7类的继承，通过原型链prototype继承
		/*function Person(name,age){
			this.name=name;
			this.age=age;
			this.getInfo=function(){
				alert(this.name+this.age) ;
			}
		}
		function Children(){ }
		//通过原型链实现继承
		Children.prototype=new Person();
		var child=new Children();
		child.name="zhangsan";
		child.age=23;
		child.getInfo();
		var p=new Person("lisi",23);
		p.getInfo();
//		检测一个子类是否继承于某个父类
		alert(Children.prototype.constructor==Person);*/
		
		
//		8静态成员创建枚举,枚举就是静态常量
		/*function Day(){
			throw new Error("静态类不能被实例化");
		}
		Day.MONDAY=1;
		Day.TUESDAY=2;
		Day.WEDNESDAY=3;
		Day.THURSDAY=4;
		Day.FRIDAY=5;
		Day.SATURDAY=6;
		Day.SUNDAY=7;
		var date=new Date();
		var d=date.getDay();
		switch (d){
			case Day.MONDAY:
				alert("今天是星期一");
				break;
			case Day.THURSDAY:
				alert("今天是星期四");
				break;
			default:
				break;
		}
*/		
	
	
}
