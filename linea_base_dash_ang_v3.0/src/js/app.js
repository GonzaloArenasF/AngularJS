/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('krApp', [
	'ui.router',
    'home',
	'krApp.services',
	'krApp.factories',
	'krApp.directives',
	'krApp.filters', 
	'krApp.constant',
	'login',
	'ui.bootstrap',
	'datatables',
    'ngCookies',
    'ngAnimate',
    'toaster',
    'frapontillo.bootstrap-switch',
    'ngStorage',
    'ngDropdowns'
])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'CONSTANTS',
	function($stateProvider, $urlRouterProvider, $httpProvider, CONSTANTS) {   

		//setup http header
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

		$httpProvider.defaults.withCredentials = false;   
 
		// $httpProvider.interceptors.push('AuthInterceptor');

		//setup default route
		$urlRouterProvider.otherwise('/login');
	}
])

.controller('MainController', ['$scope',
	function($scope){
		console.log('Main Controller');
	}
])


//store the current user info in the rootscope
.run(['$rootScope', 'CONSTANTS', '$state', 'AuthService', '$timeout', 'modalFactory', '$q', '$localStorage', '$sessionStorage',

	function($rootScope, CONSTANTS, $state, AuthService,  $timeout, modalFactory, $q, $localStorage, $sessionStorage) {
	    moment.locale("es")  
		$rootScope.currencySign = CONSTANTS.CURRENCY_SIGN;

		//App configuration
		$rootScope.imagePath = CONSTANTS.IMAGE_PATH;
		$rootScope.isSelected = true;

		$rootScope.$on('logout', function(){
			AuthService.logout();
			$state.go('login');
		})

		$rootScope.login_isok=AuthService.isAuthenticated();

		$rootScope.current_state=$state.current.name;

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			$rootScope.current_state=$state.current.name 
			console.log("AuthService.isAuthenticated() ::", AuthService.isAuthenticated() )
			$rootScope.login_isok=AuthService.isAuthenticated();
			if (!AuthService.isAuthenticated()) {
				if (toState.name != 'login'){
					event.preventDefault();
					$state.go('login');
 
				}
			}else{
				if (toState.name == 'login'){
					event.preventDefault();
					$state.go('home.dashboard');
					
				}
			}
		});

		$rootScope.time = new Date();
		$rootScope.fecha = moment().format("dddd");
		$rootScope.$watch('time', function () {
		    $timeout(function () {
		        $rootScope.time = new Date();
		    }, 1000);
		});

		$rootScope.goOut = function(){  
			AuthService.logout(); 
		}

	}

]);


 //------------------------------------------------------- 

/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('krApp.constant', [])
  
.constant('CONSTANTS', (function() {
  // Define Environment
  var debug = true;
 
  //endpoint = 'http://10.211.55.4:1314/';
  if(debug){
      endpoint = 'https://jsonplaceholder.typicode.com/';
  }
  else{
      endpoint = 'https://jsonplaceholder.typicode.com/'; 
  } 
   
  //var endsrc = "/linea_base_dash_ang_v3.0/";
  var endsrc = "http://localhost:8888/angularjs/linea_base_dash_ang_v3.0/";   
     

  // Use the variable in your constants
  return { 
    ENVIROMENT_DEBUG_SESS: debug, 
    ENDPOINT_URI: endpoint, 
    ENDPOINT_JS: endsrc + "src/", //TODO PUEDE QUEDAR EL DE ENDPOINT SI ESTAN EN EL MISMO SERVER
    DIR_PATH: endsrc + '',
    DIRECTIVE_PATH: endsrc + 'app/common/directives/',
    ICON_PATH: endsrc + 'src/assets/imageIcons/',
    IMAGE_PATH: endsrc + 'src/assets/', 
    CURRENCY_SIGN: '$', 
    PAGINATION_MAX_NUMBER: 25,
    AUTH_EVENTS: {
      notAuthenticated: 'auth-not-authenticated'
    }


  };
})());


 //------------------------------------------------------- 

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


 //------------------------------------------------------- 

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


 //------------------------------------------------------- 

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


 //------------------------------------------------------- 

/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('graficosDirectives', [])

