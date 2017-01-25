'use strict';

/**
 * @ngdoc directive
 * @name wchileformaApp.directive:nghReplaceDir
 * @description
 * # nghReplaceDir
 */
angular.module('wchileformaApp')
  .directive('nghReplaceDir', function () {
      return {
            replace: true,
            template:
              '<div style="font-size: 18px;" >\n\n' +
                'Directiva <strong>nghReplaceDir</strong> scope impresión: <em>{{myScopeVar}}</em>\n\n' +
              '</div>',
            link: function (scope, element, attrs)
            {
                var mouseover = function() {
                    element.css( "color", "red" );
                };
                var mouseleave = function() {
                    element.css( "color", "blue" );
                };
                element.bind('mouseover', mouseover);
                element.bind('mouseleave', mouseleave);


            }
          };
  });
