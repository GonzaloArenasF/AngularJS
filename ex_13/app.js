
var myApp = angular.module("myapp", ['ngRoute']).config(function($routeProvider){
	//la plantulla puede ser física o un script
	$routeProvider.
		when('/list', {
	        templateUrl: '/list.html'
	    }).
		when('/detail/:id/', {
	        templateUrl: '/detail.html',
	        controller: 'DetailCtrl',
			//una vez la promesa se cumpla exitosamente, carga el controller
	        resolve: {
	            datos: function ($route, dataService) {
					//podemos inyectar servicios externos o internos como $route
	                return dataService.load($route.current.params.id);
	            }
	        }
	    }).
		otherwise({
	        redirectTo: '/list'
	    });
});

//fase run, donde inyectamos servicios instanciados
myApp.run(function ($rootScope) {

	$rootScope.$on("$routeChangeError", function () {
		console.error("falló al cambiar rutas");
	});
	$rootScope.$on("$routeChangeSuccess", function () {
		console.log("cambio de rutas exitoso");
	});

});

//controller inyectando la respuesta de resolve.
myApp.controller('DetailCtrl', function ($scope, $location, $rootScope, dataService) {
    $scope.data = dataService.data;

    $scope.back = function () {
        $location.path('/list');
    };
});

//servicio con timeout
myApp.factory('dataService', function ($q, $timeout) {
    return {
        data : {},
        load : function(id) {
            var defer = $q.defer();
            var data = this.data;
            $timeout(function () {
                data.id = id;
                defer.resolve(data);
            }, 1000);
            return defer.promise;
        }
    };
});