.directive('graphColumn', ['CONSTANTS', '$timeout', function (CONSTANTS, $timeout) {
    return {
        restrict: 'E',
        template: '<div><div id="{{idcmp}}" style="min-width: {{width}}px; height: {{height}}px; margin: 0 auto"></div></div>',
        scope: { 
            idcmp: '@',
            width: '@',
            height: '@',
            title: '@',
            stitle: '=',
            yaxistext: '@', 
            series: '=',
            categories: '=',
            colors: "="
        }, 
        link: {
            post: function (scope, elem, attrs) {

                var _loadchart;
                var _load = function(){
                    $timeout(function () {
                        _loadchart = new Highcharts.Chart({
                            chart: {
                                renderTo : scope.idcmp,  
                                type: 'column'
                            },
                            colors: scope.colors,
                            credits: { enabled: false },
                            title: {
                                text: scope.title
                            },
                            subtitle: {
                                text: scope.stitle
                            }, 
                            xAxis: {
                                type: 'category',
                                labels: {
                                    rotation: -45,
                                    style: {
                                        fontSize: '13px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
                                }
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Datos'
                                }
                            },
                            legend: {
                                enabled: false
                            },
                            tooltip: {
                                pointFormat: ' <b>{point.y:.1f} </b>'
                            },
                            series: [{
                                name: 'Nombre',
                                colorByPoint: true,
                                data: scope.series,
                                dataLabels: {
                                    enabled: true,
                                    rotation: -90,
                                    color: '#FFFFFF',
                                    align: 'right',
                                    format: '{point.y:.1f}', // one decimal
                                    y: 10, // 10 pixels down from the top
                                    style: {
                                        fontSize: '13px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
                                }
                            }]
                        });


   
                    })
                }
                _load();

                /*
                * on page change
                */
                scope.$watch('series', function(newValue, oldValue) {
                    if(newValue && _loadchart)
                    _loadchart.series[0].setData(newValue);   

                });
                scope.$watch('stitle', function(newValue, oldValue) {
                    if(newValue && _loadchart)
                    _loadchart.setTitle(null, {text:newValue});          
                });

            }
        }


    };
}])

.directive('graphPieChart', ['CONSTANTS', '$timeout', function (CONSTANTS, $timeout) {
    return {
        restrict: 'E',
        template: '<div><div id="{{idcmp}}" style="min-width: {{width}}px; height: {{height}}px; margin: 0 auto"></div></div>',
        scope: {
            idcmp: '@',
            width: '@',
            height: '@',
            title: '@',
            stitle: '=',
            yaxistext: '@',
            series: '=',
            colors: '='
        },
        link: {
            post: function (scope, elem, attrs) {
                var _loadchart;
                console.log("scope.series ::", scope.series )
                var _load = function(){
                    $timeout(function () {
                        _loadchart = new Highcharts.Chart({
                            renderTo : scope.idcmp, 
                            colors: scope.colors,
                            chart: {
                                renderTo : scope.idcmp, 
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie' 
                            }, 
                            credits: { enabled: false },
                            title: {
                                text: scope.title
                            },
                            subtitle: {
                                text: scope.stitle
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.y}</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    showInLegend: true,
                                    dataLabels: {
                                        enabled: false,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style: {
                                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                        }
                                    }
                                }
                            },
                            series: [{
                                name: scope.title,
                                colorByPoint: true,
                                data: scope.series 
                            }]
                        });
                    })
                }
                _load();
                /*
                * on page change
                */
                scope.$watch('series', function(newValue, oldValue) {
                    if(newValue && _loadchart)
                    _loadchart.series[0].setData(newValue);   
                    
                });

                scope.$watch('stitle', function(newValue, oldValue) {
                    if(newValue && _loadchart)
                    _loadchart.setTitle(null, {text:newValue});          
                    
                });
            }
        }


    };
}]);


 //------------------------------------------------------- 

angular.module('krApp.directives', [
	// 'employeeTabHeaderDirectives',
	// 'sideBarDirectives',
	'checkboxDirectives',
	'accountControlDirectives',
	'dateSelectionDirectives',
    'graficosDirectives'
])
 
.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
})

.directive('icheck', function($timeout, $parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];
				var stype =$attrs['stype']=="square"? 'icheckbox_minimal-blue': 'iradio_square-blue'
				console.log(1, stype)
                scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: stype,
                    radioClass: 'iradio_flat-blue'

                }).on('ifChanged', function(event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
})

.directive("wrapper", [ 'sbaseproject', '$timeout', '$rootScope', '$timeout',
    function(sbaseproject, $timeout, $rootScope, $timeout) {
        return {
            restrict: "C",
            link: function(scope, elem, attrs) {

                scope.$on('$stateChangeSuccess', function (scope, next, current) {
                    if (next.url == '/login'){
                        $('body').addClass('close-bars fix-login sidebar-collapse');
                        $('body .content-wrapper').css('min-height', 965);
                    }else{
                        $('body').removeClass('close-bars fix-login');
                        $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                        $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                    }
                    fix();
                    fixSidebar();
                });

                $(window, ".wrapper").resize(function () {
                    fix();
                    fixSidebar();
                });

                var fix = function () {
                    //Get window height and the wrapper height
                    var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                    var window_height = $(window).height();
                    var sidebar_height = $(".sidebar").height();
                    //Set the min-height of the content and sidebar based on the
                    //the height of the document.
                    if ($("body").hasClass("fixed")) {
                        $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
                    } else {
                        var postSetWidth;
                        if (window_height >= sidebar_height) {
                            $(".content-wrapper, .right-side").css('min-height', window_height - neg);
                            postSetWidth = window_height - neg;
                        } else {
                            $(".content-wrapper, .right-side").css('min-height', sidebar_height);
                            postSetWidth = sidebar_height;
                        }

                        //Fix for the control sidebar height
                        var controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
                        if (typeof controlSidebar !== "undefined") {
                            if (controlSidebar.height() > postSetWidth)
                            $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
                        }
                    }
                };

                var fixSidebar = function () {
                    //Make sure the body tag has the .fixed class
                    if (!$("body").hasClass("fixed")) {
                        if (typeof $.fn.slimScroll != 'undefined') {
                            $(".sidebar").slimScroll({destroy: true}).height("auto");
                        }
                        return;
                    } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
                        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
                    }
                    //Enable slimscroll for fixed layout
                    if ($.AdminLTE.options.sidebarSlimScroll) {
                        if (typeof $.fn.slimScroll != 'undefined') {
                            //Destroy if it exists
                            $(".sidebar").slimScroll({destroy: true}).height("auto");
                            //Add slimscroll
                            $(".sidebar").slimscroll({
                                height: ($(window).height() - $(".main-header").height()) + "px",
                                color: "rgba(0,0,0,0.2)",
                                size: "3px"
                            });
                        }
                    }
                };
            }
        }
    }
])

