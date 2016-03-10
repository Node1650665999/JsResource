
	window.onload=function(){
	var text="这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i金本位这是一二线额外i金本位金本位这是一二线额外i金本位";
	var count=0;
	var ele=document.getElementById("div");
	function type(){

		if(count<text.length){
			ele.innerHTML=text.substring(0,count);
			count++;	
		}else{
			clearInterval(interId);
		}
	}
	 var interId=setInterval(type,500);
	 
	
	
	 //由一个事件触发响应函数getResText()，进行异步加载
		document.getElementById("btn").onclick=getResText;	//不能带括号
}

	//定义一个获得XMLHttp对象的函数，返回XMLHttp对象
	function getXMLHttpObject(){
		return typeof XMLHttpRequest=="undefined"?new ActiveXObject():new XMLHttpRequest();
	}
	//定义一个响应函数，用来接收返回来的文件
	function getResText(){
		var xmlhttp=getXMLHttpObject();
		if (xmlhttp) {
			//向服务器发送请求，异步加载
			xmlhttp.open("GET","test.txt",true);
			//等待服务器的响应
			xmlhttp.onreadystatechange=function(){
				//响应成功
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					 document.getElementById("text").innerHTML=xmlhttp.responseText;
				}
			}
			//发送请求
			xmlhttp.send(null);
		} else{
			alert("你的浏览器不支持XMLHttp对象");
		}
	}
	