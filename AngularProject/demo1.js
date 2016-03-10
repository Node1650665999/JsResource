//定义一个模块myApp,为其注入一个控制器myCtr
var app = angular.module('myApp', []);
	//凡是$符号，就是一个angular对象
//	app.controller('myCtrl', function($scope,$timeout) {
//	    var updateClock = function() {
//		$scope.clock = (new Date()).toLocaleString();
//			$timeout(function() {
//				updateClock();
//			}, 1000);
//		};
//		updateClock();
//	});
	
	//通过引用对象属性而非对象本身来绑定数据
	app.controller('myCtrl', function($scope) {
	    $scope.clock = {
	    	now:new Date().toLocaleString()
	    };
	    var updateClock = function(){
	    	$scope.clock.now = new Date().toLocaleString();
	    };
	    setInterval(function(){
	    	$scope.$apply(updateClock)
	    },1000);
	});
	