.directive("mainSidebar", [ 'sbaseproject',
    function(sbaseproject) {
        return {
            restrict: "C",
            link: function(scope, elem, attrs) {
                if (sbaseproject.options.enableControlSidebar){
                    //Get the screen sizes
                    var screenSizes = sbaseproject.options.screenSizes;
                    //Enable sidebar toggle
                    $('.sidebar-toggle').on('click', function(e){
                        e.preventDefault();

                        //Enable sidebar push menu
                        if ($(window).width() > (screenSizes.sm - 1)) {
                            if ($("body").hasClass('sidebar-collapse')) {
                                 $("body").removeClass('sidebar-mini').trigger('expanded.pushMenu');
                                $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                                $("body").addClass('sidebar-open').trigger('collapsed.pushMenu');
                            } else {
                                $("body").removeClass('sidebar-open').trigger('expanded.pushMenu');
                                $("body").addClass('sidebar-mini').trigger('collapsed.pushMenu');
                                $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                            }
                        }

                        //Handle sidebar push menu for small screens
                        else {
                            if ($("body").hasClass('sidebar-open')) {
                                $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                            } else {
                                $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                            }
                        }


                        // $(".content-wrapper").click(function () {
                        //     //Enable hide menu when clicking on the content-wrapper on small screens
                        //     if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                        //         $("body").removeClass('sidebar-open');
                        //     }
                        // });

                        // //Enable expand on hover for sidebar mini
                        // if ($.sbaseproject.options.sidebarExpandOnHover || ($('body').hasClass('fixed') && $('body').hasClass('sidebar-mini'))) {
                        //     this.expandOnHover();
                        // }
                    })

                }
            }
        }
    }
])

// .directive('myTable', ['sbaseproject', '$timeout', 'Test', '$q',
//     function(sbaseproject, $timeout, $q){
//         return {
//             restrict: "A",
//             scope: {
//                 nextPage: '&',
//                 aoColumnDefs: '=',
//                 list: '=',
//                 total: '='
//             },
//             link: function(scope, elem, attrs) {
//                 $timeout(function(){
//                     var options = {};

//                     if (scope.list.length > 0) {
//                         options.serverSide = true;
//                         options.deferLoading = scope.total;
//                         options.data = scope.list;
//                         // options.ajax = scope.nextPage();
//                     } else {
//                         options = {
//                             // "bStateSave": true,
//                             // "iCookieDuration": 2419200, /* 1 month */
//                             // "bJQueryUI": true,
//                             // "bPaginate": false,
//                             // "bLengthChange": false,
//                             // "bFilter": false,
//                             // "bInfo": false,
//                             // "bDestroy": true
//                         };
//                     }


//                     // aoColumnDefs is dataTables way of providing fine control over column config
//                     if (scope.aoColumnDefs) {
//                         options["columns"] = scope.aoColumnDefs;
//                     }

//                     // apply the plugin
//                     var dataTable = elem.dataTable(options);

//                     var flag = false;

//                     // watch for any changes to our data, rebuild the DataTable
//                     scope.$watch('list', function(newval, oldval) {
//                         var val = newval || null;
//                         if (val) {
//                             if (flag){
//                                 dataTable.fnClearTable();
//                                 dataTable.fnAddData(scope.list);
//                             }
//                             flag = true;

//                         }
//                     });

//                 }, 200);

//             }
//         }
//     }
// ])

.directive('toggleBalance', ['sbaseproject', '$timeout',
    function(sbaseproject, $timeout){
        return {
            restrict: "C",
            link: function(scope, elem, attrs) {

                elem.on('click', function(){
                    $(".balance-option").stop().slideToggle(200);
                });

            }
        }
    }
])

