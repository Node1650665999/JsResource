
window.onload=function(){
//1 获取表单下面所有控件
/*	 var form=document.getElementsByTagName('form')[0];
	 //获取表单的控件(表单下面的所有元素)。注意是.elements
	 var len=form.elements.length;
	 alert(len);
*/	
	
//2 获取下拉列表的值
/*	document.getElementById("btn").onclick=function(){
		var val=document.getElementsByTagName("select")[0].value;
		alert(val); //1
	}*/
	
//3 reset()将表单初始化,达到与重置按钮一样的效果
	/*document.getElementById("btn2").onclick=function(){
		document.getElementsByTagName("form")[0].reset();
	}
	*/
	
//4 批量为控件加一个说明，点击按钮后在文本框后面出现提示
	/*document.getElementById("btn3").onclick=function(){
		var f=document.getElementsByTagName("form")[0];
		var children=f.childNodes;
		var j=0;
		var arr=[];
		for(var i=0;i<children.length;i++) {
			var ele=children[i];
			//将表单子元素添加到新数组中
			arr[j++]=ele;
			//判断元素是否为表单控件
			if(ele.tagName=="INPUT"){
				var t=document.createTextNode("不能为空");
				//将文本节点添加到数组中去
				arr[j++]=t;
			}
		}
		//将表单置空
		f.innerHTML="";
		//将存放表单子元素的数组遍历，添加子元素和说明文本到表单中
		for(var i=0;i<arr.length;i++){
			f.appendChild(arr[i]);
		}
	}*/
	
//5 复选框全部选中
/*	//获取全部的复选框
	var c=document.getElementsByName("mycheck");
	//点击全选
	document.getElementById("check").onclick=function(){
			for(var i=0;i<c.length;i++){
				if(this.checked){
					c[i].checked=true;
				}else{
					c[i].checked=false;
				}
			}
	}
*/
	
}
