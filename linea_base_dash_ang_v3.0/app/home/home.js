/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('home', [
    'krApp.constant',
    'view-detail-modal'
])
 
.config(['$stateProvider', 'CONSTANTS',

	function ($stateProvider, CONSTANTS) {
		$stateProvider

			.state('home', {
				abstract: true,
				url: '/home',
		    	template: '<ui-view/>'
		    })
            .state('home.dashboard', {
                url: '/dashboard',
                templateUrl: CONSTANTS.DIR_PATH + 'app/home/dashboard/home-dashboard.tpl.html',
				controller: 'HomeController'
            })
			.state('home.otro', {
                url: '/otro',
                templateUrl: CONSTANTS.DIR_PATH + 'app/home/otro/home-otro.tpl.html',
				controller: 'OtroController'
            })

	} 
])

.controller('OtroController', ['$scope', '$state', 'General', 'CONSTANTS', 'modalFactory',
	function($scope, $state, General, CONSTANTS, modalFactory){

	}
])
		
.controller('HomeController', ['$scope', '$state', 'General', 'CONSTANTS', 'modalFactory',
	function($scope, $state, General, CONSTANTS, modalFactory){

	    /*********************
		*	Public Variables
		**********************/
		$scope.data = [];
		$scope.reports = [];
		$scope.stitle = [];

		$scope.colors = ["#23a5df","#967ef2", "#90ee7e", "#ea1e63", "#f45b5b", "#aaeeee", "#ff0066", "#eeaaee",
		"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"];    


		/*
         * general combos
         */
		$scope.data['anios'] = [
			{
				k: "2015",
				v: 2015
			},
			{
				k: "2016",
				v: 2016 
			}
		];
		$scope.data.anio = $scope.data['anios'][1];

		$scope.data['meses'] = [
			{
				k: "Julio",
				v: "07"
			},
			{
				k: "Agosto",
				v: "08"
			}	
		]
		$scope.data.mes = $scope.data['meses'][1];
 
		/*********************
		*	Public Functions
		**********************/

	    /*
		 * initialization
		 */
	    $scope.init = _init;

	    /*
		 * orden de 
		 */
	    $scope.openNoteModal = _openNoteModal;
 
	    /****************************************************
		 * initialization
		 ***************************************************/
	    $scope.init();




	    /****************************************************
		 *  Private functions
		 ***************************************************/

	    /*
		 * initialization
		 */
	    function _init() {

			_getAll();
			_getAllReportes();
	    };


		function _getAll(){

			General.getAll().then(function(r){
				$scope.data['posts'] = r.data;
			});

		}	


		function _getAllReportes(){ 
			console.log("reporte::");

			$scope.stitle["r1"]  = "Por Tipo";
			$scope.stitle["r2"]  = "Por Producto";
 
			$scope.reports["r1"] = [{
				name: 'Microsoft Internet Explorer',
				y: 56.33
			}, {
				name: 'Chrome',
				y: 24.03,
				sliced: true,
				selected: true
			}, {
				name: 'Firefox',
				y: 10.38
			}, {
				name: 'Safari',
				y: 4.77
			}, {
				name: 'Opera',
				y: 0.91
			}, {
				name: 'Proprietary or Undetectable',
				y: 0.2
			}];

			$scope.reports["r2"] = [
                ['Shanghai', 23.7],
                ['Lagos', 16.1],
                ['Istanbul', 14.2],
                ['Karachi', 14.0],
                ['Mumbai', 12.5],
                ['Moscow', 12.1],
                ['São Paulo', 11.8],
                ['Beijing', 11.7],
                ['Guangzhou', 11.1],
                ['Delhi', 11.1],
                ['Shenzhen', 10.5],
                ['Seoul', 10.4],
                ['Jakarta', 10.0],
                ['Kinshasa', 9.3],
                ['Tianjin', 9.3],
                ['Tokyo', 9.0],
                ['Cairo', 8.9],
                ['Dhaka', 8.9],
                ['Mexico City', 8.9],
                ['Lima', 8.9]
            ];
		}

	    /*
		 * Modal
		 */
	    function _openNoteModal(it) {

	        var template = CONSTANTS.DIR_PATH + 'app/home/dashboard/view-detail-modal.tpl.html';
	        var ctrl = 'viewDetailModalInstanceCtrl';
	        var size = 'sm';
	        var data = {
	            persona: it
	        };

	        var params = data;

	        modalFactory.open(template, ctrl, size, params).result.then(
				function (responseNote) {
				    console.log("modal::: ", responseNote)

				}
		    );
	    }


		/*
		* on change
		*/
		$scope.$watch('data.anio', function(newValue, oldValue) {
			if(newValue != oldValue && newValue){
				console.log("cambió año, " + newValue)
			}
		});



	}
]);
