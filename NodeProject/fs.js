/*
		@author tcl
		@data:2015/7/28
		@description 文件系统
	*/
var fs = require("fs");
//同步方法
// var data = fs.readFileSync("./index.html","utf8");
// console.log(data);
//异步方法,不能保证文件读取的顺序,可以在回调函数中再读取文件，这样可以保证读取顺序
// var data = fs.readFile("./index.html", "utf8",function(err,data){
// 	console.log(data);
// });
//文件的完整读写
// var data = fs.readFile("./test", "utf8", function(err,data){
// 	console.log(data);  //不指定编码将输出Buffer数据
// });
//文件写入
// fs.writeFile("./test.txt", "这是第一行。\r\n这是第二行",{flag:"w+"}, function(err){
// 	if(err) console.console.log("写入文件失败");
// 	else console.log("文件写入成功");
// });
// 文件中写入缓冲区中的数据
// var buf = new Buffer("我喜欢编程");  //数据为Buffer对象时编码可以省略
// fs.writeFile("mag.txt", buf, function (err) {
// 	if(err)
// 		console.log("写入buffer失败");
// 	else
// 		console.log("写入buufer成功");	//我喜欢编程
// });
// fs.writeFile("mag.txt", "这是W+的数据", function(err){
// 		if (err) 
// 			console.log("w+失败");
// 		else
// 			console.log("w+成功");
// });
// 复制图片
// fs.readFile("./a.jpg",  function(err,data){
// 	var buf = new Buffer(data);
// 	fs.writeFile("./b.jpg", buf,  function(err){
// 		if (err) 
// 			console.log("复制失败");
// 		else
// 			console.log("复制成功");
// 	});
// });
// 将数据追加到文件底部
fs.appendFile("./mag.txt", "\r\n这是追加的数据", "utf8", function(err) {
	if (err)
		console.log("追加失败");
	else
		console.log("追加成功");

});
