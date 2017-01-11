var myApp = angular.module("myapp", []);

    
myApp.service('MathService', function() {
    
    this.multiply = function(a, b) {
		return a * b;
	};

});


myApp.service('CalculatorService', function(MathService){
    
    this.square = function(a) {
		return MathService.multiply(a,a);
	};
    
    this.cube = function(a) {
		return MathService.multiply(a, MathService.multiply(a,a));
	};

    this.calExponente = function(x, y) {
        return Math.pow(x, y);
    };

});



myApp.controller('MainController', function($scope, CalculatorService, $http) {
    
    $scope.doSquare = function() {
        $scope.answer = CalculatorService.square($scope.number);
    };
    
    $scope.doCube = function() {
        $scope.answer = CalculatorService.cube($scope.number);
    };

    $scope.doExp = function() {
        $scope.answer = CalculatorService.calExponente($scope.number, $scope.exp);
    };

});

myApp.filter('formatoNumerico', function () {
    return function (num) {

        
        
        return num*2;
    };
});