/* ControlSidebar
* ==============
* Adds functionality to the right sidebar
*
* @type Object
* @usage class = control-sidebar
*/
.directive('controlSidebar', ['sbaseproject', '$timeout',
    function(sbaseproject, $timeout){
        return {
            restrict: "C",
            link: function(scope, elem, attr){

                //using timeout to run the function after DOM is ready
                $timeout(function(){
                    //Update options
                    var o = sbaseproject.options.controlSidebarOptions;

                    //Get the sidebar
                    var sidebar = $(o.selector);

                    //The toggle button
                    var btn = $(o.toggleBtnSelector);

                    //If the body has a boxed layout, fix the sidebar bg position
                    var bg = $(".control-sidebar-bg");
                    scope.fix(bg);

                    //If the body has a fixed layout, make the control sidebar fixed
                    if ($('body').hasClass('fixed')) {
                        scope.fixForFixed(sidebar);
                    } else {
                        //If the content height is less than the sidebar's height, force max height
                        if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
                            scope.fixForContent(sidebar);
                        }
                    }

                    //Listen to the click event
                    btn.on('click', function (e) {
                        e.preventDefault();
                        //If the sidebar is not open
                        if (!sidebar.hasClass('control-sidebar-open') && !$('body').hasClass('control-sidebar-open')) {
                            //Open the sidebar
                            scope.open(sidebar, o.slide);
                        } else {
                            scope.close(sidebar, o.slide);
                        }
                    });

                    scope.setup();
                });


                //Open the control sidebar
                scope.open = function (sidebar, slide) {
                    //Slide over content
                    if (slide) {
                        sidebar.addClass('control-sidebar-open');
                    } else {
                        //Push the content by adding the open class to the body instead
                        //of the sidebar itself
                        $('body').addClass('control-sidebar-open');
                    }
                }

                //Close the control sidebar
                scope.close = function (sidebar, slide) {
                    if (slide) {
                        sidebar.removeClass('control-sidebar-open');
                    } else {
                        $('body').removeClass('control-sidebar-open');
                    }
                }

                scope.fix = function (sidebar) {
                     if ($("body").hasClass('layout-boxed')) {
                        sidebar.css('position', 'absolute');
                        sidebar.height($(".wrapper").height());
                        $(window).resize(function () {
                            scope.fix(sidebar);
                        });
                    } else {
                        sidebar.css({
                            'position': 'fixed',
                            'height': 'auto'
                        });
                    }
                }

                scope.fixForFixed = function (sidebar) {
                    sidebar.css({
                        'position': 'fixed',
                        'max-height': '100%',
                        'overflow': 'auto',
                        'padding-bottom': '50px'
                    });
                }

                scope.fixForContent = function (sidebar) {
                    $(".content-wrapper, .right-side").css('min-height', sidebar.height());
                }

                /**
                * Toggles layout classes
                *
                * @param String cls the layout class to toggle
                * @returns void
                */
                scope.change_layout = function(cls) {
                    $("body").toggleClass(cls);
                    //sbaseproject.layout.fixSidebar();
                    //Fix the problem with right sidebar and layout boxed
                    if (cls == "layout-boxed")
                      scope.fix($(".control-sidebar-bg"));
                    if ($('body').hasClass('fixed') && cls == 'fixed') {
                      sbaseproject.pushMenu.expandOnHover();
                      //sbaseproject.layout.activate();
                    }
                    scope.fix($(".control-sidebar-bg"));
                    scope.fix($(".control-sidebar"));
                }

                /**
                * Replaces the old skin with the new skin
                * @param String cls the new skin class
                * @returns Boolean false to prevent link's default action
                */
                scope.change_skin = function(cls) {
                    $.each(sbaseproject.options.skins, function (i) {
                        $("body").removeClass(sbaseproject.options.skins[i]);
                    });

                    $("body").addClass(cls);
                    scope.store('skin', cls);
                    return false;
                }

                /**
                * Store a new settings in the browser
                *
                * @param String name Name of the setting
                * @param String val Value of the setting
                * @returns void
                */
                scope.store = function(name, val) {
                    if (typeof (Storage) !== "undefined") {
                        localStorage.setItem(name, val);
                    } else {
                        window.alert('Please use a modern browser to properly view this template!');
                    }
                }

                /**
                * Get a prestored setting
                *
                * @param String name Name of of the setting
                * @returns String The value of the setting | null
                */
                scope.get = function(name) {
                    if (typeof (Storage) !== "undefined") {
                        return localStorage.getItem(name);
                    } else {
                        window.alert('Please use a modern browser to properly view this template!');
                    }
                }

                /**
                * Retrieve default settings and apply them to the template
                *
                * @returns void
                */
                scope.setup = function() {
                    var tmp = scope.get('skin');
                    if (tmp && $.inArray(tmp, sbaseproject.options.my_skins))
                        scope.change_skin(tmp);

                    //Add the change skin listener
                    $("[data-skin]").on('click', function (e) {
                        e.preventDefault();
                        scope.change_skin($(this).data('skin'));
                    });

                    //Add the layout manager
                    $("[data-layout]").on('click', function () {
                        scope.change_layout($(this).data('layout'));
                    });

                    $("[data-controlsidebar]").on('click', function () {
                        scope.change_layout($(this).data('controlsidebar'));
                        var slide = !sbaseproject.options.controlSidebarOptions.slide;
                        sbaseproject.options.controlSidebarOptions.slide = slide;
                        if (!slide)
                            $('.control-sidebar').removeClass('control-sidebar-open');
                    });

                    $("[data-sidebarskin='toggle']").on('click', function () {
                        var sidebar = $(".control-sidebar");
                        if (sidebar.hasClass("control-sidebar-dark")) {
                            sidebar.removeClass("control-sidebar-dark")
                            sidebar.addClass("control-sidebar-light")
                        } else {
                            sidebar.removeClass("control-sidebar-light")
                            sidebar.addClass("control-sidebar-dark")
                        }
                    }); 

                    $("[data-enable='expandOnHover']").on('click', function () {
                        $(this).attr('disabled', true);
                        sbaseproject.pushMenu.expandOnHover();
                        if (!$('body').hasClass('sidebar-collapse'))
                            $("[data-layout='sidebar-collapse']").click();
                    });

                    // Reset options
                    if ($('body').hasClass('fixed')) {
                        $("[data-layout='fixed']").attr('checked', 'checked');
                    }
                    if ($('body').hasClass('layout-boxed')) {
                        $("[data-layout='layout-boxed']").attr('checked', 'checked');
                    }
                    if ($('body').hasClass('sidebar-collapse')) {
                        $("[data-layout='sidebar-collapse']").attr('checked', 'checked');
                    }
                }
            }
        }
    }
])

