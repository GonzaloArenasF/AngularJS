'use strict';

/**
* @ngdoc directive
* @name wchileformaApp.directive:withAttrs
* @description
* # withAttrs
*/
angular.module('wchileformaApp')
.directive('withAttrs', function () {
    return {
        restrict: 'EA',
        scope: {
            datasource: '=',
            add: '=',
            tit: '@titulo'
        },
        controller: function ($scope) {

            $scope.addCustomer = function () {
                $scope.add();

            };
        },
        template: '<button class="btn btn-primary" ng-click="addCustomer()">Ejecutar</button><br><h4>{{tit}}</h4><ul class="list-group"><li class="list-group-item" ng-repeat="cust in datasource">{{ cust.name }}</li></ul>'
    };
});
