var myApp = angular.module("app", []);

myApp.controller("MyCtrl", function($scope, $q, $http, $timeout) {

    $scope.valorBusqueda = "un texto, y otro más";

    //ejemplo extra estilo "then"
    $scope.thenTest = function() {
        $http.get("./data/first.json").then(function(firstResult){
           
           
           
           
           return $http.get("./data/second.json");
        })
        .then(function(secondResult){
           return $http.get("./data/third.json");
        })
        .then(function(thirdResult){
           console.log("thirdResult: ", thirdResult)
        });
    }

  //ejemplo piramidal
  $scope.nestedTest = function() {
    tmp = [];
    //cascada
    $http.get("./data/first.json").success(function(data) {
      tmp.push(data);
      $http.get("./data/second.json").success(function(data) {
        tmp.push(data);
        $http.get("./data/third.json").success(function(data) {
          tmp.push(data);
          $scope.combinedNestedResult = tmp;
        });
      });
    });
  };

  //3 request al mismo tiempo
  $scope.allTest = function() {
    var first  = $http.get("./data/first.json"),
        second = $http.get("./data/second.json"),
        third  = $http.get("./data/third.json");
        first.then(function(r){
          alert(r)
        })

    $q.all([first, second, third]).then(function(result) {
      var tmp = [];
      console.log(result)
      angular.forEach(result, function(response) {
        tmp.push(response.data);
      });
      return tmp;
    }).then(function(result) {
      $scope.combinedResult = result;
    });
  };


  //funcion extract
  $scope.busquedaEspecial = function(){
        var search = $scope.valorBusqueda;
        $scope.keywords = search.split(',');
        console.log(1, $scope.keywords)
  }
  $scope.busquedaEspecial();

});
