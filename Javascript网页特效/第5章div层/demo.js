
window.onload=function(){
/*	//1 设置一个可以拖动的层,获取鼠标按下时移动的坐标,然后将鼠标移动的距离设置给div
	var isOver=false; //鼠标是否移动的标志
	var l=0; //left变量、
	var t=0  //top变量
	//获取要拖动的对象
	var c=document.getElementById("container");
	//作用于对象的方法
	//鼠标按下时
	c.onmousedown=function(event){
		var e=event;
		//获取鼠标的坐标
		x=e.clientX;
		y=e.clientY;
		//得到拖动层的坐标
		l=c.style.left;
		t=c.style.top;
//		alert(l);
		//改变变量值
		isOver=true;
	}
	//鼠标移动时
	c.onmousemove=function(event){
		if(isOver){
		var e=event;
		//获得鼠标的偏移量,然后改变拖动层的坐标
		var newLeft=e.clientX-x+l;
		var newTop=e.clientY-y+t;
		//更新拖动层的坐标
		c.style.left=newLeft+"px";
		c.style.top=newTop+"px";
		}
	}
	//鼠标起来时，设置变量为false
	c.onmouseup=function(event){
		if(isOver){
			isOver=false;
		}
	}*/
	function func(){
		alert(1||2);
	}
	func();
	
}
