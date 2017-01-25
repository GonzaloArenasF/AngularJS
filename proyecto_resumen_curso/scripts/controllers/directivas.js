'use strict';

/**
* @ngdoc function
* @name wchileformaApp.controller:DirectivasCtrl
* @description
* # DirectivasCtrl
* Controller of the wchileformaApp
*/
angular.module('wchileformaApp')
.controller('DirectivasCtrl', function ($scope) {
    $scope.myScopeVar = "Scope controlador <<DirectivasCtrl>>";


    //directiva withAttrs
    var counter = 0;
    $scope.customer = {
        name: 'Juan',
        street: '1234 sector 5.'
    };

    $scope.customers = [];

    $scope.addCustomer = function (data) {
        console.log(1, data)
        counter++;
        $scope.customers.push({
            name: (data) ? data : 'Nuevo cliente' + counter,
            street: counter + '.'
        });
    };

    $scope.changeData = function () {
        counter++;
        $scope.customer = {
            name: 'James',
            street: counter + '.'
        };
    };
});
