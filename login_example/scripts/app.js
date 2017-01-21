'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('BasicHttpAuthExample', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html'
        })

        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })

        .otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // con cookies mantendrtemos logeado incluso si damos F5
        $rootScope.globals = $cookieStore.get('globals') || {};


        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirecciona si no esta logeado
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
