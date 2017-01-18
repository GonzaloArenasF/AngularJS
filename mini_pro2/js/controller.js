
'use strict';

todoApp.controller('MainController', ['$scope', '$location', 'dataResourceService',
    function($scope, $location, dsResource) {

        $scope.addTaskButton = function() {
        	$location.path('/add');
        }

        $scope.editTaskButton = function(task_id) {
        	$location.path('/edit/' + task_id);
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

todoApp.controller('EditController', ['$scope', '$location', 'localStorageService', '$routeParams',
	function($scope, $location, localStorageService, $routeParams) {

		var currTask = localStorageService.get($routeParams.task_id);

		$scope.title = JSON.parse(currTask).taskTitle;

		$scope.cancelTaskButton = function() {
        	$location.path('/');
        }

		$scope.submit = function() {
            $location.path('/update/' + $scope.title + '/'+$routeParams.task_id);
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

		console.debug ($routeParams);
		var task_id = $routeParams.task_id;
		if(task_id != "" && task_id != null) id = task_id;


        dsResource.set(id, currObject);

		var newId = parseInt(id);
		newId += 1;
        console.log(newId)

        dsResource.setIndex(newId);

		$location.path('/');
	}
]);

todoApp.controller('updateController', ['$scope', '$routeParams', 'dataResourceService', '$location',
	function($scope, $routeParams, dsResource, $location) {

		var id = $routeParams.task_id;
		var currObject = {
			id: id,
			taskTitle: $routeParams.titleTask
		};

		dsResource.set(id, currObject);

		$location.path('/');
	}
]);
