

window.onload=function(){
	/*	1	转义操作函数进行对非ASCALL字符进行转义，防止用户提交的数据含有非法字符,encodeURI和
				encodeURICompenent对转义的字符范围不同，后者能够转义包括$,&等一系列特殊字符
				alert(encodeURI(" "));
				alert(encodeURIComponent(".,;,m[]''"));
				alert(decodeURIComponent("%5D"));*/
		
		
//		2 转换数据类型的函数
			/*	var a=parseFloat("3.3abc");	//3.3
				alert(parseInt("1acb"));	//1 如果为abc1则为NaN*/
		
//		3 判断函数
		/*	alert(isFinite(Infinity));		//是否无穷
			alert(isNaN("abc"));			//是不是一个数字*/
			
//		4 调用函数时参数的数量可以和函数定义时的参数不同
		/*function add(ags1,ags2,ags3){
			return ags1+ags2;
		}
		alert(add(1,3));*/
//		5 定义函数的初始值
		/*function myFunc(ags1,ags2,ages3){
			ags1=1;
			ags2=2;
			ages3=3;
			return ags1+ags2+ages3;
		}
		alert(myFunc(1,2));*/
		
//		6函数嵌套，函数内部含有函数,内部函数不能在外部调用
        /*function test(){
        	function say(){
        		return "nihao";
        	}
        	return say();
        }
        alert(test());*/
       
//     7 函数表达式,将函数赋值给一个变量
	/*	var f=function(){
			alert("hello");
		}
		f();	
		f=null;		//失去了对函数的引用，下面的f指向为空
		f();*/
		
	/*	var f=function(){
			alert("hello");
		}
		var o=new Object();
		o.func=f;
		o.func();	//可以调用
		f();
		delete o.func;  //删除对象的属性，下文就不可以再调用了
		o.func();*/
		
//		8 匿名自执行函数,不用调用就能执行的函数
	/*	(function(i){
			alert("传入的值是"+i);
		})(4);*/
		//8.1访问匿名自执行函数里面的对象和属性
		/*var o=new Object();
		(function(obj){
			obj.myFunc=function(){
				alert("这是匿名自执行函数的内部");
			}
		})(o);
		o.myFunc();*/
		
//		9闭包函数,在变量的作用域范围外面还可以使用变量
		/*function a(){
			var	temp="使用闭包函数";
			function b(){
				alert("显示为"+temp);
			}
			return b;	//注意这里返回的是函数，而不是函数的结果
		}
		var myFunc=a();	//将a()的值(b)赋值给Myfunc,myFunc==b。*/
//		9.1匿名函数形成闭包
		/*function func(param){
			return (function(){
				alert(param);
			});
		}
		var f=func("hello");
		setTimeout(f,3000);*/
//		9.3
		/*for (var i=0;i<10;i++) {
			(function(param){
				alert(param);
			})(i);
		}*/
		
		/*for (var i = 0; i < 10; i++) {
			setTimeout((function(param){
				alert(param);
			})(i),3000);
			
		}*/
		
//		myFunc();
		
		
		
		
		
		
		
		
		
}