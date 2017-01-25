/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('checkboxDirectives', [])

.directive('checkBox',['CONSTANTS', function (CONSTANTS) {
	return {
		restrict: 'E',
		templateUrl: CONSTANTS.DIRECTIVE_PATH + 'checkbox/checkbox.tlp.html',
		scope: { 
	      toggles: '=',
	      selItem: '&'
	    },
		link: function(scope, elem, attrs) {
			scope.text = attrs.text;
		}
	};
}]);
