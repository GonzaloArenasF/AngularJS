var app = angular.module('myApp', ['ngResource']);

//services
app.factory('PostsFactory', function ($resource) {
    return $resource('http://jsonplaceholder.typicode.com/posts/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    });
});

app.factory('CommentFactory', ['$http', function($http) {

    var CommentFactory = {};

    CommentFactory.getComments = function (id) {
        
        return $http({
            method: 'GET',
            url: 'http://jsonplaceholder.typicode.com/posts/'+id+'/comments'
        });

    };

    return CommentFactory;

}]);

//fase run
app.run(function ($http, PostsFactory, $q) {
    var obj_post = { "userId": 1, "title": "titulo ...", "body": "text..."};

    //traer datos
    var data_query = PostsFactory.query();

    //filtrar
    var data_get= PostsFactory.get({id:2});

    //remover
    PostsFactory.remove({id:4});

    //crear
    var data_save = PostsFactory.save(obj_post);

    //editar
    PostsFactory.update({id:6}, obj_post);


    //callback promise
    data_query.$promise.then(function (result) {
        console.log("GET TITULOS:: ",result[0].title);
    });

    data_save.$promise.then(function (result) {
        console.log("SAVE POST:: ",result.id);
    });


    $q.all([data_query.$promise, data_get.$promise, data_save.$promise]).then(function(result){
        console.log(1, result[2].id)
    });

});




app.controller('mainCtrl', function ($scope, PostsFactory, $http, CommentFactory) {

    $scope.lista = [];

    PostsFactory.query().$promise.then(function (result) {

        for (result_i=0; result_i<result.length; result_i++) {
            result[result_i].editar = true;
            result[result_i].guardar = false;
            result[result_i].eliminar = true;
            result[result_i].comentarios = false;
        }

        $scope.lista = result;

    },function(reason) {
        alert('Failed: ' + reason);
    });

    $scope.removeItem = function removeItem(row) {
       var index = $scope.lista.indexOf(row);
       if (index !== -1) {
           $scope.lista.splice(index, 1);
       }
    };

    $scope.editarItem = function editarItem(row) {
        row.guardar = true;
        row.editar = false;
        row.eliminar = false;
    };

    $scope.guardarItem = function guardarItem(row) {
        row.guardar = false;
        row.editar = true; 
        row.eliminar = true;
    };

    $scope.verComentarios = function verComentarios(row) {

        if (!row.comentarios) {

            row.comentarios = true;

            CommentFactory.getComments(row.id).then(function (result) {
                row.comments = result.data;
            },function(reason) {
                alert('Failed: ' + reason);
            });

        } else {

            row.comentarios = false;

        }
        

    };

});
