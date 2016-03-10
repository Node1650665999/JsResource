
 var app = angular.module("myApp",[]);
 //控制器的事件
 app.controller("myController",function($scope,$interpolate){
// 	$scope.count = 0;
// 	$scope.add = function(num){
// 		$scope.count += num;
// 	};
// 	$scope.subtract = function(num){
// 		if($scope.count > 0){
// 			$scope.count -= num;
// 		}else{
// 			$scope.count = 0;
// 		}
// 	};

      // Set up a watch
      $scope.$watch('emailBody', function(body) {
        if (body) {
          var template = $interpolate(body);
          $scope.previewText = template({to: $scope.to});
//	        console.log($scope.previewText);
        }
      });
   	
	   	
 });
 
 //控制器嵌套(作用域包含作用域),沿着作用域链查找对象
 app.controller("parentController",function($scope){
 	$scope.parent= {
 		name: "张安"
 	}
 });
 
 app.controller("sonController",function($scope){
 	$scope.show = function(){
 		$scope.parent.age = 45;
 	};
 });
 
 //手动修改表达式，AngularJS通过 $parse 这个内部服务来进行表达式的运算
 app.controller("parseController",function($scope,$parse){
 	$scope.$watch("exp",function(newVal,oldval,scope){
 		if(newVal !== oldval){
   			var parseFun = $parse(newVal);
			$scope.parseValue = parseFun(scope);
 		}
 	});
 });
 
 
 
 
 
 
 
 
 
