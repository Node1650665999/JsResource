﻿onmessage=function(event){
    var worker;
    //创建发送数据的子线程
    worker=new Worker("worker1.js");  //发送数据给worker1
    worker.postMessage("");     
    worker.onmessage = function(event) {  //接受worker1回传的数据
        //接收子线程中数据，本示例中为创建好的随机数组
        var data=event.data;
        //创建接收数据子线程
        worker2=new Worker("worker2.js");
       //把从发送数据子线程中发回消息传递给接收数据的子线程
        worker2.postMessage(data);  //将data传递给worker2
		worker2.onmessage = function(event) {  //接受worker2回传的数据
	             //获取接收数据子线程中传回数据，本示例中为挑选结果
		    var data=event.data;
	            //把挑选结果发送回主页面
	            postMessage(data);
		}
    }
}