var myApp = angular.module("myapp", []);

//servicios - factory&http&RestFULL
myApp.factory('dataFactory', ['$http', function($http) {

    var urlBase = '/api/restAPI';
    var dataFactory = {};

    dataFactory.getCustomers = function () {
        return $http.get(urlBase);
    };

    dataFactory.getCustomer = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.insertCustomer = function (cust) {
        return $http.post(urlBase, cust);
    };

    dataFactory.updateCustomer = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    dataFactory.deleteCustomer = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    dataFactory.getOrders = function (id) {
        return $http.get(urlBase + '/' + id + '/orders');
    };

    return dataFactory;
}]);



//controlador
myApp.controller('MainController', ['$scope', 'dataFactory',
        function ($scope, dataFactory) {


    $scope.updateCustomer = function (id) {
        //Fake customer data
        var cust = {
            ID: id,
            FirstName: 'NOMBRE',
            LastName: 'APELLIDO'
        };

        dataFactory.updateCustomer(cust)
          .success(function () {
              $scope.status = 'Actualizado!.';
          });
    };

    $scope.insertCustomer = function () {
        //Fake customer data
        var cust = {
            ID: 10,
            FirstName: 'NOMBRE',
            LastName: 'APELLIDO'
        };
        dataFactory.insertCustomer(cust)
            .success(function () {
                $scope.status = 'Insertado!.';
                $scope.customers.push(cust);
            });
    };

    $scope.getCustomerOrders = function (id) {
        dataFactory.getOrders(id)
        .success(function (orders) {
            $scope.status = 'Listo!';
            $scope.orders = orders;
        });
    };


    $scope.updateCustomer(1);
    $scope.insertCustomer();
    $scope.getCustomerOrders(1);



}]);
