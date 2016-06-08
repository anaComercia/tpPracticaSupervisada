var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("CrearCuentaService", function($http){

//Todas las operaciones le pegan siempre a un php solicitándole por url con que tabla se quiere trabajar


    
//Se realiza un post para insertar un cliente y se le pasa por parámetro los datos a insertar
    
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
    
    this.crearNuevaCuenta = function(
                                       
          nombre
          , apellido 
          , email
          , repetirEmail
          , numDni

          , idTipoDni
          , fechaNacimiento
          , telefono
          //, pais
          ,idProvincia
          , direccion
          , idLocalidad
          , codigoPostal
          , clave
          , repetirClave 
          , idGenero
          ,idDireccion
          )
      
    {
        
          
          data = 
        {
           'nombre':nombre
         , 'apellido':apellido
         , 'email':email
         , 'repetirEmail':repetirEmail
         , 'numDni':numDni

         , 'idTipoDni':idTipoDni
         , 'fechaNacimiento':fechaNacimiento
         , 'telefono':telefono
         //, 'pais':pais
         , 'idProvincia':idProvincia
         , 'direccion':direccion
         , 'idLocalidad':idLocalidad
         , 'codigoPostal':codigoPostal
         , 'clave':clave
         , 'repetirClave':repetirClave
         , 'idGenero':idGenero
         , 'idDireccion':idDireccion
        };
        
          
        var promise = $http.post('api/index.php/altaDeCuenta', data);
        return promise.then(function(response){
            console.log(response);
            return response;
        });
    };
    
    

  
});