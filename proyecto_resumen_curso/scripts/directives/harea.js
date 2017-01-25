'use strict';

/**
* @ngdoc directive
* @name wchileformaApp.directive:harea
* @description
* # harea
*/
angular.module('wchileformaApp')
.directive('harea', function () {
    return {
        restrict: 'AE',
        replace: false,
        scope: {
            items: '=',
            height:"@"
        },
        controller: function ($scope, $element, $attrs) {

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
                    type: 'area'
                },
                title: {
                    text: 'Historic and Estimated Worldwide Population Distribution by Region'
                },
                subtitle: {
                    text: 'Source: Wikipedia.org'
                },
                xAxis: {
                    categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                },
                yAxis: {
                    title: {
                        text: 'Percent'
                    },
                    isDirty: true

                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
                    shared: true
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        stacking: 'percent',
                        lineColor: '#ffffff',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#ffffff'
                        }
                    }
                },
                series: scope.items
            });
            scope.$watch("items", function (newValue) {
                console.log(newValue[4])
                chart.series[4].setData(newValue[4].data, true);
                chart.redraw();
            }, true);

        }
    };
});
