/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('login', [
])

.config(['$stateProvider', 'CONSTANTS',
 
	function ($stateProvider, CONSTANTS) {
		$stateProvider
			.state('login', {
				url:'/login',
				templateUrl: CONSTANTS.DIR_PATH + 'app/login/login.tpl.html',
				controller: 'LoginController'
			})
	}

])

.controller('LoginController', ['$scope', '$state', 'AuthService',
	function($scope, $state, AuthService){
	    $scope.err_msg = ""; 
	    $scope.isError = 0;
        $scope.isCargando = false;

		//setting user email and password in the template
		$scope.user = {
		    run: '14543367',
			digito: '3',
		    password: 'Admin1234' 
		};

		$scope.login = function (user) {
		    $scope.isCargando = true;
            var promise = AuthService.login(user);
            promise.then(
        		function (result) { 
        		    console.log(result);
        		    $state.go('home.dashboard');
        		},
                function (r) {
					console.log("ERORRR")
                    $scope.err_msg = r;
                    $scope.isError = 1;
                    $scope.isCargando = false;
                }
        	);

        }

		$scope.onBlurRun = function(){
			try{
				$scope.user.run = $scope.user.run.replace(/\./g,'');
			}catch(e){
				console.log("without >>.<<",e)
			}
			
			$scope.user.run = parseInt($scope.user.run)

		}




	}
]);
