var myApp = angular.module("myapp", []);

myApp.controller('LoginController', function ($scope) {

    $scope.formData = {};

    $scope.login = false;

    $scope.arrUser = [
    	{
    		email: 'user1@correo.cl',
    		pass: '123'
    	},
    	{
    		email: 'user2@correo.cl',
    		pass: '456'
    	}
    ];

    $scope.searchUser = function () {

    	var email = $scope.formData.email;
    	var password = $scope.formData.password;
    	var state = false;

    	for (arrUser_i=0; arrUser_i < $scope.arrUser.length; arrUser_i++) {

    		if ($scope.arrUser[arrUser_i].email == email && $scope.arrUser[arrUser_i].pass == password) {
    			state = true; break;
    		}
    	}

    	return state;

    }

    $scope.doLogin = function () {

    	$scope.login = $scope.searchUser();

    };
    
});
