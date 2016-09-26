	
	/*
	 
	 * 接受线程传递过来的数据，计算完毕后向线程回传数据
	 * 
	 * */
	
	onmessage = function(event) {
		var num = event.data;
		var result = 0;
		for(var i = 0; i <= num; i++)
			result += i;
		//向线程创建源送回消息
		postMessage(result);
	}