//执行与指令相关的JavaScript代码
 var app = angular.module("myApp",[]);
// 注册一个指令my，函数应该返回一个对象,如果replace为true，将替换指令
//指令中可以指定以元素（E） 、属性（A） 、类（C）或注释（M）的格式来调用指令
//我们坚持使用属性方式， 因为它有比较好的跨浏览器兼容性
//指令有自己的独立作用域
// app.directive("my",function(){
// 	return {
// 		restrict: "A",
// 		replace: true,
// 		scope: {
// 			//通过@来赋值dom中的值给指令作用域中的属性,这个scope是指令的独立作用域
// 			myLink: "@",
// 			myText:	"@"
// 		},
// 		template: "<a href='{{myLink}}'>{{myText}}</a>"  //如果没有标签包围，将报错
// 	};
// });
//双向数据绑定
 app.directive("my",function(){
 	return {
 		restrict: "A",
 		replace: true,
 		scope: {
 			myUrl: "=attr",
 			mytext: "@"
 		},
 		template: 
 		"<div><input type='text' ng-model='myUrl'> <a href='{{myUrl}}'>{{mytext}}</a> "
 	}
 });