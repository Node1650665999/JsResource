

window.onload=function(){
//1		处理cookie，cookie的格式：document.cookie=name=vale;expires=Date(过期时间);path="/"(当前服务器下，cookie作用的网页范围);
//	domain=""(定义哪些域名下的网页可以使用这些cookie);secure=https;(加密认证协议);
//除了第一个参数其他参数都是可选的

//这里实现几个方法用来处理cookie
//传递参数，设置cookie
/*	function setCookie(cname,cvalue,cDate,cpath,cDomain,csecure){
		//名字和值是必须的，其他的用三元操作符来判断，为了防止不合法的输入，需要对其他值进行转义
		document.cookie=cname+"="+escape(cvalue)+((cDate)?";expires="+cDate:"")+((cpath)?+";path="+cpath:"")
		+((cDomain)?+";domain="+cDomain:"")+((csecure)?+";secure="+csecure:"");
	}
		
//传入某个项，获得获得相应的值
	function  getCookie(cname){
		//用分号将cookie分成数组，现在每一项都是一个键值对
		var cCookie=document.cookie.split(";");
		//将每一项用等号分割，传入相应的键就返回对应的值
		for(var i=0;i<cCookie.length;i++){
			//将每一项又分为数组，键为数组第一个元素0，值为第二个元素1
			var cSet=cCookie[i].split("=");
			//如果传入的键名是cookie里面的键。就返回相应的值
			if(cname==cSet[0]){
				return unescape(cSet[1]);
			}
		}
		//如果键名不匹配，就返回null
		return null;
		
	}
//		删除cookie就是设置的cookie的时间过期
	function   deleteCookie(cname,cpath,cDomain){
		//先判断有没有这样的cookie
		if(getCookie(cname)!=""){
			document.cookie=cname+"="+(";expires=Thu,01-Jan-1970 00:00:01 GMT")+((cpath)?+";path="+cpath:"")
				+((cDomain)?+";domain="+cDomain:"");

		}
	}
	
	
//	setCookie("myapp","微信",3600);
//	alert(getCookie("myapp"));
	deleteCookie("myapp");
	alert(getCookie("myapp"));*/
	
	
	//2		文档状态	ajax的原理 当前文档状态readayState 和文档状态事件onreadayStateChange
//	当前文档的状态三个值 1loading 2interact 3complete
//	alert(document.readyState);
	/*document.onreadystatechange=function(evt){
		alert(document.readyState);
	}*/



	//3		编辑API用来创建富文本编辑器
//		由 document.execCommand(command,[showUI,value])组成，execCommand()是执行命令，
		//里面的command是命令，并且要将被编辑的内容区域的属性 contenteidtabl="true";这样编辑命令才会有效
	//创建一个富文本编辑器,
	/*var btn=document.getElementsByTagName("input");
	btn[0].onclick=function(){
		document.execCommand("bold",false,this.value);
	}
	btn[1].onclick=function(){
		document.execCommand("italic",true);
	}
	btn[2].onclick=function(){
		document.execCommand("createLink",false,"http://www.baidu.com");
	}*/
	
	
	
	//4		dom处理style和link元素定义的样式表，也就是可以操作外部的样式表,设置css属性
//	a：	获得样式表对象 document.styleSheets,这是一个数组(一片文档可能有好几个样式表)
//	b:	获得样式表规则(一个样式表是由很对规则组成的)	document.styleSheets.rules 同样是一个数组(一个样式表有几个规则)
//	c：	获得规则里面的定义的样式属性  document.styleSheets[0].rules[0].style
//	document.styleSheets[0].rules[0].style.background="#2345fb";



	//5		dom事件
//	一个事件监听器包含三个参数，事件类型(如click,change等),监听函数listener(对事件做出响应),以及决定事件处于捕获阶段(true)
//	还是冒泡阶段(false),IE只有冒泡阶段,每一个监听函数listener都有一个event对象,可以获取对事件对象的引用，
//	有两个属性currentTarget(当前被监听的对象)和target(返回事件目标对象是此目标节点下最深的那个子节点)
//	target.addEventListener(eventType,listener,capture);
//	listener(event){
//		event.currentTarget;
//		event.target;
//	}
	

//	6 	事件流	捕获阶段和冒泡阶段，以及目标阶段
//		捕获阶段:当事件触发时，事件从dom根节点沿着dom树遍历至目标几点，这个过程就是捕获
//		目标阶段:找到事件最底层的目标节点,如果定义了事件监听，就触发事件，进入冒泡阶段
//		冒泡阶段:事件到达目标节点后沿着dom树回溯至最外层的节点，这个过程就是冒泡


//	7	事件对象
////		一旦事件发生就会产生一个event对象，IE用window.event,其他用evt,如跨浏览器兼容
//		function  handleEvent(evt){
//			var myEvent=window.event?window.event:evt;
//		}


}
