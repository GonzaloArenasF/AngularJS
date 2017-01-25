/**
 * @author Mauricio Barria Joost <mbarria@chileforma.cl>
 */
angular.module('krApp.constant', [])
  
.constant('CONSTANTS', (function() {
  // Define Environment
  var debug = true;
 
  //endpoint = 'http://10.211.55.4:1314/';
  if(debug){
      endpoint = 'https://jsonplaceholder.typicode.com/';
  }
  else{
      endpoint = 'https://jsonplaceholder.typicode.com/'; 
  } 
   
  //var endsrc = "/linea_base_dash_ang_v3.0/";
  var endsrc = "http://localhost:8888/angularjs/linea_base_dash_ang_v3.0/";   
     

  // Use the variable in your constants
  return { 
    ENVIROMENT_DEBUG_SESS: debug, 
    ENDPOINT_URI: endpoint, 
    ENDPOINT_JS: endsrc + "src/", //TODO PUEDE QUEDAR EL DE ENDPOINT SI ESTAN EN EL MISMO SERVER
    DIR_PATH: endsrc + '',
    DIRECTIVE_PATH: endsrc + 'app/common/directives/',
    ICON_PATH: endsrc + 'src/assets/imageIcons/',
    IMAGE_PATH: endsrc + 'src/assets/', 
    CURRENCY_SIGN: '$', 
    PAGINATION_MAX_NUMBER: 25,
    AUTH_EVENTS: {
      notAuthenticated: 'auth-not-authenticated'
    }


  };
})());
