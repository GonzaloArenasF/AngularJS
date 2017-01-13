
'use strict';

todoApp.controller('MainController', ['$scope', '$location', 'dataResourceService',
    function($scope, $location, dsResource) {
        $scope.addTaskButton = function() {
        	$location.path('/add');
        }

        $scope.doneTask = function(taskID){
            var currTask = dsResource.get(taskID);
            currTask.check = true
            dsResource.set(taskID, currTask);
            $scope.taskData = dsResource.getAll();
        }


        $scope.taskData = dsResource.getAll();
    }
]);

todoApp.controller('AddController', ['$scope', '$location', 'localStorageService',
	function($scope, $location, localStorageService) {

		$scope.submit = function() {
            $location.path('/insert/' + $scope.title);
		}

	}
]);

todoApp.controller('InsertController', ['$scope', '$routeParams', 'dataResourceService', '$location',
	function($scope, $routeParams, dsResource, $location) {

		var allKeys = dsResource.getKeys();

		var ind = allKeys.indexOf('index');
		var id;

		if(ind == -1) {
            //creamos si no existe.
            dsResource.setIndex(0);
		}

		id = dsResource.getIndex();

		var currObject = {
			id: id,
			taskTitle: $routeParams.titleTask
		};

        dsResource.set(id, currObject);

		var newId = parseInt(id);
		newId += 1;
        console.log(newId)

        dsResource.setIndex(newId);

		$location.path('/');
	}
]);
