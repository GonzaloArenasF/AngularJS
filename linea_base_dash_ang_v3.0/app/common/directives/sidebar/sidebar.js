/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('sideBarDirectives', [])

.directive('sideBar', ['$location', 'CONSTANTS', '$rootScope', function ($location, CONSTANTS, $rootScope) {
	return {
		restrict: 'E',
		templateUrl: CONSTANTS.DIRECTIVE_PATH + 'sidebar/sidebar.tlp.html',
		link: function(scope, elem, attrs) {

			//hide control panel when not in account page
			$rootScope.$on("$routeChangeStart", function(args){
				$("#toggle-control").hide();
				var tab = $location.url().replace("/","");
				if(tab == "account"){
					$("#toggle-control").show();
				}
			})

			//menu toggle
			$("#menu-control").click(function(){
				$("#mainNav").toggleClass("left-panel-active");
				$("#mainNavMobile").toggleClass("left-panel-active");
				$("#main-panel").toggleClass("left-panel-active");
			});

			//control toggle
			$("#toggle-control").click(function(){
				$("#controlNav").toggleClass("right-panel-active");
				$("#mainNavMobile").toggleClass("right-panel-active");
				$("#main-panel").toggleClass("right-panel-active");
			});

			$(document).click(function(e) {
				var target = e.target;

				if (!$(target).is('#menu-control') && !$(target).is('#mainNav') && !$(target).parents().is('#mainNav') && !$(target).is('#toggle-control') && !$(target).is('#controlNav') && !$(target).parents().is('#controlNav')) {
					$("#mainNav").removeClass("left-panel-active");
					$("#mainNavMobile").removeClass("left-panel-active");
					$("#main-panel").removeClass("left-panel-active");
					$("#controlNav").removeClass("right-panel-active");
					$("#mainNavMobile").removeClass("right-panel-active");
					$("#main-panel").removeClass("right-panel-active");
				}
			});
		}
	};
}]);
