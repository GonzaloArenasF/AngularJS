var myApp = angular.module("myapp", []);


myApp.service('MathService', function() {
    this.multiply = function(a, b) {
		return a * b
	};
});

myApp.service('CalculatorService', function(MathService){
    this.square = function(a) {
			return MathService.multiply(a,a);
	};
    this.cube = function(a) {
			return MathService.multiply(a, MathService.multiply(a,a));
	};
});



myApp.controller('MainController', function($scope, CalculatorService) {
    $scope.doSquare = function() {
        $scope.answer = CalculatorService.square($scope.number);
    }
    $scope.doCube = function() {
        $scope.answer = CalculatorService.cube($scope.number);
    }
});
