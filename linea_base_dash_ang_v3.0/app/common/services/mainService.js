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
