/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('dateSelectionDirectives', [])

.directive('dateSelection', ['CONSTANTS', function (CONSTANTS) {
	return {
		restrict: 'E',
		templateUrl: CONSTANTS.DIRECTIVE_PATH + 'dateSelection/dateSelection.tlp.html',
		scope: { 
	      daterange: '='
	    },
		link: function(scope, elem, attrs) {
			scope.dateTextMapping = {
				"Last 24 Hours": 1,
				"Last 7 Days": 7,
				"Last 30 Days": 30,
				"Last 3 Months": 90,
				"This Year": 365
			};

			//init datestring upon page load
			mapRangeToString();
			function mapRangeToString(){
				angular.forEach(scope.dateTextMapping, function(value, key) {
					if(value == scope.daterange){
						scope.datestring = key;
					}
				});
			}

			//update datestring and daterange on dropdown change
			scope.updateDateRange = function(daterange){
				scope.daterange = daterange;
				mapRangeToString();
				angular.element(elem[0].querySelectorAll(".dropdown-content")).toggleClass("active");
			};

			// Anything that gets to the document will hide the dropdown
			$(document).click(function(){
				angular.element(elem[0].querySelectorAll(".dropdown-content")).removeClass('active');
			});

			// Close dropdown or block document click from closing the dropdown when clicking inside of the element
			scope.toggleDateMenu = function(event){
				event.preventDefault();
				event.stopPropagation();
				angular.element(elem[0].querySelectorAll(".dropdown-content")).toggleClass("active");
			};


		}
	};
}]);
