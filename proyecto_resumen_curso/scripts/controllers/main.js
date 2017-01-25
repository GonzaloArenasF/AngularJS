'use strict';

/**
 * @ngdoc function
 * @name wchileformaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wchileformaApp
 */
angular.module('wchileformaApp')
  .controller('MainCtrl', function ($scope, productosData) {

      $scope.ideas = [
                    {
                          name: " ",
                          y: 56.33
                      }, {
                          name: " ",
                          y: 24.030000000000005
                      }, {
                          name: " ",
                          y: 10.38
                      }, {
                          name: " ",
                          y: 14.77
                      }, {
                          name: " ",
                          y: 10.9100000000000001
                      }, {
                          name: " ",
                          y: 10.2,
                          drilldown: null
                      }, {
                          name: " ",
                          y: 20.2,
                          drilldown: null
                      }, {
                          name: " ",
                          y: 60.2,
                          drilldown: null
                      }, {
                          name: " ",
                          y: 50.2,
                          drilldown: null
                      }, {
                          name: " ",
                          y: 30.2,
                          drilldown: null
                      }, {
                          name: " ",
                          y: 40.2,
                          drilldown: null
                      }
      ];

      $scope.limitedIdeas = $scope.ideas;

        function resetLista(){
            $scope.lista = [];
            $scope.lista = productosData.slice(0, 24);
        }
        resetLista();

        $scope.$watch('searchItem', function(newValue, oldValue) {
            if(newValue){
                $scope.lista = productosData;
            }else{
                resetLista();
            }
        });

        $scope.verMas = function() {

            var last = $scope.lista.length - 1;
            //console.log('last:',last)
            for(var i = 1; i <= 8; i++) {
                $scope.lista.push(productosData[last + i]);
            }
        };

  });
