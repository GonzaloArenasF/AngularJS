var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/paso1');
    $stateProvider
        // Home menu y vistas anidadas
        .state('paso1', {
            url: '/paso1',
            templateUrl: 'paso1.html',
            controller: 'Paso1Controller'
        })
        .state('paso2', {
            url: '/paso2',
            templateUrl: 'paso2.html',
            controller: 'Paso2Controller'
        })
        .state('paso3', {
            url: '/paso3',
            templateUrl: 'paso3.html',
            controller: 'Paso3Controller'
        });
});
routerApp.run(function($rootScope,$state,user,$timeout){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if(toState.name != "paso1" && typeof(user.nombre) === 'undefined')
        {
            $timeout(function() {
                $state.go('paso1');
            });
        }
    });
});

routerApp.controller('generalController', function($scope) 
{

    $scope.progress = 15;
    $scope.$on('changeProgress', function(event, value) { 
        $scope.progress = value;
    });

});

routerApp.controller('Paso1Controller', function($scope,$rootScope,$state,user) {
    $rootScope.$broadcast('changeProgress',15);
    $scope.usuario = {};
    $scope.usuario.nombre = user.nombre;
    $scope.usuario.apellido = user.apellido;
    $scope.usuario.sexo = user.sexo;

    $scope.Siguiente = function()
    {

        user.nombre = $scope.usuario.nombre
        user.apellido = $scope.usuario.apellido
        user.sexo = $scope.usuario.sexo
        $state.go("paso2");
    }
;
});

routerApp.controller('Paso2Controller', function($scope,$rootScope,$state,user) {
    $rootScope.$broadcast('changeProgress',50);
    $scope.usuario = user;

    $scope.Siguiente = function()
    {
        user.universidad = $scope.usuario.universidad;
        user.contacto = $scope.usuario.contacto;
        user.militar = $scope.usuario.militar;
        user.edad = $scope.usuario.edad;
        $state.go("paso3");
    }
    $scope.Volver = function()
    {
        user.universidad = $scope.usuario.universidad;
        user.contacto = $scope.usuario.contacto;
        user.militar = $scope.usuario.militar;
        user.edad = $scope.usuario.edad;
        $state.go("paso1");
    }
});

routerApp.controller('Paso3Controller', function($scope,$rootScope,$state,user) {
    $rootScope.$broadcast('changeProgress',100);
    $scope.usuario = user;
    $scope.Volver = function()
    {
        $state.go("paso2");
    }
});

routerApp.factory("user",function(){
    return {};
});


routerApp.filter('esValido', function() {
  return function(texto) {
    console.log(texto);
    if(texto == null)
    {
        return "Sin Informar";
    }
    else
    {
        return texto;
    }

  }
});

routerApp.directive('miTarjeta', miTarjeta);

  function miTarjeta () {
    return {
      restrict: 'E',
      scope: {
        datosUsuario: '=datos'
      },
      templateUrl: 'mitarjeta.html',
  }
}
