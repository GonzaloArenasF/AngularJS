'use strict';

/**
 * @ngdoc directive
 * @name wchileformaApp.directive:withControl
 * @description
 * # withControl
 */
angular.module('wchileformaApp')
  .directive('withControl', function () {
    return {
        scope: {},
        restrict: 'AE',
        template: '<input placeholder="Nombre de item" class="form-control" type="text" ng-model="nombre" /><br><input class="btn btn-success" type="button" value="add" ng-click="addChild()" /> <hr><div ng-repeat="it in list track by $index" class="alert alert-success" ><button type="button" class="close" ng-click="delete($index)"><span aria-hidden="true">&times;</span></button>{{$index}}. Item: <b>{{it}}</b></div>',
        controller: function($scope, $compile, $http) {
          $scope.list = ["uno", "dos", "tres"]
          $scope.addChild = function() { // this refers to the controller
            $scope.list.push($scope.nombre)
          };
          $scope.delete = function(indx) { // this refers to the controller
            $scope.list.splice(indx, 1)
          };
        }
    };
  });
