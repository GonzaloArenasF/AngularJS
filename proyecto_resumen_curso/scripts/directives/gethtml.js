'use strict';

/**
* @ngdoc directive
* @name wchileformaApp.directive:getHtml
* @description
* # getHtml
*/
angular.module('wchileformaApp')
.directive('getHtml', function () {
    return {
        scope: {
            id: '@'
        },
        template: '<input type="button" ng-click="gethtml()" class="btn btn-success" value="Get HTML"/><HR><code>{{result}}</code>',
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            scope.gethtml = function(){
                scope.result = $("#"+scope.id).html();
            }

        }
    };
});
