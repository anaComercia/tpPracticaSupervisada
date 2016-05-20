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
    
    this.crearNuevaCuenta = function(
                                       
          nombre
          , apellido 
          , email
          , repetirEmail
          , numDni
          , tipoDni
          , fechaNacimiento
          , telefono
          , pais
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
         , 'pais':pais
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