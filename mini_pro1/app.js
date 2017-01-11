var myApp = angular.module("myapp", []);



myApp.filter('cleandots', function() {
    return function(input) {
      return input.replace(/\./g,'');
    };
});

myApp.filter('cleancommas', function() {
    return function(input) {
      return input.replace(/,/g,'');
    };
});

myApp.controller("MainController", function($scope){

	$scope.test = "hola mundo , 111, mi rut: 16.555.444-3";

	$scope.name="hola";

	$scope.btnEst = false;
	$scope.heaEst = true;

	$scope.fetchPhotos = function(){
	    $.ajax({
	        url: "http://api.flickr.com/services/feeds/photos_public.gne?format=json",
	        dataType: "jsonp",
	        jsonpCallback: 'jsonFlickrFeed',
	        beforeSend: function() {
	        	$("table#tab_res").addClass('whirl');
	        	$scope.btnEst = true;
	        	$scope.heaEst = false;
	        },
	        success: function(feeds){
				$scope.feeds = feeds;

				$("table#tab_res").removeClass('whirl');

				$scope.btnEst = false;
				$scope.heaEst = true;
	            
	            $scope.$apply(function(){
	            	/* Actualiza el $scope */
	            }); 

				$scope.name="OTRO"

	        },
	        error: function(error){
	            $scope.$apply(function(){
	                $scope.failed = true;
	            });
	        }
	    });
	}

	$scope.limpiarPhotos = function () {
		$scope.feeds = [];
	}

});
