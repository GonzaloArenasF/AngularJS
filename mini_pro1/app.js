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

myApp.directive('fotosDir', function () {

    var html  = '<table id="tab_res" class="table table-bordered table-striped">';
        html += '   <tr>';
        html += '       <td><font size=5>Autor</font></td>';
        html += '       <td><font size=5>Img</font></td>';
        html += '   </tr>';
        html += '    <tr ng-repeat="item in photos.items">';
        html += '       <td>{{ item.author }}</td>';
        html += '    	<td><img style="width:100px" ng-src="{{ item.media.m }}"></td>';
        html += '    </tr>';
        html += '</table>';


    return {
        restrict: 'E',
        scope: {
            photos: '='
        },
        template: html
    };
});

myApp.controller("MainController", function($scope){

	$scope.test = "hola mundo , 111, mi rut: 16.555.444-3";

	$scope.name="hola";

	$scope.btnEst = false;

	$scope.fetchPhotos = function(){
	    $.ajax({
	        url: "http://api.flickr.com/services/feeds/photos_public.gne?format=json",
	        dataType: "jsonp",
	        jsonpCallback: 'jsonFlickrFeed',
	        beforeSend: function() {
	        	$("table#tab_res").addClass('whirl');
	        	$scope.btnEst = true;
	        },
	        success: function(feeds){
				$scope.feeds = feeds;

				$("table#tab_res").removeClass('whirl');

				$scope.btnEst = false;
	            
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
