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
