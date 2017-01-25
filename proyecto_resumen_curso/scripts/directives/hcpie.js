'use strict';

/**
* @ngdoc directive
* @name wchileformaApp.directive:hcPie
* @description
* # hcPie
*/
angular.module('wchileformaApp')
.directive('hcPie', function () {
    return {
        restrict: 'AE',
        replace: false,
        scope: {
            items: '=',
            height:"@"
        },
        controller: function ($scope, $element, $attrs) {
            console.log(2);

        },
        template: '<div id="container" style="margin: 0 auto">not working</div>',
        link: function (scope, element, attrs) {
            var chart = new Highcharts.Chart({
                exporting: {
                    enabled: false
                },
                chart: {
                    height:scope.height,
                    renderTo: 'container',
                    type: 'column'
                },
                colors: [
                    '#FF7E00'

                ],
                title: {
                    style: {
                        display: 'none'
                    }
                },
                subtitle: {
                    style: {
                        display: 'none'
                    }
                },
                xAxis: {
                    labels:
                    {
                        enabled: false
                    },
                    type: 'category'
                },
                yAxis: {
                    min: 0,
                    gridLineWidth: 0,
                    title: {
                        text: ''
                    },
                    labels:
                    {
                        enabled: false
                    }

                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> del total<br/>'
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0
                    }
                },
                series: [{
                    type: 'column',
                    colorByPoint: true,
                    name: 'Browser share',
                    data: scope.items
                }]
            });
            scope.$watch("items", function (newValue) {
                chart.series[0].setData(newValue, true);
            }, true);

        }
    }
});
