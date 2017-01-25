/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('krApp', [
	'ui.router',
    'home',
	'krApp.services',
	'krApp.factories',
	'krApp.directives',
	'krApp.filters', 
	'krApp.constant',
	'login',
	'ui.bootstrap',
	'datatables',
    'ngCookies',
    'ngAnimate',
    'toaster',
    'frapontillo.bootstrap-switch',
    'ngStorage',
    'ngDropdowns'
])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'CONSTANTS',
	function($stateProvider, $urlRouterProvider, $httpProvider, CONSTANTS) {   

		//setup http header
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

		$httpProvider.defaults.withCredentials = false;   
 
		// $httpProvider.interceptors.push('AuthInterceptor');

		//setup default route
		$urlRouterProvider.otherwise('/login');
	}
])

.controller('MainController', ['$scope',
	function($scope){
		console.log('Main Controller');
	}
])


//store the current user info in the rootscope
.run(['$rootScope', 'CONSTANTS', '$state', 'AuthService', '$timeout', 'modalFactory', '$q', '$localStorage', '$sessionStorage',

	function($rootScope, CONSTANTS, $state, AuthService,  $timeout, modalFactory, $q, $localStorage, $sessionStorage) {
	    moment.locale("es")  
		$rootScope.currencySign = CONSTANTS.CURRENCY_SIGN;

		//App configuration
		$rootScope.imagePath = CONSTANTS.IMAGE_PATH;
		$rootScope.isSelected = true;

		$rootScope.$on('logout', function(){
			AuthService.logout();
			$state.go('login');
		})

		$rootScope.login_isok=AuthService.isAuthenticated();

		$rootScope.current_state=$state.current.name;

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			$rootScope.current_state=$state.current.name 
			console.log("AuthService.isAuthenticated() ::", AuthService.isAuthenticated() )
			$rootScope.login_isok=AuthService.isAuthenticated();
			if (!AuthService.isAuthenticated()) {
				if (toState.name != 'login'){
					event.preventDefault();
					$state.go('login');
 
				}
			}else{
				if (toState.name == 'login'){
					event.preventDefault();
					$state.go('home.dashboard');
					
				}
			}
		});

		$rootScope.time = new Date();
		$rootScope.fecha = moment().format("dddd");
		$rootScope.$watch('time', function () {
		    $timeout(function () {
		        $rootScope.time = new Date();
		    }, 1000);
		});

		$rootScope.goOut = function(){  
			AuthService.logout(); 
		}

	}

]);
