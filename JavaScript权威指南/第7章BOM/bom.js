
window.onload=function(){
	
	//1		setTimwout和setInterVal是window对象的函数，也就是说它们是全局函数
	/*function bar(){
		function foo(){
			alert(this);
		}
		setTimeout(foo,3000);
	}
	bar();*/
	
	//输入消息对话框
	/*var returned=prompt("请输入名字");
	if(returned!=null){
		alert("你输入的是"+returned);
	}else{
		alert("您点击了取消按钮");
	}*/
	
	//2 BOM的基本应用
//	2.1  history对象，属性有length(历史记录的条数),back()后退，forward(前进)，go()跳转到一个特定url
	/*document.getElementsById("btn1").onclick=function(){
		history.forward();
	}*/
	/*document.getElementsById("btn2").onclick=function(){
		history.back(-1);
	}*/
	
//	2.2  location对象，用来获得当前窗口的URL信息
//	alert(location.hash);	//返回从#开始的url锚 例如 url=http://www.baidu.com/index.php#part2
//	alert(location.host);	//主机
//	alert(location.pathname);  //路径
//	alert(location.search);  //url？号后面的内容
//	方法有 assign(),reloade()刷新页面等，replace()用新的url替代当前的地址

//	2.3   浏览器对象 navigator
		//遍历 navigator对象，包含了了一些属性和方法 for。。in
//		for (var i in navigator) {
//			document.write(navigator[i]+"<br />");
//		}
//		document.write(navigator.appVersion);	//浏览器的版本信息
//		alert(navigator.offLine);



	//3		浏览器的端数据储存，是通过字符串形式的key/value的数据存储和读取
//				两种方式：本地储存localStorage;会话储存：sessionStorage
			
			//3.1	本地储存localStorage对象
			/*var stor=window.localStorage;
			//在本地保存一条数据
			stor.word="helll world";	
			//注释掉以后，再次访问
			alert(window.localStorage.word);	//hello world	说明已经将数据存储在了本地，即使存数语句已经被注释
			
			//利用localStorage统计用户访问的次数
			var stor=window.localStorage;
			//访问一个统计用户访问次数的变量，如果不存在就初始化为1，如果存在就加1
			if(stor.visiteCount){
				stor.visiteCount=parseInt(stor.visiteCount,10)+1;	//转换为十进制的整数，不然他们的和是11
			}else{
				stor.visiteCount=1;
			}
			 alert("这是你第"+stor.visiteCount+"次访问");*/
			
			
			//3.2		会话储存sessionStorage对象,将整个页面放在服务器端测试，提交给服务端的php页面处理
//				php页面的内容
			/*<?php
				echo "<script>alert('提交失败');location.href='bom.html';</script>";
			
			?>*/
			//如果第一次输入张三，提交给服务器后即使错误返回刷新当前页面，文本框的中的值还是存在的
/*			var ele=document.getElementsByTagName("input");
			var btn=document.getElementById("btn");
				//当文本框失去焦点后立马将值储存成session对象的属性
				ele[0].onblur=function(){
					window.sessionStorage.myValue=this.value;
				}
				//当前会话中输入框的值由sessionStorage决定
			if(window.sessionStorage.myValue){
				ele[0].value=window.sessionStorage.myValue;
			}
*/

			//3.3获取和更新储存	
			//key()		根据索引号获取键名
	/*		var storageObj=window.localStorage;
			var keyName=storageObj.key(1);	//获取第二个键的键名
			//getItem()	根据键名获取键值
			var valueObj=storageObj.getItem(keyName);	//获取第二个键对应的值
			alert(valueObj);	
			//clear()	删除全部的键值，可以将存储区的键值对全部删除
			storageObj.clear();	
			alert(valueObj);	//存储区已经被全部删干净
		*/	
			//removeItem()	根据键名删除指定的键(单条)，因为键被删除了，所以值没有指向它的引用
/*			var storageObj=window.localStorage;
			var keyName=storageObj.key(0);
			storageObj.removeItem(keyName);
*/
			//setItem(keyName,value)设置键值  等同于storageObj.keyName=value;
//			var storageObj=window.localStorage;
//			storageObj.setItem("name","zhangsansd");
			
			
		//浏览器端的数据库 web Database			


}
