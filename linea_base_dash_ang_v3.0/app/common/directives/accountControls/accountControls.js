/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('accountControlDirectives', [])

.directive('accountControls',['CONSTANTS', function (CONSTANTS) {
	return {
		restrict: 'E',
		scope: { 
	      controls: '=',
	      sel: '&'
	    },
		templateUrl: CONSTANTS.DIRECTIVE_PATH + 'accountControls/accountControls.tlp.html',
		link: function(scope, elem, attrs) {
			scope.fullwidth = false;
			scope.fullwidth = scope.$eval(attrs.fullwidth);
		}
	};
}])
