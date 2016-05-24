var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("CrearCuentaService", function($http){

//Todas las operaciones le pegan siempre a un php solicitándole por url con que tabla se quiere trabajar


    
//Se realiza un post para insertar un cliente y se le pasa por parámetro los datos a insertar
    
    //Genero
    this.getGeneros = function(){
		var promise = $http.get('api/index.php/altaDeCuentaGenero');
		return promise.then(function(response){
			return response.data.data;
		})
	};
  
    //Provincia
    this.getProvincias = function(){
		var promise = $http.get('api/index.php/altaDeCuentaProvincia');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    //Localidad
    this.getLocalidadesById = function($id){
		var promise = $http.get('api/index.php/altaDeCuentaLocalidad/'+$id);
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
          , tipoDni
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
         , 'tipoDni':tipoDni
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