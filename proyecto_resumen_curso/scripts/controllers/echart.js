'use strict';

/**
 * @ngdoc function
 * @name wchileformaApp.controller:EchartCtrl
 * @description
 * # EchartCtrl
 * Controller of the wchileformaApp
 */
angular.module('wchileformaApp')
  .controller('EchartCtrl', function ($scope) {

    $scope.add = function(){
        $scope.series[4].data.push(parseInt($scope.item))
    }
    $scope.series = [{
            name: 'Asia',
            data: [502, 635, 809, 947, 1402, 3634, 5268]
        }, {
            name: 'Africa',
            data: [106, 107, 111, 133, 221, 767, 1766]
        }, {
            name: 'Europe',
            data: [163, 203, 276, 408, 547, 729, 628]
        }, {
            name: 'America',
            data: [18, 31, 54, 156, 339, 818, 1201]
        }, {
            name: 'Oceania',
            data: [20]
        }]
  });
