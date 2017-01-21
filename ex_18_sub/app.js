var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.factory('user', function() {

    return {

        nombre: '',
        apellido: '',
        direccion: '',
        comuna: ''

    };

});

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
        
        .state('sub1', {
            url: '/sub1',
            templateUrl: 'sub1.html',
            controller: 'sub1Controller'
        })
        
        .state('sub2', {
            url: '/sub2',
            templateUrl: 'sub2.html',
            controller: 'sub2Controller'
        })

        .state('sub3', {
            url: '/sub3',
            templateUrl: 'sub3.html',
            controller: 'sub3Controller'
        })
});

routerApp.controller('sub1Controller', function($scope, user, $state) {

    $scope.nombre = '';
    $scope.apellido = '';

    $scope.toSub2 = function () {

        user.nombre = $scope.nombre;
        user.apellido = $scope.apellido;

        $state.go('sub2');
    };

}); 

routerApp.controller('sub2Controller', function($scope, user, $state) {

    $scope.direccion = '';
    $scope.comuna = '';

    $scope.toSub3 = function () {

        user.direccion = $scope.direccion;
        user.comuna = $scope.comuna;

        $state.go('sub3');

    };

}); 

routerApp.controller('sub3Controller', function($scope, user) {

    $scope.user = user;

}); 

