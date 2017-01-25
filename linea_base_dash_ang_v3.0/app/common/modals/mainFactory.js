/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('krApp.factories', [])

.factory('modalFactory', function($uibModal) {
	var enableAnimation = true;
	return { 
		open: function(template,controller,size,params) {
			return $uibModal.open({
				backdrop: 'static',
				keyboard :false,
				animation: enableAnimation,
				// templateUrl: '../app/common/factories/confirmPromote.tpl.html',
				templateUrl: template, 
				controller: controller,
				size: size,
				resolve: {
					params: function() {
						return params;
					}
				}
			});
		}
	};
})


.controller('ModalConfirmPromptInstanceCtrl', ['$scope', '$uibModalInstance', 'params',
	function($scope, $uibModalInstance, params) {

	$scope.title = params.title;
	$scope.body = params.body;

	$scope.confirm = function() {
		$uibModalInstance.close(true);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
