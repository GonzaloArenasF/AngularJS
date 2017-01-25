'use strict';

/**
 * @ngdoc service
 * @name wchileformaApp.parseUtilidades
 * @description
 * # parseUtilidades
 * Service in the wchileformaApp.
 */
angular.module('wchileformaApp')
  .service('parseUtilidades', function () {

    this.isEmail = function(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }

  });
