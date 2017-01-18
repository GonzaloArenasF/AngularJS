'use strict';

var todoApp = angular.module('todoApp',
[
    'ngRoute',
    'ui.bootstrap',
    'LocalStorageModule'
]
);

todoApp.config(['$routeProvider', '$locationProvider', 'localStorageServiceProvider',
   function($routeProvider, $locationProvider, localStorageServiceProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'MainController'
            })
            .when('/add', {
                templateUrl: 'partials/add.html',
                controller: 'AddController'
            })
            .when('/edit/:task_id', {
                templateUrl: 'partials/edit.html',
                controller: 'EditController'
            })
            .when('/insert/:titleTask', {
                controller: 'InsertController',
                template: ""
            })
            .when('/update/:titleTask/:task_id', {
                controller: 'updateController',
                template: ""
            });

        //para SEO, con "!", los rastreadores saben que es un hashtag con AJAX
        $locationProvider.html5Mode(false).hashPrefix('!');

        localStorageServiceProvider.setPrefix('todoApp');
        localStorageServiceProvider.setStorageType('localStorage');

}]);

todoApp.filter('checkStatus', function() {
  return function(input) {
    return input ? 'Listo' : 'Pendiente';
  };
});
