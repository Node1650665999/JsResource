// angular.module("myApp",[]).run(function($rootScope,$timeout){
// 	$timeout(function(){
// 		$rootScope.myHref = "http://www.baidu.com";
// 	},2000);
// });
// angular.module("myApp",[]).run(function($rootScope,$timeout){
// 	$timeout(function(){
// 		$rootScope.imgSrc = "http://docs.angularjs.cn/img/angularjs-for-header-only.svg";
// 	},2000);
// });

// ng-repeat
//	var app = angular.module("myApp",[]);
//	app.controller("peopleController",function($scope){
//		$scope.people= [
//			{name: "zhsngan", city: "hangzhou"},
//			{name: "lisi", city: "jinan"}
//		];
//	});

// ng-form
//angular.module('myApp', [])
//	.controller('FormController', function($scope) {
//		$scope.fields = [{
//			placeholder: 'Username',
//			isRequired: true
//		}, {
//			placeholder: 'Password',
//			isRequired: true
//		}, {
//			placeholder: 'Email (optional)',
//			isRequired: true
//		}];
//		$scope.submitForm = function() {
//			alert("it works!");
//		};
//	});

// ng-select
/*	angular.module('myApp', [])
		.controller('CityController', function($scope) {
			$scope.cities = [{
				name: 'Seattle'
			}, {
				name: 'San Francisco'
			}, {
				name: 'Chicago'
			}, {
				name: 'New York'
			}, {
				name: 'Boston'
			}];
		});
*/

//隔离作用域，当scope为一个对象时，将会创建一个隔离作用域， scope 参数的值必须通过 {} 或 true 设置成隔离作用域
/*angular.module('myApp', [])
	.directive('myDirective', function() {
		return {
			restrict: 'A',
			template: ' myDirective, isolate scope: {{ myProperty }}',
			scope: {}
		};
	})
	.directive('myInheritScopeDirective', function() {
		return {
			restrict: 'A',
			template: 'Inside myDirective, isolate scope: {{ myProperty }}',
			scope: true
		};
	});*/
// transclude 嵌入，从DOM元素中获取的内容放到它发现 ng-transclude指令的地方
/*	angular.module('myApp', [])
		.directive('sidebox', function() {
			return {
				restrict: 'EA',
				scope: {
					title: '@'
				},
				transclude: true,
				template: '<div class="sidebox">\
	<div class="content">\
	<h2 class="header">{{ title }}</h2>\
	<span class="content" ng-transclude>\
	</span>\
	</div>\
	</div>'
			};
		});*/
		

// Controller  当设置为字符串时， 会以字符串的值为名字，来查找注册在应用中的控制器的构造函数：
	/*angular.module('myApp', [])
		.directive('myDirective', function() {
			restrict: 'A', // 始终需要
			controller: 'SomeController'
		})
		// 应用中其他的地方，可以是同一个文件或被index.html包含的另一个文件
	angular.module('myApp')
		.controller('SomeController', function($scope, $element, $attrs, $transclude) {
			// 控制器逻辑放在这里
		});
//	可以在指令内部通过匿名构造函数的方式来定义一个内联的控制器：
	angular.module('myApp', [])
		.directive('myDirective', function() {
			restrict: 'A',
			controller: function($scope, $element, $attrs, $transclude) {
				// 控制器逻辑放在这里
			}
		});*/
	
//	angular.module('myApp')
//	.directive('link', function() {
//		return {
//			restrict: 'EA',
//			transclude: true,
//			controller: function($scope, $element, $transclude, $log) {
//				$transclude(function(clone) {
//					var a = angular.element('<a>');
//					a.attr('href', clone.text());
//					a.text(clone.text());
//					$log.info("Created new a tag in link directive");
//					$element.append(a);
//				});
//			}
//		};
//	});	

	//ControllerAs，用来设置控制器的别名， 可以以此为名来发布控制器， 并且作用域可以访
//问 controllerAs 。这样就可以在视图中引用控制器，甚至无需注入 $scope
	angular.module('myApp')
		.directive('myDirective', function() {
			return {
				restrict: 'A',
				template: '<h4>{{ myController.msg }}</h4>',
				controllerAs: 'myController',
				controller: function() {
					this.msg = "Hello World"
				}
			};
		});




