.directive("responsiveTable", ['$compile', '$filter', function($compile, $filter) {

    return {
        restrict: "A",
        scope:false,
        compile: function(elem, attrs) {

            attrs.$addClass("responsive");
            var headerHtmlList = '';
            //add sort icons to each of the headers
            angular.forEach(elem.find("th"), function(value, key) {
                var eachHeader = angular.element(value);
                var eachHeaderTitle = eachHeader.html();
                var sortCol = eachHeader.data('sort');
                if(sortCol){
                    headerHtmlList += '<li data-sort="' + sortCol + '" ng-click="sortByColumn($event);updateText($event)">' + eachHeader[0].innerText + '</li>';
                    eachHeader.html('<div class="header-wrapper sort">' + eachHeaderTitle + '&nbsp;<i class="fa fa-sort"></i><i class="fa fa-sort-asc"></i><i class="fa fa-sort-desc"></i></div>');
                }
            });

            //build mobile sort template
            var sortDropDown = '<div class="filter-wrapper"> ';
            sortDropDown += '<div ng-click="toggleDropdown($event)" class="filter-dropdown-current btn btn-primary btn-round">Sort By: <b><span class="current-col-text">{{sortColText}}</span><b> <i class="fa fa-caret-down"></i></div>';
            sortDropDown += '<ul class="filter-dropdown">';
            sortDropDown += headerHtmlList;
            sortDropDown += '</ul>';
            sortDropDown += '</div>';

            //append the template before the table
            var table = elem.find("table");
            table.before(sortDropDown);

        },
        controller: function($scope, $element){
            // table header animation
            $element.find("[data-sort]").click(function(){
                if($scope.sort == $(this).data("sort")){
                    $scope.direction = $scope.direction == "DESC" ? "ASC" : "DESC";
                    var directionClass = $scope.direction == "DESC" ? "desc" : "asc";
                    $(this).find(".header-wrapper").attr('class', 'header-wrapper').addClass(directionClass);
                }
                else{
                    $scope.direction = "DESC";
                    $element.find(".header-wrapper").attr('class', 'header-wrapper sort');
                    $(this).find(".header-wrapper").attr('class', 'header-wrapper').addClass("desc");
                }
                $scope.sort = $(this).data("sort");
                $(".filter-dropdown").removeClass('active');
            });

            //toggles the dropdown menu for the mobile sort template
            $scope.toggleDropdown = function (event) {
                var dropdown = $(event.target).parent().find('.filter-dropdown');
                dropdown.toggleClass('active');
            };

            $scope.updateText = function(event){
                $scope.sortColText=event.currentTarget.innerText;
            };
        }

    };

}]).directive("customDropDown", [ function() {

    return {
        restrict: "E",
        scope: {
        	list: '=',
        	elem: '=',
        	title: '@',
        	size: '@',
        	label: '@'
        },
        template: '<div class="dropdownmenu-wrapper">' +
					'<div class="dropdownmenu ng-binding" ng-click="toggleTabMenu($event)">{{title}}</div>' +
						'<ul class="dropdown-content">' +
							'<li ng-repeat="item in list" ng-click="itemSelected($index)">{{item[label]}}</li>' +
						'</ul>' +
				  	'</div>' +
				  '</div>',
        link: function(scope, elem, attrs) {

        	scope.element = elem;

			scope.itemSelected = function(idx){
				scope.element.find('.dropdown-content').removeClass("active");
				scope.element.find('.dropdownmenu').html(scope.list[idx][scope.label]);
				scope.elem = scope.list[idx];
			};

			//if you set elem, that value will show as default
			if (scope.elem){
				angular.forEach(scope.list, function(value, key){
					if (angular.equals(scope.elem, value)){
						scope.itemSelected(key);
					}
				});
			}

			scope.$watch('list', function(newval, oldval){
				if (!angular.equals(newval, oldval)){
					scope.element.find('.dropdownmenu').html(scope.title);
					scope.elem = undefined;
				}
			});

            // Anything that gets to the document will hide the dropdown
            $(document).click(function(){
                scope.element.find(".dropdown-content").removeClass("active");
            });

            // Close dropdown or block document click from closing the dropdown when clicking inside of the element
			scope.toggleTabMenu = function(event){
                event.preventDefault();
                event.stopPropagation();
				scope.element.find(".dropdown-content").toggleClass("active");
			};

			if (scope.size == 'small'){
				elem.find('.dropdownmenu-wrapper').addClass('dropdownmenu-sm');
			}
        }
    };
}])

.directive("iconTag", [ function() {
	return {
		restrict: "A",
		link: function(scope, elem, attr) {
			if (scope.$eval(attr.iconTag))
				elem.addClass('active');
			else
				elem.removeClass('active');
		}
	};

}])

.directive('triggerPopoverClose',[ function () {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			elem.on('click', function(event){
				angular.element('#'+attrs.triggerPopoverClose).trigger('click')
			});
		}
	};
}])
 

.directive('msgResponseStatus',[ function () {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			msg: "@",
			title: "@",
			isOk: "@"
		},
		template: "<div class=\"{{isOk=='true'?'text-kwsave':'text-red'}} text-center\">\
			<i class=\"fa {{isOk=='true'?'fa-check-circle':'fa-times-circle'}} fa-title-response\"></i>\
			<h1 class='fa-title-response.text'>{{title}}!</h1>\
			<h1>{{msg}}.</h1>\
		</div>"
	};
}]);


 //------------------------------------------------------- 

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


 //------------------------------------------------------- 

/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('krApp.filters', [])

/** 
 * Capitalize Filter
 */
.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
})

.filter('novalue', function() {
    return function(input) {
      return !input ? 'N/A' : input;
    };
})

.filter('noselection', function() {
    return function(input) {
      return !input ? 'Sin Selección' : input;
    };
})

.filter('activo', function() {
    return function(input) {
      return input==true ? 'Inactivo' : 'Activo';
    };
})

.filter('cleandots', function() {
    return function(input) {
      return input.replace(/\./g,'');
    };
})
.filter("msdate", function() {
    var re = /\/Date\(([0-9]*)\)\//;
    return function(x) {
        var m = x.match(re);
        if( m ) return new Date(parseInt(m[1]));
        else return null;
    };
})
;


 //------------------------------------------------------- 

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


 //------------------------------------------------------- 

/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('krApp.services', [])


/**
 * Service for all AJAX calls
 */
.service('AJAX', ['$http', 'CONSTANTS', '$state', '$rootScope', '$localStorage', '$q',
    function($http, CONSTANTS, $state, $rootScope, $localStorage, $q) {
        var _error = function(result) {
            if (result.data.success == false) {  
                console.log("DELETE STORAGE FALSE") 
                 delete $localStorage.uid;
                 window.location = CONSTANTS.ENDPOINT_JS 
            }
        }
        this.genParams = function(command) {
            return CONSTANTS.ENDPOINT_URI + command;
        }

        this.promise = function(params, op) {
            $rootScope.gloading = "whirl whirl-min duo no-overlay";
            this.endpoint = this.genParams(params.command);
            var defer = $q.defer();
            var promise = $http({method: op, url: this.endpoint, data: $.param(params)}).then(
                function(result) {
                    $rootScope.gloading = "";
                    if (result.data.sesionError === true) { 
                        _error(result);
                    }

                    return defer.resolve(result);
                }, function(err){
                    //TODO Error login GNRL
                    
                    $rootScope.gloading = "";
                    return defer.reject(err); 
                }
            )
            return defer.promise;
        };


    }
])

