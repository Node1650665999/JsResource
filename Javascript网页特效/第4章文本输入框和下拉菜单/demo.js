
window.onload=function(){
//1	验证汉子的正则表达式    /[\u4E00-\u9FA5]/
	
//2省市联动的下拉菜单
	//存放省市的数组、id,名称，父id
	var arr=new Array();
	arr[arr.length]=[1,"四川",null];
	arr[arr.length]=[2,"湖北",null];
	arr[arr.length]=[3,"成都",1];
	arr[arr.length]=[4,"武汉",2];
	//页面加载完成后渲染省份
	function fillOptions(){
		//获取省份的dom对象
		var p=document.getElementById("province");
		var str="<option></option>";
		p.innerHTML="";
		//遍历数组将省份添加到省份下拉列表中
		for(var i=0;i<arr.length;i++){
			var item=arr[i];
			//对数组中的每一项进行判断，过滤掉城市选项,注意设置每一个选项的值，因为与后面的城市选择关联
			if(item[2]==null){
				//设置值将城市和省份关联起来
				str+="<option value="+item[0]+">"+item[1]+"</option>";
			}
		}
		//将选项添加到元素中
		p.innerHTML=str;
	}
	fillOptions();
	//根据省份选择提示相应的城市
	document.getElementById("province").onchange=function(){
		//如果没有选择省份，则直接跳出程序
		if(this.value==""){
			return false;
		}
		//获取城市下拉列表对象
		var c=document.getElementById("city");
		var str="<option></option>";
		c.innerHTML="";
		//遍历数组将城市添加到下拉列表中
		for(var i=0;i<arr.length;i++){
			var item=arr[i];
			//根据选择的省份决定该有哪些城市选项
			if(item[2]==this.value){
				str+="<option value="+item[0]+">"+item[1]+"</option>";
			}
		}
		//给城市下拉列表添加选项
		c.innerHTML=str;
	}

	
}
