/**
 * Modal Personal Information
 */
angular.module('view-detail-modal', [])

.controller('viewDetailModalInstanceCtrl', ['$scope', '$uibModalInstance', 'params',
	function ($scope, $uibModalInstance, params) {
        $scope.sdata = params;

		$scope.save = function () {
			$uibModalInstance.close();
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss();
		};
	}
]);
