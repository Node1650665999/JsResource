
window.onload=function(){
	//1 date对象,date类的方法和属性很多不是静态的，所以要用实例调用
//	var today=new Date();
//	alert(today.getDate());		//一个月的第几天
//	alert(today.getDay());	//星期
	//获取当前时间的完整格式
	//年月日
//	alert(today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+today.getDate().toString());	//月份是从零开始算的，所以加1
//	//时分秒
//	alert(today.getHours()+":"+today.getMinutes()+":"+today.getSeconds());
	
	//2	Boolean	有三个方法，valueof()获得Boolean实例的原始值,toString()返回Boolean实例的字符串表示，toJSON()序列化为JSON格式的字符串
	
	//3	math类是一个静态类，不用实例就可以调用
	
	
	
//	4	function 和	arguments类
		//4.1	改变函体内this关键字指向的对象	三个函数call(),applay(),bind()
		//call()方法
		//***********注意***********func.call()==func();两种调用方法等同，函数体内部调用本身用callee()
/*		function say(){
			alert(this==obj);
		}

		var obj=new Object();
		//将say()方法里面的this指向了obj
		say.call(obj);		//this指向的是obj，所以为true
*/
	
	
	/*function say(name,age){
			this.name=name;
			this.age=age;
			this.showMess=function(){
				alert(this.name+" "+this.age+" "+this.id);
			}
//			alert(arguments.length);	//2
		}
//		var s=new say("zhangsan",23);
//		s.showMess();	//张三，23
		var obj=new Object();
		obj.id=1;
		//现在将say()里面的this指向obj
		say.call(obj,"lisi",89);
		obj.showMess();	//lisi 89 1 id为1 说明this指向了obj，因为say对象没有定义id*/




//		4.2apply()方法和call()方法差不多，只不过apply方法将参数以数组的形式传递给函数,在函数参数数量未知的情况下用apply方法
		/*function say(args){
			alert(args);
			alert(arguments);
		}
		var obj=new Object();
		say.apply(obj,[1,2,3]);*/
		
		
//		4.3bind方法	也是改变函数内部的this指向的对象
		
		
		
//		5 argument，每一个函数内部都有一个argument类，argument.length表示的是传递给参数的数目，而不是函数申明时的参数数目
//		  5.1	arguments.callee()函数表示对当前正在执行的函数引用，这个属性一般用来实现递归函数
			/*var sum=1;
			function factorial(n){
				if(n>0){
					sum*=n*arguments.callee(n-1);
					
				}else{
					return 1;
				}
				return sum;
			}
			alert(factorial(4));*/	//
			
			
		
//		6 	JSON操作
//			6.1		stringify() 序列化JavaScript数据为JSON数据
			
//			JSON.stringify(value,[replacer,space]);
//			value是序列化的JavaScript数据，通常是复杂数据类型，例如对象，数组；
//			replacer是可选的过滤函数或者数组，序列化数组时,如果replacer也是数组，参数replacer是被忽略的，序列化对象时如果replacer是数组
			//(replace必须是字符串数组，也就是数组元素的值必须是字符串)，数组的元素的值(对象属性的字符串表示)就是要进行序列化的对象的属性
//			space用在JSON字符串中添加一些格式字符，如空格，换行等，是JSON数据看起来易阅读
//			如果序列化的JavaScript数据有toJSON方法，那么stingify()其实就是调用toJSON()方法，如果要被序列化的数据不含toJSON()方法,那么这个
//			JavaScript数据就不能被序列化为JSON数据，仅有String,Boolean,Date,Number定义有toJSON()方法
			
			
			//数据过滤,序列化一个含有toJSON()方法的string对象，value为对象，replacer为数组，序列化条件在上面
				//定义一个要被序列化的JavaScript数据，是一个对象
				/*var person=new Object();
				person.name="张三";
				person.sex="male";
				person.age=23;
				//定义一个replacer，过滤对象,元素的值必须和对象的属性一一对应，并且是对象属性的字符串表示
				var arr=new Array();
				arr[0]="name";
				arr[1]="sex";
				arr[2]="age";
				//调用stingify()方法序列化这个对象
				var text=JSON.stringify(person,arr);
				document.write(text);	//{"name":"张三","sex":"male","age":23}
			*/
			
			//序列化一个不含有toJSON()方法的对象，重写toJSON()方法,将对象的属性的值序列化为大写
			/*var person=new Object();
			person.name="zk";
			person.sex="male";
			person.age=34;
			//重写toJSON方法
			Object.prototype.toJSON=function(){
				var prop;
				//将对象属性的值转变为大写
				for(prop in this){
					if(typeof this[prop]=="string"){		//这里要判断一下数据的类型，age=34是没有变为大写的方法的，会报错
						this[prop]=this[prop].toUpperCase();
					}
				}
				return this;
			}
			//调用这个toJSON方法，是通过stingify()查找这个toJSON方法的
			var text=JSON.stringify(person);
			document.write(text);	//{"name":"ZK","sex":"MALE","age":34}*/
			
			
			//6.2 	parse解析生成JSON对象
				var jsontext='{"name":"zhangsan","age":89}';
//				//将JSON数据解析为jstext对象
				var jstext=JSON.parse(jsontext);
				document.write(jstext);//zhangsna 89
		var obj ={
  "status": true,
  "code": 0,
  "msg": {
    "zh": "成功！",
    "en": "Success!"
  },
  "data": {
    "0": {
      "cart_id": "1",
      "goods_id": "7",
      "goods_title": "吊坠",
      "goods_price": "123",
      "goods_stock": "12",
      "goods_pre": "/goods/2015/09/14430816735603adc9c4d9c.png",
      "goods_status": "3",
      "lose": 0
    },
    "pic_domain": "http://erbao.b0.upaiyun.com"
  }
} ;

console.log(obj.data[0].lose);
				
}
		