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
