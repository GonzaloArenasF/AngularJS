'use strict';

/**
 * @ngdoc function
 * @name wchileformaApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the wchileformaApp
 */
angular.module('wchileformaApp')
  .controller('HomeCtrl', function ($scope) {
      $scope.modules = [
             {
                 name: 'UI Bootstrap',
                 desc: 'Lo utilizamos para embellecer las plantillas angularjs',
                 src: 'http://angular-ui.github.io/bootstrap/',
                 home: 'http://getbootstrap.com/css/',
                 tip: 'Con UI Bootstrap tenemos la capacidad de manejar con directivas y conceptos angular la capa visual de nuestros componentes, se inyecta como un modulo más. Pasos: http://angular-ui.github.io/bootstrap/#/getting_started'
             },
             {
                 name: 'Angular Enterprise Seed',
                 desc: 'Scaffolding de proyectos, también para angularjs.',
                 home: 'http://robertjchristian.github.io/angular-enterprise-seed/#/'
             },
             {
                 name: 'GIT',
                 home: 'https://github.com',
                 desc: 'Es nuestro repositorio, podemos buscar, instalar, desinstalar librerías. Muchos seeds se encuentran acá'
             },
             {
                 name: 'Lineman, jhipster,  Yeoman, Cleverstack, Yearofmoo',
                 desc: 'Generadores de proyectos angular, comandos útiles para la creacion de controladores, directivas, servicios, rutas, etc.',
                 src: 'http://www.linemanjs.com/',
                 tip: 'Podemos crear una ruta por ejemplo, y yeoman creara los accesos en ngroute, creara el controller, la vista y generará los test unitarios.'
             },
             {
                 name: 'ANG:Module',
                 desc: 'Por lo general 1 aplicación tiene 1 modulo. Pero puede darse que tengan muchos modulos dependiendo la complejidad, y hacer un ramificación grande. <<  angular.module("app", [/*libs...*/ ])  >>',
                 src:'',
                 home: '',
                 tip: 'Si tenemos una aplicación grande, podriamos separar los modulos de pago/registro/cuentas/otros por ejemplo y unirlos en el principal: angular.module("initModule", ["cuentas","registro","pago","otros","ui-route"])'
             },
             {
                 name: 'ANG:Controller',
                 desc: 'En los controladores tendremos toda la lógica del manejo de la interfaz gráfica. 1 controller -> 1 vista',
                 src:'',
                 home:'',
                 tip: 'Distintas formas tenemos para inyectar servicios externos y de angular. Si vamos a ofuscar nuestro código se recomienda utilizar las inyecciones que correspondan. Puedes utilizar ng-annotate para programar de la forma \"corta\" y esta librería en runtime hara el trabajo de injectar con las buenas prácticas.'
             },
             {
                 name: 'ANG:Service',
                 desc: 'Los servicios son nuestra capa de acceso a datos. Cuando pensemos en un ajax, tendremos que hacer un servicio e inyectarlo en el controlador a utilizar',
                 src:'',
                 home: '',
                 tip: 'Hay mucha confusión respecto a cual utilizar. Tenemos value-constant-service-provider-factory. Pero en un 90% de los casos con un factory tendras todo lo que necesitas.'
             },
             {
                 name: 'ANG:Directive',
                 desc: 'Cuando queramos utilizar el DOM por alguna razón, nunca lo debemos utilizar desde un controller. Para eso tendremos las directivas. Creacion y extensión del HTML común. No se inyectan y están siempre disponibles. Si le ponemos dentro de un controladlor x, asume ese scope para trabajar con él si es requerido.',
                 src:'',
                 home: '',
                 tip: 'La función más utilizada es <<link>> es donde podremos manipular el dom, obtener datos del scope y tratarlos, incluso modificarlos. Tambien escuchar eventos de la directiva. Utilizamos jqLite(jquery básico) para manipular todo esto.'
             },
             {
                 name: 'ANG:ViewModel ($scope)',
                 desc: 'Muchas formas tenemos de manipular las plantillas, cuando de bidireccionalidad se trata, la forma que tenemos para la comunicación es hacerlo a traves del $scope que es el servicio encargado de esto.',
                 src:'',
                 home: '',
                 tip: 'Hay otras formas de utilizar un scope. Encontraremos que algunas formas avanzadas utilizan <<this>> en vez de un $scope, esto es para acceder a controladores más directamente, sobre todo en proyectos complejos con múltiples herencias, en donde a traves del alias accedemos al <<scope>> de cada controlador de forma directa.'
             },
             {
                 name: 'ANG:Templates/Views',
                 desc: 'Cuando modificamos las vistas y agregamos directivas angular o nuestras, loq ue modificamos son enrealidad plantillas. Son capaces de obtener variables del $scope, $rootScope y directivas',
                 src:'',
                 home: '',
                 tip: 'Las vistas tienen un trabajo constante de renderización. Para optimizar estos trabajos se utilizan dos puntos( {{::varible}} ), sólo cuando queremos unidireccionalidad, para no estar escuchando comportamientos todo el tiempo. Se utiliza y optimizan mucho las tablas de esta forma.'
             },
             {
                 name: 'ANG:Routing',
                 desc: 'Para el manejo de rutas tenemos un modulo interno de angular llamado <<ngRoute>>. Este se descarga y se injecta a nuestro modulo. Uno aún más famoso es <<ui-route>> modulo externo y se instala de la misma forma. Sus posibilidades son más complejas, vistas anidadas y múltiples. Manejo por estados.',
                 src:'',
                 home: '',
                 tip: 'Paa proyectos grandes utilizar ui-route es una tremenda librería y según se dice será parte del framework angular en algún futuro.'
             },
             {
                 name: 'ANG:Routing',
                 desc: 'Para el manejo de rutas tenemos un modulo interno de angular llamado <<ngRoute>>. Este se descarga y se injecta a nuestro modulo. Uno aún más famoso es <<ui-route>> modulo externo y se instala de la misma forma. Sus posibilidades son más complejas, vistas anidadas y múltiples. Manejo por estados.',
                 src:'',
                 home: '',
                 tip: 'Para proyectos grandes utilizar ui-route es una tremenda librería y según se dice será parte del framework angular en algún futuro.'
             },
             {
                 name: 'ANG:URLs',
                 desc: 'Para evitar el hashtag <<#>> se puede reemplazar por un <<!>> esto le dice a los buscadores que hay contenido ajax en formato SPA.',
                 src:'',
                 home: '',
                 tip: 'Si deseamos urls-limpias sin signos, es necesario activar el modo HTML5 en la etapa de configurtación de angular. Pero esto tiene que ir de la mano de configuraciones por el lado del servidor. Que pueden ser mas tediosas para el caso de proyectos como JEE.'
             },
             {
                 name: 'ANG:$http/$resource',
                 desc: 'Para llamadas AJAX utilizamos $http para las convencionales y $resource(necesita el modulo ngresource) para llamadas RESTFul',
                 src:'',
                 home: '',
                 tip: '$resources es más complejo y grande que $http, tenemos múltiples formas de configuraciones.'
             },
             {
                 name: 'ANG:$apply',
                 desc: 'Para llamadas AJAX podríamos utilizar jquery, pero esto no sería parte de angularJS y al salir del contexto si queremos utilizar los datos de la respuesta, tenemos que volverlos a ingresar al contexto angular con $apply: $scope.$apply()',
                 src:'',
                 home: '',
                 tip: '$apply es un servicio que ejecuta todos los watchers que estén en nuestro modulo. Si quisieramos mejorarlo podriamos ejecutar $diggest, este ejecutara sólo los que tienen que ver con el controlador actual.'
             },
             {
                 name: 'ANG:$scope/$rootScope',
                 desc: '$rootScope por lo general se utiliza para casos en donde tenemos que dejar variables/funciones globales, por ejemplo en la etapa de <<run>> de angularjs ante alguna llamada. Tambien lo utilizaremos para hacer llamados de eventos para todos los $scopes.',
                 src:'',
                 home: '',
                 tip: 'Si necesitamos <<conversar>> entre constroladores utilizar servicios! Estos son singleton y para cada controller que los instancie tendrán la misma información.'
             },
             {
                 name: 'ANG:$q/promise/deferred',
                 desc: 'Es un monitor para llamadas asincronas. Con esto podemos manejar las llamadas exitosas, errores y reportes del progreso de la ejecución. Con $q.deferred podremos comunicarnos y darle los mensajes ante errores y comunicaciones con el controlador que utilice nuestros servicios. Utilizar notify() para progresos parciales en tu promesa.',
                 src:'',
                 home: '',
                 tip: '$http/$timeout por ejemplo retorna una promesa, nuestros servicios asincronos por convencion deberían siempre retornar promesas.'
             },
             {
                 name: 'ANG-MOD: ngMessages',
                 desc: 'Cuando utilizamos validadores en nuestros formularios, este modulo nos ayuda a mostrar los mensajes más facilmente.',
                 src:'',
                 home: ''
             },
             {
                 name: 'ANG-MOD: ngSanitize',
                 desc: 'Si deseamos mostrar HTML como tal, con esta libreria podemos mostrarlo limpiamente sin que nuestro navegador lo resuelva como HTML. Escapando los caracteres.',
                 src:'',
                 home: ''
             },
             {
                 name: 'ANG-MOD: ngCookies',
                 desc: 'Cuando tengamos que guardar información en cache por ejemplo, podemos utilizar este modulo para guardar listados o objetos en memoria cookie (Otra opción sería en localStorage).',
                 src:'',
                 home: ''
             },
             {
                 name: 'ANG-MOD: ngAnimate',
                 desc: 'Animaciones básicas como fade/pop se utilian sólo en algunos componentes.',
                 src:'',
                 home: ''
             }


         ];
  });
