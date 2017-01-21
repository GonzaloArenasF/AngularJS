var myApp = angular.module("myapp", ['ngRoute']).config(function($routeProvider){
	$routeProvider.
        when('/', {
	        templateUrl: 'temp.html',
            controller: 'MainCtrl'
	    }).
        when('/mainFix', {
	        templateUrl: 'temp.html',
	        controller: 'MainFixCtrl',
	        resolve: {
	            datos: function ($http) {
                    var config={
                        method:"GET",
                        url:"https://api.github.com/repos/angular/angular.js/issues?state=close"
                    }
	                return $http(config);
	            }
	        }
	    }).
        otherwise({
	        redirectTo: '/'
	    });
});

//versión con resolve
MainFixCtrl.$inject=['$scope','datos'];
function MainFixCtrl($scope, datos) {
    $scope.reverse = true;
    $scope.issues=datos.data;
}

//version sin resolve
MainCtrl.$inject=['$scope','$http'];
function MainCtrl($scope,$http) {
    $scope.reverse = true;
    var config={
        method:"GET",
        url:"https://api.github.com/repos/angular/angular.js/issues?state=open"
    }
    var promise=$http(config);
    promise.then(function(response){
        $scope.issues=response.data;
    },function(response) {
        alert("Fallo la petición:" + response.status);
    })
}




myApp.controller('MainCtrl', MainCtrl);
myApp.controller('MainFixCtrl', MainFixCtrl);
