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
