'use strict';

/**
 * @ngdoc directive
 * @name wchileformaApp.directive:elementDir
 * @description
 * # elementDir
 */
angular.module('wchileformaApp')
  .directive('elementDir', function () {
      return {
        scope: true,
        restrict: "E",
        template: "<strong>elementDir</strong>"
      };
  });
