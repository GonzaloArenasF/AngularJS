var routerApp = angular.module('routerApp', ['ui.router']);
routerApp.provider('movie', function () {
  var version;
  return {
    setVersion: function (value) {
      version = value;
    },
    $get: function () {
      return {
          title: 'The Matrix' + ' ' + version
      };
    }
  };
});

routerApp.config(function($stateProvider, $urlRouterProvider, movieProvider) {
    movieProvider.setVersion("asdas");
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        // Home menu y vistas anidadas
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html',
            controller: 'animalesController'
        })
        // vista hija
        .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html'
        })
        // hija lista de texto
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'Texto simple en home.paragraph.{{animales}}'
        })
        // Multi vistas
        .state('about', {
            url: '/about/:txt?',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'otra': { template: 'Otra vista Mas' },
                'columnOne@about': { template: 'La primera columna!' },
                'columnTwo@about': {
                    templateUrl: 'table-data.html',
                    controller: 'nombresController'
                }
            }

        });
});

routerApp.controller('animalesController', function($scope, movie,$state) {
    console.log(movie.title);
    console.log($state, $state.$current.name);
    $scope.animales = ['Gato', 'Oso', 'Perro'];
});

routerApp.controller('nombresController', function($scope, $stateParams) {
    $scope.message = 'test';
    $scope.nombres = [
        {
            name: 'Macallan '+$stateParams.txt,
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
});
