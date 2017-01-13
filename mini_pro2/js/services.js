todoApp.factory("dataResourceService",['localStorageService',function(localStorageService) {

    return {
        getAll: function(){
            var allKeys = localStorageService.keys();

            if(allKeys.length == 0) {
            	console.log("No tasks added to the list");
            	return;
            }

            var ind = allKeys.indexOf('index');

            if(ind == -1) {
            	console.log("index key not present, some error");
            	return;
            }

            var dataArray = new Array();

            for(var key in allKeys) {

            	if(key == 'index' || localStorageService.get(key) == null) continue;

            	var currTask = JSON.parse(localStorageService.get(key));

            	if(currTask.check == true) {
            		currTask.showDisabled = true;
            	}
            	else {
            		currTask.showDisabled = false;
            	}

            	dataArray.push(currTask);
            }
            return dataArray;
        },
        get: function(taskID){
            return  JSON.parse(localStorageService.get(taskID));
        },
        getKeys: function(taskID){
            return  localStorageService.keys();
        },
        set: function(taskID, currTask){
            localStorageService.set(taskID, JSON.stringify(currTask));
        },
        setIndex: function(newId){
            console.log(1,newId)
            localStorageService.set('index', newId);
        },
        getIndex: function(){
            return localStorageService.get('index')
        }

    };

}]);
