var myApp = angular.module("myapp", []);

//servicios - value
myApp.value("idioma","es-es");

myApp.value("matematicas_simples",{
  sumar:function(a,b) {
    return a+b;
  },
  restar:function(a,b) {
    return a-b;
  }
});

myApp.value("radio",10);

myApp.value("area",function(radio) {
  return 3.1416*radio*radio;
})


myApp.factory('datosService', function($http) {
	return {
		getComments: function(id){
			return $http.get("http://jsonplaceholder.typicode.com/posts/"+id+"/comments");
		}
	}
});

myApp.controller('MainController', function($scope,$timeout, datosService) {
    $scope.generarEvento="NO";

    $timeout(function() {
      $scope.generarEvento="SI";
    },3000);
    
    
    datosService.getComments(1).then(function(response){
      $scope.listadoc = response.data;
          
    }); 

});

myApp.controller("ValoresController",["$scope","idioma","matematicas_simples","radio","area",
function($scope,idioma,matematicas_simples,radio,area) {

  $scope.idioma=idioma;
  $scope.suma=matematicas_simples.sumar(3,6);
  $scope.area=area(radio);
}]);
