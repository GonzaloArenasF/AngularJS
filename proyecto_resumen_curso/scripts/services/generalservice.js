'use strict';

/**
 * @ngdoc service
 * @name wchileformaApp.generalService
 * @description
 * # generalService
 * Factory in the wchileformaApp.
 */
angular.module('wchileformaApp')
    .factory('generalService', function ($resource) {
      return $resource('data/BIG_DATA.json', {});
    })
    .factory('itemService', function($resource) {
       var resource = $resource('data/SINGLE_DATA.json', {id:'@productoId'});
       return {
          getResource: function(productoId) {
              var producto = resource.get({productoId:productoId}, function(r){
                  console.log(r)
              })
              return producto;
          }
       };
    });
