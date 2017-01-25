'use strict';

/**
 * @ngdoc directive
 * @name wchileformaApp.directive:attributeDir
 * @description
 * # attributeDir
 */
angular.module('wchileformaApp')
  .directive('attributeDir', function () {
      return {
        scope: true,
        restrict: "A",
        template: "<strong>attributeDir:</strong> {{value}}",
        link: function (scope, element, attrs)
        {
          scope.value = attrs.attributeDir;
        }
      };
  });
