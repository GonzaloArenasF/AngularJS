var myApp = angular.module("myapp", []);

myApp.controller('MainController', function($scope) {
    $scope.seguro={
        nif:"",
        nombre:"",
        ape1:"",
        edad:undefined,
        sexo:"",
        casado:true,
        numHijos:undefined,
        embarazada:false,
        coberturas: {
          oftalmologia:false,
          dental:false,
          fecundacionInVitro:false
        },
        enfermedades:{
          corazon:false,
          estomacal:false,
          rinyones:false,
          alergia:false,
          nombreAlergia:""
        },
        fechaCreacion:new Date()
      }
});
