window.onload=function () {
	//1数组的创建，
	// 三种方式：1指定数组的长度，2申明一个空数组，然后赋值，3直接在括号里添加元素,4方括号直接添加元素
//	 var a=Array(2);
//	 a[2]=3;
//	 alert(a.length);
	
	// var a=Array(1,2,3);
	// alert(a[2]);

	// 2元素可为空,但也仅限于这种形式的数组，其他的将会报错
/*	var a=Array();
	a[0]=1;
	a[2]=3;
	alert(typeof a[1]);	//undefined,注意和null不一样，null的类型是对象
*/
	
	// 3多维数组
/*	var a1=Array(1,2);
	var a2=Array(3,4);
	var a=Array(a1,a2);
		// 循环遍历二位数组
	for (var i = 0; i<a.length; i++) {
		for (var j = 0; j<a[i].length; j++) {
			alert(a[i][j]);
		};
	};
*/


	//数组的APi
	// var arr=[1,2,3];
	//给数组添加一个元素
	// arr.push(4);	//arr[3]=4;
	//删除第一个元素
	// arr.shift();
	// alert(arr[0]);			//arr[0]=2;
	//数组反转
	// alert(arr.reverse());	3,2,1
	//两个数组相连创建一个新数组
	// var b=[4,5,6];
	// alert(arr.concat(b));	[1,2,3,4,5,6]
	//将数组中的元素连接起来形成一个字符串
	// alert(arr.join("-"));	//	1-2-3


	//every()对数组中每个元素作用一个回调函数，有三个参数，索引，值，数组对象
	//相当于在回调函数中对数组进行了一次遍历但却没有用到循环，遇到false就会跳出回调函数，不在执行
	/*var arr=[1,2,3];
	function itemEnum(item,index,array){
		for (var i = 0; i <array.length; i++) {
			if (array[i]%3==0) {
				return false;
			}else{
				array[i]+=1;
			}
			
		}
	}
	var a=arr.every(itemEnum);
	alert(arr);*/


	//filter()对数组中的每一项用回调函数测试，根据函数返回结果return true的元素组成一个新数组，
	// 满足条件的将返回true，相当于进行了一次遍历但是没有用到for循环
/*	var a=[1,3,6,9,11,14];
	function multipel(item,index,array){
			if (item%3==0){
				return true;	//满足条件的返回，组成一个新的数组,这里return true和
						//return item的效果一样，因为只要return true元素就会被添加到新数组
			}else{
				return false;
			}
	}	
	var b=a.filter(multipel);
	alert(b);	//3,6,9
*/

	//indexOf()某一项在数组中的索引位置
	// var arr=[1,2,3];
	// alert(arr.indexOf(1));	//0

	//isArray()判断是不是一个数组
	// var arr=[1,2,3];
	// alert(Array.isArray(arr));	//true


	//map()对数组中的每一项执行，返回一个新的数组,相当于对数组进行了一次遍历，但却根本没有用到循环
	/*var arr=[1,2,3,6,9];
	function test(item,index,array){
		if (item%3==0) {
			return	item;
		} 

	}
	alert(arr.map(test));*/

	
	//reduce()对比数组中的两个值，回调函数对数组中的两个元素执行测试函数,把数组中的元素定义
	//为前一个和后一个元素，每次执行就将两个元素的返回值作为新的前一个元素
	/*var arr=[1,2,3,4];
	function test(pre,curr,index,array){
		return pre+curr;
	}
	alert(arr.reduce(test));*/


	//some()方法
	/*var arr=[1,2,3,6,9,12,13];
	function test(item,index,array){
		for (var i = 0; i <array.length; i++) {
			if (array[i]%3==0) {
				return false;
			}else{
				array[i]+=1;
			}
			
		}
	}
	alert(arr.some(test));*/
	
	
	//数组的克隆
	
	
	//1  	浅表克隆(克隆的是对象的引用)，如果原始数组的元素是复杂数据类型，则克隆的是对象的引用，也就是说克隆的副本
	//和元素数组的元素在相同的内存地址
	/*var person=new Object();
	person.sex="male";
	person.age=28;
	var arr=["tom",person];	//数组也是一种对象
	var newArr=arr.concat();	//concat的参数可以为零,克隆对象的地址*/
//	arr[1].age=30;	//arr里面的第二个元素是对象，访问对象的属性
//	alert(newArr[1].age);	//30
	//person.age=28;
	//alert(arr[1].age+"-"+newArr[1].age);	//28-28
//	alert(newArr);	//["tom",[object,Object]]

	
	//2		深度克隆(克隆的是对象的值)，是将原始数组中的引用类型遍历出来然后填充为新的数组
	/*function cloneArray(arr,deep){
	//首先根据函数的参数判断是深度克隆还是浅表克隆(isdeep取什么值)
	 	if(arguments.length==1){
	 		var isdeep=false;
	 	}else if(arguments.length==2){
	 		var isdeep=deep;
	 	}else{
	 		throw new Error("参数数量不正确");
	 		return;
	 	}
	 //根据isdeep的值决定是什么样的克隆
	 	var newArr=arr instanceof Array?[]:{};
	 	//如果isdeep为true，深拷贝
	 	if(isdeep){
	 		//对原数组的元素进行遍历,得到数组里面的元素
	 		for(var i in arr){	//这里既可以遍历数组也可以遍历对象
	 			var elem=arr[i];
	 			//判断元素是普通元素还是引用类型的元素
	 			//如果是引用类型则继续遍历
	 			if(typeof elem=="object"){	//数组里面的对象和二维数组都是对象
					//判断elem是数组还是对象(有可能数组里面套着数组和对象)，、
					//如果原数组的第i个元素elem是数组
					if(elem instanceof Array){
						//对应着将新数组的第i个元素申明为一个数组
						newArr[i]=[];
						//对数组elem再次遍历，判断数组elem里面的元素是普通元素还是对象()
						for(var j=0;j<elem.length;j++){
							//如果数组elem里面的元素还是对象的话，就递归的调用克隆函数
							if(typeof elem[j]=="object"){
								//注意newArr[i]= 和newArr[i].push的区别，前者在同一层，后者在i出又建了一层
								newArr[i].push(cloneArray(elem[j],true));
							}else{
							//如果elem[j]是元素的话，就添加到newArr数组中去
								newArr[i].push(elem[j]);
							}
						}
					}else{
					//如果原数组的第i个元素elem是对象，则递归调用本方法再次遍历
						newArr[i]=cloneArray(elem,true);
					}
	 			}else{
	 			//如果是元素，则拷贝给新数组
	 			newArr[i]=elem;
	 			}
	 		}
	 	}else{
	 	//isdeep为false，浅拷贝
	 		newArr=arr.concat();
	 	}
	 	//返回克隆的新数组
	 	return newArr;	
	}
	
	//验证一下这个克隆方法
	var person=new Object();
	person.name="张三";
	person.age=23;
	var oarray=["tom",person];
	//克隆数组
	var newArray=cloneArray(oarray,true);
	//现在改变原数组的对象的属性
	person.age=35;
	alert(oarray[1].age);	//35;对象的引用访问对象的属性
	alert(newArray[1].age);	//23 深克隆，克隆的是值，age没变，23
	
	*/
	
	
}