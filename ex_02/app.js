angular.module("myapp", [])
.controller("HelloController", function($scope) {
    $scope.helloTo = {};
    $scope.helloTo.title = "MUNDO MEJORADO, AngularJS";
})





.controller("OtroController", function($scope) {
    $scope.add=function() {
        $scope.lista.push({nombre: 'Otro'})
    };
    
    $scope.persona = {
        id: 4,
        apellido: "perez",
        edad: 33
    };
    
    $scope.lista = [
        {
            nombre: "Elemento #1"
        },{
            nombre: "Elemento #2"
        },{
            nombre: "Elemento #3"
        },{
            nombre: "Elemento #4"
        }
    ];

    $scope.eliminar = function (indice) {
        $scope.lista.splice(indice, 1);
    };

} );
