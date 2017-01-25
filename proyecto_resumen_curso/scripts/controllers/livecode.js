'use strict';

/**
 * @ngdoc function
 * @name wchileformaApp.controller:LivecodeCtrl
 * @description
 * # LivecodeCtrl
 * Controller of the wchileformaApp
 */
angular.module('wchileformaApp')
  .controller('LivecodeCtrl', function ($scope) {
      $scope.name = "Juan";
      $scope.job = "Programador";

    $scope.subSource = "var i = 0;\n\
i++;\n\
function(){}";
  });
