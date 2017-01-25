'use strict';

/**
 * @ngdoc function
 * @name wchileformaApp.controller:ProductoCtrl
 * @description
 * # ProductoCtrl
 * Controller of the wchileformaApp
 */
angular.module('wchileformaApp')
  .controller('ProductoCtrl', function ($scope, $routeParams, generalService, itemService, productoDetalle) {
      $scope.producto = angular.toJson(productoDetalle);

      console.log(angular.toJson(productoDetalle, true))

  });
