
window.onload=function(){
	
//	var reg=/.co(m)$/;	//有几个括号就有几个子匹配
//	var str="165@qq.com";
//	var arr=reg.exec(str);
	//1 exec用来返回匹配的结果，返回值是一个数组，数组第0个元素包含完整的匹配，1~n则包含子匹配
	/* var arr=reg.exec(str);	//.com,m
	 //打印出完整的匹配
//	 alert(arr[0]);
	 for (var i=0;i<arr.length;i++) {
	 	alert(arr[i]);
	 }
	//exec()返回的数组有两个属性input--被查找的字符串,index---字符串中被匹配的子字符串的位置
	
	alert(arr.input);		//165@qq.com
	alert(arr.index);		//6
	alert(reg.lastIndex);*/
	
	//2	test  检查字符串中是否包包含了指定模式中的字符串，返回值为true或者false
	/*if(reg.test(str)){
		alert("登陆成功");
	}*/
	
//	3字符串处理函数
//	var	str="hello word";
//	var js="javascript";
//	var reg1=/.+o\b/;
	//指定索引处的字符
	//alert(str.charAt(2));		//l
	//连接两个字符串文本，并且返回新的字符换
	//alert(str.concat(js));	
	//返回指定索引处Unicode代码点值
	//alert(js.charCodeAt(1));	//a的Unicode代码值为97
	//返回匹配到的结果
	//alert(str.match(reg1));
	//替换字符串
	//alert(str.replace(reg1,"java"));
	
//	4创建打字机效果
	var text="这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i金本位金本位这是一二线额外i金本位"
	//获取DOM对象
	var elm=document.getElementById("div");	
	var count=0;
	//定义一个打印方法
	function type(){
		if (count<text.length) {
			elm.innerHTML=text.substring(0,count);
				count++;
		} else{
			//清除计数器
			clearInterval(interId);
		}			
	}
	//每隔三秒打印出一个字
	var interId=setInterval(type,300);
	
}
