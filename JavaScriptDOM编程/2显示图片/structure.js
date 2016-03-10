	//遍历文档中的h1和h2标题，在文档开头位置生成目录
	function titleStruc(){
		//获取文档中的所有标题
		var tagH1=document.getElementsByTagName("h1");
		var tagH2=document.getElementsByTagName("h2");
		//遍历文档中的h1，取出每个标题的title和文本内容
		for(var i=0;i<tagH1.length;i++){
			//获取每个节点的属性和文本内容
			var tagtitle=tagH1[i].title;
			var tagtext=tagH1[i].innerHTML;
			var textAdd=tagtitle+"............."+tagtext;
			//生成一个p节点用来接收属性和文本节点
			var	ele1=document.createElement("p");
				ele1.id=i;
			//生成一个文本节点
			var ele1text=document.createTextNode(textAdd);
			//将文本节点添加到p元素中
			ele1.appendChild(ele1text);
			//将h1节点添加到文档的最前面
			var target=document.getElementById("list");
			target.parentNode.insertBefore(ele1,target);
			
		}
		//遍历文档中h2元素，取出内容和标题，然后追加到相应的h1节点后面
		for (var j=0;j<tagH2.length;j++) {
			var tagtitle2=tagH2[j].title;
			var tagtext2=tagH2[j].innerHTML;
			var textAdd2=tagtitle2+".........."+tagtext2;
			var ele2=document.createElement("p");
			var ele2text=document.createTextNode(textAdd2);
			ele2.appendChild(ele2text);
			//由节点属性title判断遍历出的节点应该追加到哪个节点后面，调用insertAfter函数
			if (tagtitle2.indexOf("1")==0){
				var p1=document.getElementById("0");
				insertAfter(ele2,p1);
			} else{
				var p2=document.getElementById("1");
				insertAfter(ele2,p2);
			}
			
		}
			
	}
	titleStruc();
	//insertAfter函数
	function insertAfter(neweleme,targetelem){
		var parent=targetelem.parentNode;
		if(parent.lastChild==targetelem){
			parent.appendChild(neweleme);
		}else{
			parent.insertBefore(neweleme,targetelem.nextSibling);
		}
	}
