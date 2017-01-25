'use strict';

/**
 * @ngdoc function
 * @name wchileformaApp.controller:AscontrollerCtrl
 * @description
 * # AscontrollerCtrl
 * Controller of the wchileformaApp
 */
angular.module('wchileformaApp')
  .controller('AscontrollerCtrl', function () {
    this.awesomeThings = [{text: "AscontrollerCtrl 1", id: 1}];
}).
controller('AscontrollerCtrlChild01', function () {
    this.awesomeThings = [{text: "AscontrollerCtrlChild01 1", id: 2}];
}).
controller('AscontrollerCtrlSubChild01', function () {
      this.awesomeThings = [{text: "AscontrollerCtrlSubChild01 1", id: 3}];
}).
controller('AscontrollerCtrlSubChild02', function () {
      this.awesomeThings = [{text: "AscontrollerCtrlSubChild02 2", id: 3}];
});
