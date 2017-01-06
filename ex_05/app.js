
var myApp = angular.module("myapp", ['ngRoute'])


.config(function($routeProvider){
	$routeProvider
    	.when('/sub2',{
    		templateUrl:'partials/sub2.html'
    	})
    	.when('/sub1/:id?',{
    		templateUrl:'partials/sub1.html',
    		controller:'MainController'
    	})
    	.otherwise({redirectTo:'/sub1'});

});


myApp.controller("MainController", function($scope, $routeParams){
	//$location.path('/admin')
	console.log($routeParams.id)
	$scope.nombre ="HOLA MUNDO";

});