/**
 * Session parameter
 */
.service('SessionParams', ['$localStorage',
    function($localStorage) {
        this.get = function() {
            if ($localStorage.uid) {
                var params = {};
                params.token = $localStorage.uid.token;
                params.is_ok = $localStorage.uid.is_ok;
                return params;
            } else {
                return false;
            }
        };
    }
])

/**
 * Build a basic API object to append in every request
 */
.service('BasicAPIObject', ['SessionParams', '$rootScope',
    function(SessionParams, $rootScope) {
        this.get = function(command, model) {
            var params = {
                command: command,
                model: model,
                ver: '4'
            }; 

            params.AnioNumero= $rootScope.AnioNumero;
            params.SostenedorId= $rootScope.SostenedorId ;
            params.EstablecimientoId= $rootScope.EstablecimientoId;



            angular.extend(params, SessionParams.get());
            return params;
        };
    }
])


.service('General', ['AJAX', 'BasicAPIObject', '$cookies', 'CONSTANTS',
    function(AJAX, BasicAPIObject, $cookies, CONSTANTS) {
        var MODEL = 'General';
 
        this.getAll = function() {
            var params = BasicAPIObject.get('posts', MODEL);

            return AJAX.promise(params, 'get');
        };

    }
])


.service('Admin', ['AJAX', 'BasicAPIObject', 'CONSTANTS',
    function(AJAX, BasicAPIObject, CONSTANTS) {

        var MODEL = 'Usuarios';
 
        //login
        this.login = function(run, digito, password) {
            var params = BasicAPIObject.get(MODEL+'/Ingresar', MODEL);
            params.cuerpo = run;
            params.digito = digito;
            params.password = password; 

            return AJAX.promise(params, 'post'); 
        }

    }
])

.service('AuthService', ['$q', '$http', 'CONSTANTS', '$localStorage', 'Admin', '$rootScope', '$sessionStorage',

    function($q, $http, CONSTANTS, $localStorage, Admin, $rootScope, $sessionStorage) {
        var isAuthenticated = false;
        var authToken;
        $rootScope.currentUser = {};
   
        var login = function(user) {
            return $q(function(resolve, reject) {
                if(CONSTANTS.ENVIROMENT_DEBUG_SESS==false){
                    var lo = Admin.login(user.run, user.digito,user.password); 
                    lo.then(
                        function(result) {
                            if (result.data.success == true) { 
                                var uid = {
                                    is_ok: true,
                                    Nombre: result.data.usuario.Persona.Nombre
                                }

                                storeUserCredentials(uid); 
                                loadUserCredentials(); 
                                resolve(result.data);
                            } else {
                                reject(result.data.msg);
                            }
                        },
                        function() {
                            reject("Error en el servidor");
                        }
                    );
                }
                else{
                    var uid = {
                        is_ok: true,
                        token: "xxyyyyy",
                        Id: 110000,
                        Nombre: "Cristian Perez"
                    }

                    storeUserCredentials(uid); 
                    loadUserCredentials(); 
                    resolve(uid);

                }
            });
        };

        var logout = function() {
            destroyUserCredentials();
        };

        function loadUserCredentials() {
            var data = $localStorage.uid;

            var token = data ? data.token : '';

            if ($localStorage.uid) {
                $rootScope.user = {};
                $rootScope.user.Id = $localStorage.uid.Id; 
                $rootScope.user.Nombre = $localStorage.uid.Nombre;
                $rootScope.user.token = $localStorage.uid.token;


                console.log("$rootScope.user.Nombre:: ",$rootScope.user.Nombre)
            }

            if (token) {
                useCredentials(token);
            }
        }

        function storeUserCredentials(uid) {
            $localStorage.uid = uid;
            useCredentials(uid.token);
        }

        function useCredentials(token) {
            isAuthenticated = true;
            authToken = token;

            // Set the token as header for your requests!
            // $http.defaults.headers.common.Authorization = authToken;
        }

        function destroyUserCredentials() {
            authToken = undefined;
            isAuthenticated = false;
            $http.defaults.headers.common.Authorization = undefined;
            delete $localStorage.uid;
            $sessionStorage.$reset(); 
            window.location = CONSTANTS.ENDPOINT_JS 
        }



        loadUserCredentials();

        return {
            login: login,
            // register: register,
            logout: logout,
            isAuthenticated: function() {
                return isAuthenticated;
            }
        };
    }
])

.factory('AuthInterceptor', ['$rootScope', '$q', 'CONSTANTS',
    function($rootScope, $q, CONSTANTS) {
        return {
            responseError: function(response) {
                $rootScope.$broadcast({
                    401: CONSTANTS.AUTH_EVENTS.notAuthenticated,
                }[response.status], response);
                return $q.reject(response);
            }
        }
    }
])



/****************************************************
 *  Servicios propios del dashbaord
 ***************************************************/


