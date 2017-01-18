var myApp = angular.module("myapp", []);

myApp.controller('MainController', function ($scope) {
    $scope.formData={};
    $scope.requeridoNombre=true;
    $scope.patternNombre=/^[a-zA-Z]*$/;

});
