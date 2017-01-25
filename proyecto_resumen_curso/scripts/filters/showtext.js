'use strict';

/**
 * @ngdoc filter
 * @name wchileformaApp.filter:showtext
 * @function
 * @description
 * # showtext
 * Filter in the wchileformaApp.
 */
angular.module('wchileformaApp')
  .filter('showtext', function () {
      return function(input, max) {
          var _max = max || 25;
          if(input)
            return (input.length > _max)  ? input.substring(0,_max)+"..." : input;
          else
            return input
      }
  });
