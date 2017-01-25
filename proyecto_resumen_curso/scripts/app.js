'use strict';

/**
 * @ngdoc overview
 * @name wchileformaApp
 * @description
 * # wchileformaApp
 *
 * Main module of the application.
 */
angular
  .module('wchileformaApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'infinite-scroll',
    'hljs',
    'ui.bootstrap',
    'smart-table',
    'ngMaterial'
  ])
  .config(function ($routeProvider, $locationProvider, hljsServiceProvider, $mdIconProvider) {
    // provider-injector
    // Sólo puedes inyectar Providers (no instancias)

    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
            productosData: function(generalService){
                return generalService.query().$promise;
            }
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/livecode', {
        templateUrl: 'views/livecode.html',
        controller: 'LivecodeCtrl'
      })
      .when('/textover', {
        templateUrl: 'views/textover.html',
        controller: 'TextoverCtrl'
      })
      .when('/texsearch', {
        templateUrl: 'views/textsearch.html',
        controller: 'TexsearchCtrl'
      })
      .when('/producto/detalle/:id', {
        templateUrl: 'views/producto/detalle.html',
        controller: 'ProductoCtrl',
        resolve: {
           productoDetalle : function(itemService, $routeParams) {
               return itemService.getResource($routeParams.id).$promise;
           }
        }
      })
      .when('/ascontroller', {
        templateUrl: 'views/ascontroller.html',
        controller: 'AscontrollerCtrl',
        controllerAs: 'parentAs'
      })
      .when('/element', {
        templateUrl: 'views/element.html',
        controller: 'ElementCtrl',
        controllerAs: 'element'
      })
      .when('/pagination', {
        templateUrl: 'views/pagination.html',
        controller: 'PaginationCtrl'
      })
      .when('/pagination', {
        templateUrl: 'views/pagination.html',
        controller: 'PaginationCtrl',
        controllerAs: 'pagination'
      })
      .when('/directivas', {
        templateUrl: 'views/directivas.html',
        controller: 'DirectivasCtrl',
        controllerAs: 'directivas'
      })
      .when('/echart', {
        templateUrl: 'views/echart.html',
        controller: 'EchartCtrl',
        controllerAs: 'echart'
      })
      .when('/amaterial', {
        templateUrl: 'views/amaterial.html',
        controller: 'AmaterialCtrl',
        controllerAs: 'amaterial'
      })
      .otherwise({
        redirectTo: '/'
      });
      //al activarlo tiene que configurarse el webserver para el correcto uso
      $locationProvider.html5Mode(false);

      //provider de la libreria para livecode
      hljsServiceProvider.setOptions({
          tabReplace: '    '
      });

      //agregamos los iconos de font awesome
      $mdIconProvider.fontSet('fa', 'fontawesome');
  })
  .run(function (generalService, $rootScope, $location) {
      //Tu sólo puedes inyectar instancias (no Providers)
      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
          var src = $location.path().replace("/", "")
          if(!src){
              src = "home";
          }
          var client = new XMLHttpRequest();
          client.open('GET', "./scripts/controllers/"+src+".js");
          client.onreadystatechange = function() {
              $rootScope.$broadcast('onChangeRoute', client.responseText);
          }
          client.send();
      });
  });
