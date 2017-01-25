'use strict';

/**
 * @ngdoc function
 * @name wchileformaApp.controller:AmaterialCtrl
 * @description
 * # AmaterialCtrl
 * Controller of the wchileformaApp
 */
angular.module('wchileformaApp')
  .controller('AmaterialCtrl', function ($scope) {
      //array string
      $scope.lista = ['Chile','Argentina','Peru']

      $scope.isOpen = false;
      $scope.demo = {
        isOpen: false,
        count: 0,
        selectedAlignment: 'md-left'
      };

      
  });