.service('sbaseproject', [
    function() {

        var options = {

            //Add slimscroll to navbar menus
            //This requires you to load the slimscroll plugin
            //in every page before app.js
            navbarMenuSlimscroll: true,
            navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
            navbarMenuHeight: "200px", //The height of the inner menu
            //General animation speed for JS animated elements such as box collapse/expand and
            //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
            //'fast', 'normal', or 'slow'
            animationSpeed: 500,
            //Sidebar push menu toggle button selector
            sidebarToggleSelector: "[data-toggle='offcanvas']",
            //Activate sidebar push menu
            sidebarPushMenu: false,
            //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
            sidebarSlimScroll: true,
            //Enable sidebar expand on hover effect for sidebar mini
            //This option is forced to true if both the fixed layout and sidebar mini
            //are used together
            sidebarExpandOnHover: false,
            //BoxRefresh Plugin
            enableBoxRefresh: true,
            //Bootstrap.js tooltip
            enableBSToppltip: true,
            BSTooltipSelector: "[data-toggle='tooltip']",
            //Enable Fast Click. Fastclick.js creates a more
            //native touch experience with touch devices. If you
            //choose to enable the plugin, make sure you load the script
            //before AdminLTE's app.js
            enableFastclick: true,
            //Control Sidebar Options
            enableControlSidebar: true,
            controlSidebarOptions: {
                //Which button should trigger the open/close event
                toggleBtnSelector: "[data-toggle='control-sidebar']",
                //The sidebar selector
                selector: ".control-sidebar",
                //Enable slide over content
                slide: true
            },
            //Box Widget Plugin. Enable this plugin
            //to allow boxes to be collapsed and/or removed
            enableBoxWidget: true,
            //Box Widget plugin options
            boxWidgetOptions: {
                boxWidgetIcons: {
                    //Collapse icon
                    collapse: 'fa-minus',
                    //Open icon
                    open: 'fa-plus',
                    //Remove icon
                    remove: 'fa-times'
                },
                boxWidgetSelectors: {
                    //Remove button selector
                    remove: '[data-widget="remove"]',
                    //Collapse button selector
                    collapse: '[data-widget="collapse"]'
                }
            },
            //Direct Chat plugin options
            directChat: {
                //Enable direct chat by default
                enable: true,
                //The button to open and close the chat contacts pane
                contactToggleSelector: '[data-widget="chat-pane-toggle"]'
            },
            //Define the set of colors to use globally around the website
            colors: {
                lightBlue: "#3c8dbc",
                red: "#f56954",
                green: "#00a65a",
                aqua: "#00c0ef",
                yellow: "#f39c12",
                blue: "#0073b7",
                navy: "#001F3F",
                teal: "#39CCCC",
                olive: "#3D9970",
                lime: "#01FF70",
                orange: "#FF851B",
                fuchsia: "#F012BE",
                purple: "#8E24AA",
                maroon: "#D81B60",
                black: "#222222",
                gray: "#d2d6de"
            },
            //The standard screen sizes that bootstrap uses.
            //If you change these in the variables.less file, change
            //them here too.
            screenSizes: {
                xs: 480,
                sm: 768,
                md: 992,
                lg: 1200
            },
            //skins available
            skins: [
                "skin-blue",
                "skin-black",
                "skin-red",
                "skin-yellow",
                "skin-purple",
                "skin-green",
                "skin-blue-light",
                "skin-black-light",
                "skin-red-light",
                "skin-yellow-light",
                "skin-purple-light",
                "skin-green-light"
            ]
        }

        var pushMenu = {
            activate: function(toggleBtn) {
                //Get the screen sizes
                var screenSizes = options.screenSizes;

                //Enable sidebar toggle
                $(toggleBtn).on('click', function(e) {
                    e.preventDefault();

                    //Enable sidebar push menu
                    if ($(window).width() > (screenSizes.sm - 1)) {
                        if ($("body").hasClass('sidebar-collapse')) {
                            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                        } else {
                            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                        }
                    }
                    //Handle sidebar push menu for small screens
                    else {
                        if ($("body").hasClass('sidebar-open')) {
                            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                        } else {
                            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                        }
                    }
                });

                $(".content-wrapper").click(function() {
                    //Enable hide menu when clicking on the content-wrapper on small screens
                    if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                        $("body").removeClass('sidebar-open');
                    }
                });

                //Enable expand on hover for sidebar mini
                if (options.sidebarExpandOnHover ||
                    ($('body').hasClass('fixed') &&
                        $('body').hasClass('sidebar-mini'))) {
                    this.expandOnHover();
                }
            },

            expandOnHover: function() {
                var _this = this;
                var screenWidth = options.screenSizes.sm - 1;
                //Expand sidebar on hover
                $('.main-sidebar').hover(function() {
                    if ($('body').hasClass('sidebar-mini') &&
                        $("body").hasClass('sidebar-collapse') &&
                        $(window).width() > screenWidth) {
                        _this.expand();
                    }
                }, function() {
                    if ($('body').hasClass('sidebar-mini') &&
                        $('body').hasClass('sidebar-expanded-on-hover') &&
                        $(window).width() > screenWidth) {
                        _this.collapse();
                    }
                });
            },

            expand: function() {
                $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
            },

            collapse: function() {
                if ($('body').hasClass('sidebar-expanded-on-hover')) {
                    $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
                }
            }
        }

        return {
            options: options,
            pushMenu: pushMenu
                //layout: layout,
        }
    }
])


/**
 * Tools in common for the whole site
 */
