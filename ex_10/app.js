var myApp = angular.module("myapp", []);

//servicios - service - return object
function Rectangulo() {

  this.ancho=0;
  this.alto=0;

  this.setAncho=function(ancho) {
    this.ancho=ancho;
  };

  this.setAlto=function(alto) {
    this.alto=alto;
  };

  this.getArea=function() {
    return this.ancho * this.alto;
  };
  
}

myApp.service("rectangulo",Rectangulo);

//si no inyectamos el servicio, no se instancia
myApp.controller("MainController",["$scope","rectangulo","$rootScope",function($scope,rectangulo, $rootScope) {

  rectangulo.setAncho(3);
  rectangulo.setAlto(6);
  $scope.area=rectangulo.getArea();

  //Eventos
  $scope.doEvent = function(){
      console.log("init");
      //emitimos al general
      $rootScope.$broadcast('otroEvento', [1,4,5,6,9]);
  };

  $scope.$on('otroEvento', function(event, numeros) {
      console.log(1,numeros);
  });

}]);

myApp.controller("OtroController",["$scope","rectangulo",function($scope,rectangulo) {
    $scope.$on('otroEvento', function(event, numeros) {
        console.log(2, numeros);
    });
}]);
