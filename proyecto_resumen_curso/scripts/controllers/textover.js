'use strict';

/**
 * @ngdoc function
 * @name wchileformaApp.controller:TextoverCtrl
 * @description
 * # TextoverCtrl
 * Controller of the wchileformaApp
 */
angular.module('wchileformaApp')
  .controller('TextoverCtrl', function ($scope) {
      $scope.model = {
        word: "",
        palabrasv01: "Well done! You successfully read this important alert message..",
        palabrasv02: "Heads up! This alert needs your attention, but it's not super important."
      };
  });