.service('Tools', function(toaster, CONSTANTS) {

    /************************************
     *	Format time string
     ***********************************/

    /**
     * convert sec to min
     */
    this.secondToMinutes = function(timeInSeconds) {
        var minutes = parseInt(timeInSeconds / 60);
        return minutes;
    };

    /**
     * get the date of {input} days ago
     */
    this.getPastDate = function(days) {
        return moment().subtract(days, 'days').format('YYYY/MM/DD hh:mm');
    };

    /************************************
     *	Format currency
     ***********************************/

    /**
     * convert cents to dollar without prefixing the currency symbol
     */
    this.centsToDollars = function(cents) {
        var dollars;
        cents = parseInt(cents);
        dollars = parseFloat(cents / 100).toFixed(2);
        return dollars;
    };

    /**
     * convert dollar to cent without prefixing the currency symbol
     */
    this.dollarsToCents = function(dollars) {
        var cents;
        dollars = parseFloat(dollars);
        cents = parseInt(dollars * 100);
        return cents;
    };

    /**
     * format dollar to 2 decimals without prefixing the currency symbol
     */
    this.dollarFormated = function(dollars) {
        dollars = parseFloat(dollars).toFixed(2);
        return dollars;
    };

    /************************************
     *	Format phone number
     ***********************************/

    /**
     * Format phone number
     */
    this.phoneNumberFormat = function(phoneNumber) {
        return phoneNumber.replace(/(\d{1,3})(\d{3})(\d{3})(\d{4})/, '+$1 $2-$3-$4');
    };

    /************************************
     *	Format data usage string
     ***********************************/

    /**
     * convert byte number to either kb or mb
     */
    this.getBytesString = function(bytes) {
        var bytes;
        if (bytes < 1024) {
            return bytes + " bytes";
        } else if (bytes < 1048576) {
            bytes /= 1024;
            bytes = parseInt(bytes);
            return bytes + " KB";
        } else {
            bytes /= 1048576;
            bytes = parseInt(bytes);
            return bytes + " MB";
        }
    };

    /**
     * convert byte number to icon flag
     * output will be 'high', 'medium', or 'low'
     * to use these flags, refer to:
     * <div class="image-icons data-low" ng-if="data.icon=='low'"></div>
     */
    this.getBytesUsageIconFlag = function(bytes) {
        //first benchmark at 5mb
        var benchmark1 = 1024 * 1024 * 5;
        //second benchmark at 10mb
        var benchmark2 = 1024 * 1024 * 10;
        if (bytes <= benchmark1) {
            return "low";
        } else if (bytes > benchmark1 && bytes <= benchmark2) {
            return "medium";
        } else {
            return "high";
        }
    };

    /************************************
     *	Format url encoded string
     ***********************************/

    /**
     * decode url encoded string and replace + with space
     */
    this.getNumbersFromString = function(str) {
        return str.match(/\d+/);
    };

    this.decodeFields = function(obj) {
        var newObj = {};
        angular.forEach(obj, function(value, key) {
            if (typeof value == 'string') {
                value = decodeURIComponent(value.replace(/\+/g, ' '));
            }
            this[key] = value;

        }, newObj);
        return newObj;
    };

    /************************************
     *	pagination helpers
     ***********************************/

    /**
     * calculate starting position
     */
    this.getPaginationStartPosition = function(currentPage) {
        return currentPage == 1 ? 0 : (currentPage - 1) * CONSTANTS.PAGINATION_MAX_NUMBER;
    };

    /************************************
     *	Show notifications
     ***********************************/

    /**
     * show notifications
     * type can be:
     */
    this.showNotification = function(type, message) {
        switch (type) {
            case 'success':
                toaster.success({
                    title: "Success",
                    body: message,
                    showCloseButton: true
                });
                break;
            case 'error':
                toaster.error({
                    title: "Error",
                    body: message,
                    showCloseButton: true
                });
                break;
            default:
                alert("Please define a notification type");
        }
    };

    // take count of how many connection error has been triggered.
    // if more than 1, then just show one toaster
    var connectionErrorCount = 0;

    this.showConnectionDownNotification = function() {
        if (connectionErrorCount < 1) {
            toaster.error({
                title: "Error",
                body: "Cannot communicate to the API service.",
                showCloseButton: true,
                onShowCallback: function() {
                    connectionErrorCount++;
                },
                onHideCallback: function() {
                    connectionErrorCount--;
                }
            });
        }
    };
})

/**
 * Date Tools
 */
.service('DateTools', function() {

    this.formatDate = function(date, format) {
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var year = date.getFullYear();
        var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        if (format == 'yyyy/mm/dd hh:mm:ss') {
            return year + '/' + month + '/' + day + ' ' + time;
        }
    };
})


;


 //------------------------------------------------------- 

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


 //------------------------------------------------------- 

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


 //------------------------------------------------------- 

/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('login', [
])

.config(['$stateProvider', 'CONSTANTS',
 
	function ($stateProvider, CONSTANTS) {
		$stateProvider
			.state('login', {
				url:'/login',
				templateUrl: CONSTANTS.DIR_PATH + 'app/login/login.tpl.html',
				controller: 'LoginController'
			})
	}

])

.controller('LoginController', ['$scope', '$state', 'AuthService',
	function($scope, $state, AuthService){
	    $scope.err_msg = ""; 
	    $scope.isError = 0;
        $scope.isCargando = false;

		//setting user email and password in the template
		$scope.user = {
		    run: '14543367',
			digito: '3',
		    password: 'Admin1234' 
		};

		$scope.login = function (user) {
		    $scope.isCargando = true;
            var promise = AuthService.login(user);
            promise.then(
        		function (result) { 
        		    console.log(result);
        		    $state.go('home.dashboard');
        		},
                function (r) {
					console.log("ERORRR")
                    $scope.err_msg = r;
                    $scope.isError = 1;
                    $scope.isCargando = false;
                }
        	);

        }

		$scope.onBlurRun = function(){
			try{
				$scope.user.run = $scope.user.run.replace(/\./g,'');
			}catch(e){
				console.log("without >>.<<",e)
			}
			
			$scope.user.run = parseInt($scope.user.run)

		}




	}
]);
