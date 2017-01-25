'use strict';

/**
 * @ngdoc function
 * @name wchileformaApp.controller:ElementCtrl
 * @description
 * # ElementCtrl
 * Controller of the wchileformaApp
 */
angular.module('wchileformaApp')
  .controller('ElementCtrl', function ($scope) {
      $scope.$on('onChangeRoute', function (event, data) {
          $scope.codeInside = data;
          $scope.$digest();
      });
  });
