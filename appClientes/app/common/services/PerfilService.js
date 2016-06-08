var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("PerfilService", function($http){


    // acastillo 22/05/2016-------------------------------------------------------------
    //this.getDatosDelCliente = function(){
    this.getDatosDelCliente = function($email){
		var promise = $http.get('api/index.php/mostrarDatosCuenta/'+$email);
    
		return promise.then(function(response){
			return response.data.data;
		})
	};                  

// acastillo 27/05/2016-------------------------------------------------------------
    //Genero
    this.getGeneros = function(){
		var promise = $http.get('api/index.php/genero');
		return promise.then(function(response){
			return response.data.data;
		})
	};
  
    //Provincia
    this.getProvincias = function(){
		var promise = $http.get('api/index.php/provincia');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    //Localidad
    this.getLocalidadesById = function($id){
		var promise = $http.get('api/index.php/localidad/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    //Tipo Dni
    this.getTiposDni = function(){
		var promise = $http.get('api/index.php/tipoDni');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
// acastillo 28/05/2016-------------------------------------------------------------    
    	this.modificarCuenta= function(
                                       
          nombre
          , apellido 
          , email
          //, repetirEmail
          , numDni
          , idTipoDni
          , fechaNacimiento
          , telefono
          //, pais
          ,idProvincia
          , direccion
          , idLocalidad
          , codigoPostal
          //, clave
          //, repetirClave 
          , idGenero
          ,idDireccion
          )
      
    {
          data = 
        {
           'nombre':nombre
         , 'apellido':apellido
         , 'email':email
         //, 'repetirEmail':repetirEmail
         , 'numDni':numDni
         , 'idTipoDni':idTipoDni
         , 'fechaNacimiento':fechaNacimiento
         , 'telefono':telefono
         //, 'pais':pais
         , 'idProvincia':idProvincia
         , 'direccion':direccion
         , 'idLocalidad':idLocalidad
         , 'codigoPostal':codigoPostal
         //, 'clave':clave
         //, 'repetirClave':repetirClave
         , 'idGenero':idGenero
         , 'idDireccion':idDireccion
        };

        var promise = $http.put('api/index.php/modificacionDeCuenta', data);
        return promise.then(function(response){
            //console.log(response);
            return response.data.data;
        });
            
    };
   // acastillo 30/05/2016------------------------------------------------------------- 
    //Usiario
    this.getAllByEmail = function($id){
		var promise = $http.get('api/index.php/usuario/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    
    this.actualizarContrasenia= function(                  
            email
          , passwordNueva
          , passwordRepetir
          )
    {
          data = 
        {
           'email':email
            ,'passwordNueva':passwordNueva
            ,'passwordRepetir':passwordRepetir
        };

        var promise = $http.put('api/index.php/modificacionContrasenia', data);
        return promise.then(function(response){
            return response.data.data;
        });
            
    };
 
    //----------------------------------------------------------------------------------
    
    this.getReputacion = function($id){
		var promise = $http.get('api/index.php/reputacionPerf/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getCuponesNuevos = function($id){
		var promise = $http.get('api/index.php/cuponNuevo/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getCuponesUsados = function($id){
		var promise = $http.get('api/index.php/cuponUsado/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
   
    
});