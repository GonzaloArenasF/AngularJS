var myApp = angular.module("myapp", []);

myApp.controller("MiLista", function ($scope, $http)  {

	$scope.limite = 5;
	$scope.verMas = 'Ver más';
    
    $scope.people = [
		{"name":"Srinivasarao","Designation":"software Engineer"},
		{"name":"Tagore","Designation":"software Engineer"},
		{"name":"Surya","Designation":"Team Lead"},
		{"name":"Natraj","Designation":"software Engineer"},
		{"name":"Sai","Designation":"Proffesor"},
		{"name":"Sundhar","Designation":"student"},
		{"name":"Ganesh","Designation":"Postal Department"},
		{"name":"Tulasi","Designation":"Advocate"},
		{"name":"Nagarjuna","Designation":"Press"},
		{"name":"Harsha","Designation":"Advocate"},
		{"name":"Ashok","Designation":"Team Lead"}
	];

	//jsonfake /post

	$scope.ver = function() {

		if ($scope.limit == 5) {

			$scope.verMas = 'Ver menos';
			$scope.limite = $scope.people.length;

		} else {

			$scope.verMas = 'Ver más';
			$scope.limite = 5;

		};

	};

	$scope.getServicio = function() {

        $http.get("https://jsonplaceholder.typicode.com/posts/1/comments")
            .then(function(response) {
                console.debug(response);
                $scope.people = response.data;
        });

    }

} );
