/*
 document.getElementsByTagName("button")[0].onclick=function(){
		var flag=true;
		toRed();
		function toRed(){
	
			if(flag){
				document.getElementsByTagName("div")[0].className="demo";
				
			}else{
				document.getElementsByTagName("div")[0].className="";
			}
			flag=!flag;
		}
	}
 * 
 * 
 * 	
 * 
 * var node=document.getElementById("box").childNodes;
	var rec=filterSpace(node);
	alert(rec[0].textContent);

}
function filterSpace(nodes){
	var arr=[];
	for (i=0;i<nodes.length;i++) {
		if(nodes[i].nodeType==3&&/^\s+$/.test(nodes[i].nodeValue))continue;
		arr.push(nodes[i]);  //将元素添加到守数组中去
	}
	return arr;
 * 
 * 
 * 
 * var box=document.getElementById("box");
	var ele=document.createElement("div");
		ele.className="red";
		ele.title="子div";
		box.appendChild(ele);
	var text=document.createTextNode("nihao");
	    ele.appendChild(text);
 * 
 * 
 * 
 * if(typeof Node=="undefined") {
		window.Node={
			ELEMENT_NODE:1,
			TEXT_NODE:3
		}
	} 
 * 
 * 
 * 
 * 
 * 
 * var box=document.getElementById("box");
	
	  addClass(box,"red");
	  removeClass(box,"bg");
	  function hasClass(element,className){
		return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
	}
	function addClass(element,className){
		if(!hasClass(element,className)){
			element.className+=" "+className;
		}
	}
	function removeClass(element,className){
		if(hasClass(element,className)){
			element.className= element.className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),"");
		}
	}
	
	
	
	var btn=document.getElementsByTagName("button")[0];
	btn.onclick=show;
	function show(){
		alert(arguments.length)
	}
	
	
	
	
	
	
	
	document.onmouseup=function(evt) {
		if (getButton(evt)==0) {
			alert("按下了鼠标左键");
		}else if(getButton(evt)==1){
			alert("按下了鼠标中建");
		}else if(getButton(evt)==2){
			alert("按下了鼠标右键");
		}
		
	}
	function getButton(evt){
	var e=evt||window.event;
	if (evt) {
		return e.button;
	}else if(window.event){
		switch (e.button){
			case 1:
				return 0;
			case 4:
				return 1;
			case 2:
				return 2;
		}
	}
}





document.onclick = function (evt) {
		alert(getKey(evt));
	}
function getKey(evt) {
	var e = evt || window.event;
	var keys = [];
	if (e.shiftKey) keys.push('shift'); //给数组添加元素
	if (e.ctrlKey) keys.push('ctrl');
	if (e.altKey) keys.push('alt');
	return keys;
}



	document.getElementsByTagName("button")[0].onclick=function(evt){
			alert(getElement(evt));
		}
	function getElement(evt){
		var e=evt||window.event;		//兼容
		return e.srcElement||e.target;
	}
	
	
	
	
	
	解决window.onload事件覆盖
	window.onload=function(){
	alert("hello");
}
if(typeof window.onload=="function"){
	var saved=null;
	saved=window.onload;
}
window.onload=function(){
	if (saved) saved();
	alert("world");
}

 * */
window.onload=function(){
	document.getElementsByTagName("button")[0].onclick=function(){
		var box=document.getElementById("box");
		var flag=true;
		toggleChange(box,flag);
	}
}
	function toggleChange(obj,flag){

		if (flag) {
			obj.className="bg";
		} else{
			obj.className="red";
		}
		flag.prototype=!flag;
	}

//function toGray(obj){
//	obj.className="bg";
//	
//}
//function toRed(obj){
//	obj.className="red";
//}
