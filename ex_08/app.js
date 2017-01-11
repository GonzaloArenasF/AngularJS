var myApp = angular.module("myapp", []);

//servicios, llamado clásico
myApp.controller('MainController', function($scope, $log, $http) {

    var response=$http({
        method:"GET",
        url:"datos.json"
    });

    response.success(function(data, status, headers, config) {
        $scope.seguro=data;
        $log.debug(data);
    });

    response.error(function(data, status, headers, config) {
        $log.warning("Ha fallado la petición. Estado HTTP:"+status);
    });

});

//más ofuscado* - para minificaciones
myApp.controller('MainMinController',['$scope','$log', '$http',function(s,l, $http) {
    l.info("Acabamos de minificar los params");
    l.error("Param",l)

    var response=$http({
        method:"POST",
        data: {id: 988},
        url:"datos.php"
    });

    response.success(function(data, status, headers, config) {
        l.debug("PHP: ", data);
    });

}]);
