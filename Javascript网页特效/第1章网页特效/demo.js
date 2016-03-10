

window.onload=function(){
	
//1 网页刷新
		/*	function refunc(){
				window.location.reload();
			}
			setInterval(refunc,5000);//5000毫秒
		*/	
		//	在网页头部加这行代码也可以实现刷新	<!--<meta http-equiv="refresh" content="5"/>-->

// 2若干秒后若没有对网页进行操作，则自动关闭窗口
		/*var willClose=true;
		document.getElementById("bd").onclick=clickBody;
		function clickBody(){
			willClose=false;
		}
		setInterval(function(){
			if(willClose){
				window.close();
			}else{
				willClose=true;
			}
		},5000);*/
//3 动态加载脚本，减少不必要的脚本加载
	//当点击按钮后再加载脚本
/*	var h=document.getElementsByTagName("head")[0];
	document.getElementsByTagName('input')[0].onclick=function(){
		var myScript=document.createElement("script");
		myScript.src="load.js";
		myScript.type="text/javascript";
		myScript.charset="UTF-8";
		//程序下载完成后再解析和执行
		myScript.defer=true;
		h.appendChild(myScript);
	}
*/

//4 文档加载和网页加载时不同的，网页加载包含文档，脚本，样式，图片等的加载，所以文档加载始终在网页加载完毕之前就已经加载完了
//		alert("网页加载完毕");
	//文档加载,测试时将代码放到window.onload外面
	/*	document.onreadystatechange=function(){
			if(document.readyState=="complete"){
				alert("文档加载完毕");
			}
		}
	*/
	
//5 避免浏览器使用缓存加载页面
/*	var links=document.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var l=links[i];
		var href=l.href;
		//防止连接缓存
		if(href.indexOf("?")>-1){
			href+="&time="+new Date().getDate();
		}else{
			href+="?time="+new Date().getDate();
		}
		l.href=href;
	}
*/

//





















}
