
 var app = angular.module("myApp",[]);
 app.controller("myController",["$scope","$filter",function($scope,$filter){
 	$scope.name = "aaa";
 	$scope.isCapital = function(str){
// 		console.log(str);
   		return str[0] == str[0].toUpperCase();
 	}
 }]);
 
 //创建自定义过滤器
  app.filter("capitalize",function(){
  	return function(input){
  		return input = input[0].toUpperCase()+input.slice(1);
  	}
  });
