'use strict';

/**
* @ngdoc directive
* @name wchileformaApp.directive:wordUnderCursor
* @description
* # wordUnderCursor
*/
angular.module('wchileformaApp')
.directive('wordUnderCursor', function () {
    return {
        scope: {
            wordUnderCursor: "=",
            wordUnderCursorContent: "="
        },
        link: function(scope, elment) {
            scope.$watch('wordUnderCursorContent', function(newValue) {
                console.log(newValue);
                if (newValue) {
                    var $element = $(elment);

                    $element.html(newValue.replace(/\b(\w+)\b/g, "<span>$1</span>"));

                    $element.find('span').hover(
                        function() {
                            var $span = $(this);
                            $span.css('background-color', '#ffff66');
                            scope.$apply(function() {
                                scope.wordUnderCursor = $span.text();
                            });
                        },
                        function() {
                            var $span = $(this);
                            $span.css('background-color', '');
                            scope.$apply(function() {
                                scope.wordUnderCursor = "";
                            });
                        }
                    );
                }
            });
        }
    }
});
