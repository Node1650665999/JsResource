//showpic函数接收一个链接对象用来显示图片
	function showPic(whichPic){
		//获取当前链接的href属性
		var	source=whichPic.href;
		//获取图片对象
		var holder=document.getElementById("pic");
		//为图片对象的src属性赋值
		holder.src=source;
		
}
	
//定义一个函数，当页面加载时动态产生一个展示图片的img标签
	function imgBox(){
		//产生一个img元素
		var imgTag=document.createElement("img");
		//为img元素定义属性
		imgTag.setAttribute("id","pic");
		imgTag.src="";
		//获取div节点
		var nav=document.getElementById("list");
		//将img元素添加到div元素后，这里使用自定义的一个insertAfter函数
		insertAfter(imgTag,nav);
	}

//定义一个insertAfter函数，用来将一个元素添加到另一个元素后面
	function insertAfter(newelement,targetelment){
		var parent=targetelment.parentNode;
		//首先判断父元素的最后一个元素是不是目标元素，因为appengChild是将元素添加到最后一个子节点的后面
		if(parent.lastChild==targetelment){
			//如果父元素的最后一个元素是目标元素，则直接插入到目标元素的后面
			parent.appendChild(newelement);
		}else{
			//
			parent.insertBefore(newelement,targetelment.nextSibling);
		}
	}

//将js代码从HTML页面元素中脱离出来
	function funcLode(){
		//获取链接对象
		var	aTag=document.getElementsByTagName("a");
		//遍历a元素为其加上事件
		for (var i=0;i<aTag.length;i++) {
			aTag[i].onmouseover=function(){
				showPic(this);
				//同时修改链接的默认跳转行为

			}
			aTag[i].onclick=function(){
				return false;
			}
		}
	}
	//页面加载完成后执行这个函数
	window.onload=function(){
		imgBox();
		funcLode();
	}
	