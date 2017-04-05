
var myApp = angular.module("myapp", ['ngRoute'])


/*
    Rutas configuradas
 */
.config(function($routeProvider){
	$routeProvider
    	.when('/sub2',{
    		templateUrl: 'partials/sub2.html',
            controller: 'controllerSub2'
    	})
    	.when('/sub1/:id?',{
    		templateUrl:'partials/sub1.html',
    		controller:'controllerSub1'
    	})
    	.otherwise({redirectTo:'/sub1'});

});

/*
    Servicio de consumo de datos
 */
myApp.service("getPosts", function($http, servicio) {

    this.getServicio = function ($http, servicio) {
        return $http.get(ser);
    };

});

/*
    Controller del SUB1 - Posts
 */
myApp.controller("controllerSub1", function ($scope, getPosts) {
    
    getPosts.getServicio("https://jsonplaceholder.typicode.com/posts")
        .then (function(res) {
            $scope.posts = res.data;
    });

});

/*
    Controller del SUB2 - Comments
 */
myApp.controller("controllerSub2", function ($scope, $http) {

    $http.get("https://jsonplaceholder.typicode.com/posts/1/comments")
        .then(function(response) {
            console.debug(response);
            $scope.comments = response.data;
    });

});


/*
    Pruebas de clases
 */
myApp.controller("MainController", function($scope, $routeParams){
    //$location.path('/admin')
    console.log($routeParams.id)
    $scope.nombre ="HOLA MUNDO";

});