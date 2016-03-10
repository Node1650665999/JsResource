

window.onload=function(){
//1 动态创建新元素
/*	document.getElementsByTagName("input")[0].onclick=function(){
		//第一中方法，element.innerHTML
		document.body.innerHTML="<h1>这是标题</h1>";
		//第二种方法创建节点
		var h=document.createElement('h2');
		var t=document.createTextNode("这是h2标题");
		var e=h.appendChild(t);
		document.body.appendChild(e);
	}
	*/
	
//2 删除元素removeChild
	/*document.getElementsByTagName("input")[0].onclick=function(){
		this.parentNode.removeChild(this);
	}*/


//3 克隆元素，cloneNode(true)，然后添加到元素中
	//克隆按钮
/*	var btn=document.getElementsByTagName("input")[0].cloneNode(true);
	document.getElementsByTagName("input")[0].onclick=function(){
		//将克隆的新对象添加到父元素
		this.parentNode.appendChild(btn);
	}
*/	
	

//4 display控制div的显示与隐藏
	 document.getElementsByTagName("input")[0].onclick=function(){
	 	//判断div的display属性
	 	var divEle=document.getElementsByTagName('div')[0];
	 	//这里将display的值直接作为开关变量
	 	if(divEle.style.display=="none"){
	 		divEle.style.display="block";
	 	}else{
	 		divEle.style.display="none";
	 	}
	 }
	
	
	
}
