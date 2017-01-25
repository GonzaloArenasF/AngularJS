'use strict';

/**
 * @ngdoc directive
 * @name wchileformaApp.directive:nghTemplateDir
 * @description
 * # nghTemplateDir
 */
angular.module('wchileformaApp')
  .directive('nghTemplateDir', function () {
      return {
          template: 'Directiva <strong>nghTemplateDir</strong> , scope impesión: <em>{{myScopeVar}}</em>'
        };
  });
