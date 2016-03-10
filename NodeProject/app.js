// console.dir(查看对象的内容)
	/*var user=new Object();
	user.name="zhangsan";
	user.getName=function(){
		return this.name;
	}
	 console.dir(user);
	console.log(user.getName());*/



// 统计一段代码的执行时间，time和timeEnd的参数必须相同
	/*console.time("loop");
	for(var i=0;i<10000000;i++){
		;
	}
	console.timeEnd("loop");*/

// 
	/*var user=new Object();
	user.name="zhangsan";
	user.getName=function(){
		return this.net.Socket(options);
	}
	console.trace("trace");*/


//评估执行结果，不正确则抛出异常
//	 console.assert(1==55,"不相等");

// 全局作用域以及全局函数
//		var test="this is testing";
//		console.log(global);
	

// setTimeout和clearTimeout
//		var testFunc=function(msg){
//			console.log(msg);
//		}
//		var timer=setTimeout(testFunc,1000,"this is parameter");
//		console.log(timer);
//		clearTimeout(timer);
// setInterval 和 clearInterval
//			var testFunc=function(msg){
//				console.log(msg);
//			}
//			var timer=setInterval(testFunc,1000,"this is parameter");
//			console.log(timer);
//			clearInterval(timer);
	

//  ref 和 unref方法对回调函数作用
//		var testFunc=function(msg){
//					console.log(msg);
//				}
//		var timer=setInterval(testFunc,1000,"this is parameter");
//		 timer.unref();
//		 timer.ref();


// 加载模块
//	var testModules=require("./testModules.js");
//	console.log(testModules.teststr);
//
//	// 判断该模块是否是一个主模块
//	if (module===require.main) 
//		{
//			console.log("this is a mainModule");
//		};

//  查看模块的完整路径
	// console.log(require.resolve("./testModules.js"));


// 查看已经被加载过的模块(会被缓存)
//		require("./testModules.js")
//		console.log(require.cache[require.resolve("./testModules.js")]);
//		 delete require.cache[require.resolve("./testModules.js")];
	

	// 路径相关 __filename __dirname
//		console.log(__filename);
//		console.log(__dirname);

//   事件相关
//	var http=require("http");
	/*var server=http.createServer(function(req,res){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('<head><meta charset="utf-8"></head>');
		res.end("你好");
	}).listen(3000,"127.0.0.1");*/
	
	/*var server=http.createServer();
	server.on("request",function(req,res){
		console.log(req.url);
		res.end();
	}).listen(3000,'127.0.0.1');
	 server.removeAllListeners("request");*/

// buffer 类
	// 对象的创建
//		 var buf=new Buffer(128);
//		 console.log(buf);
//		 console.log(buf.length);
/*		// 初始化缓存区的内容,写入的值，起始位置，长度
		buf.fill(1,10);
		// console.log(buf);
		buf.fill(2,20,30);
		console.log(buf);
*/
		// 使用数据初始化缓冲区
		/*var buf=new Buffer([0,1,2]);
		console.log(buf);*/
		// 使用字符串初始化
		// var buf=new Buffer("你好");
		// console.log(buf);
		// var str="nihao";
		// console.log(str.length);
		// 字符串的长度和缓存区的长度
		// var buf=new Buffer("你好");
		// var str="你好";
		// console.log(buf[2]); //输出缓存区第三个字节转换为十六进制后的数值
		// console.log(str);	//字符串的第三个字符
		// Buffer 对象转换为字符串
		// var buf=new Buffer("你好");
		// var str=buf.toString("utf8",3,buf.length);
		// console.log(str);
		// 向Buffer对象写入数据
/*		var buf=new Buffer("你好");
		console.log(buf);
		var subBuf=buf.write("世界",3,5);
		console.log(buf);
		console.log(buf.toString()); //你世
*/
		// StringDecoder将Buffer对象转换为字符串
		// var StringDecoder=require("string_decoder").StringDecoder; //加载模块
		// // 创建StringDecoder对象
		// var decoder=new StringDecoder();
		// var sd=decoder.write("你好世界");
		// console.log(sd);

		// Buffer对象和数值之间的转化 
		// var buf=new Buffer(12);
		// console.log(buf);
		// console.log(buf.readUInt8(0));	//读取缓存区中第一个字节处的无符号整数

		// 复制缓存数据
		// var a=new Buffer("世界");
		// var b=new Buffer(128);
		// b.fill(0);
		// console.log(b);
		// a.copy(b,10);
		// console.log(b);
		// Buffer类(静态)的方法
		// var buf=new Buffer(10);
		// var flag=Buffer.isBuffer(buf);
		// console.log(flag);
		// 计算字符串的字节数
		// var  str="你好";
		// console.log(Buffer.byteLength(str)); //6
		// 将多个Buffer对象合并成一个Buffer对象,如果不指定第二个参数的值，则新的Buffer对象为所有Buffer对象长度的合计
		// var a=new Buffer("你好");
		// var b=new Buffer("世界");
		// console.log(a);
		// console.log(b);
		// console.log(Buffer.concat([a,b]).toString());



























