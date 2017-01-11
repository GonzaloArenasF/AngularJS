var myApp = angular.module("myapp", [])

.directive('attributeDir', function () {
    return {
        scope: true,
        restrict: "A",
        template: "<strong>attributeDir:</strong> {{value}}",
        link: function (scope, element, attrs) {
            scope.value = attrs.attributeDir;
        }
    };
})

.directive('elementDir', function () {
    return {
        scope: true,
        restrict: "E",
        template: "<strong>elementDir</strong>"
    };
})

.directive('nghTemplateDir', function () {
    return {
        template: 'Directiva <strong>nghTemplateDir</strong> , scope impesión: <em>{{myScopeVar}}</em>'
    };
})

.directive('nghReplaceDir', function () {
    return {
        replace: true,
        template:
            '<div style="font-size: 18px;" >\n\n' +
            'Directiva <strong>nghReplaceDir</strong> scope impresión: <em>{{myScopeVar}}</em>\n\n' +
            '</div>',
        link: function (scope, element, attrs) {
            var mouseover = function() {
                element.css( "color", "red" );
            };
            var mouseleave = function() {
                element.css( "color", "blue" );
            };
            element.bind('mouseover', mouseover);
            element.bind('mouseleave', mouseleave);

        }
    };
})

.directive('withAttrs', function () {
    return {
        restrict: 'EA',
        scope: {
            datasource: '=',
            add: '=',
            tit: '@titulo'
        },
        controller: function ($scope) {

            $scope.addCustomer = function () {
                $scope.add();

            };
        },
        template: '<button class="btn btn-primary" ng-click="addCustomer()">Ejecutar</button><br><h4>{{tit}}</h4><ul class="list-group"><li class="list-group-item" ng-repeat="cust in datasource">{{ cust.name }}</li></ul>'
    };
}) 

.directive('withControl', function () {
    return {
        scope: {},
        restrict: 'AE',
        template: '<input placeholder="Nombre de item" class="form-control" type="text" ng-model="nombre" /><br><input class="btn btn-success" type="button" value="add" ng-click="addChild()" /> <hr><div ng-repeat="it in list track by $index" class="alert alert-success" ><button type="button" class="close" ng-click="delete($index)"><span aria-hidden="true">&times;</span></button>{{$index}}. Item: <b>{{it}}</b></div>',
        controller: function($scope, $compile, $http) {
          $scope.list = ["uno", "dos", "tres"]
          $scope.addChild = function() { // this refers to the controller
            $scope.list.push($scope.nombre)
          };
          $scope.delete = function(indx) { // this refers to the controller
            $scope.list.splice(indx, 1)
          };
        }
    };
})

.directive('myLista', function () {

    var html  = '<ul class="list-group">';
        html += '   <li class="list-group-item" ng-repeat="dato in datos">';
        html += '       <span>{{$index}}</span>';
        html += '       <h3>{{ dato.name }}</h3>';
        html += '       <a href="#" >{{ dato.email }}</a>';
        html += '       <p>{{ dato.body }}</p>';
        html += '   </li>';
        html += '</ul>';


    return {
        restrict: 'E',
        transclude: true,
        scope: {
            tex: "@",
            datos: '='
        },
        template: html,
        link: function (scope, element, attr) {
            element.prepend('<em>' + scope.tex + '</em>');
        }
    };
}) 
  
  
  
myApp.controller('MainController', function($scope, $http) {
    $scope.myScopeVar = "Scope controlador <<DirectivasCtrl>>";

    $http.get("https://jsonplaceholder.typicode.com/posts/1/comments")
        .then(function(response) {
            console.debug(response);
            $scope.arr = response.data;
    });

    //directiva withAttrs
    var counter = 0;
    $scope.customer = {
        name: 'Juan',
        street: '1234 sector 5.'
    };

    $scope.customers = [];

    $scope.addCustomer = function (data) {
        console.log(1, data)
        counter++;
        $scope.customers.push({
            name: (data) ? data : 'Nuevo cliente' + counter,
            street: counter + '.'
        });
    };

    $scope.changeData = function () {
        counter++;
        $scope.customer = {
            name: 'James',
            street: counter + '.'
        };
    };
});



