var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("InicioService", function($http){

	this.getTelefonos = function(){
		var promise = $http.get('api/index.php/inicio');

		return promise.then(function(response){
			return response.data.data;
		})
	};
    
        
    this.getInicioMujer = function(){
    	var promise = $http.get('api/index.php/IniMujer');
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
      this.getProductoCliente = function($dato){
    	var promise = $http.get('api/index.php/IniBuscadorProd/'+$dato);
		return promise.then(function(response){
			return response.data.data;
		})
    };
             this.getInicioHombre = function(){
    	var promise = $http.get('api/index.php/IniHombre');
		return promise.then(function(response){
			return response.data.data;
		})
    };
                this.getImgFijas = function(){
    	var promise = $http.get('api/index.php/IniImgFijas');
		return promise.then(function(response){
			return response.data.data;
		})
    };
  
        
// acastillo 30/05/2016-------------------------------------------------------------
    this.loginByEmailPassword = function($email,$password){

        var data = {
        'email' : $email,
        'password' : $password
        }
        
    	var promise = $http.post('api/index.php/usuarioEmailPassword', data);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
    // acastillo 30/05/2016-------------------------------------------------------------
    this.loginlByEmailFechaNacimiento= function($email,$fechaNacimiento){

        var data = {
        'email' : $email,
        'fechaNacimiento' : $fechaNacimiento
        }
        
    	var promise = $http.post('api/index.php/usuarioEmailFechaNacimiento', data);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
    this.setLogin = function(usuario, password){
        data = 
        {
            'usuario' : usuario,
            'password': password
        };
        var promise = $http.post('api/index.php/login', data);
        return promise.then(function(response){
            return response;
        });
    };
    
    this.getLogin = function(){
		var promise = $http.get('api/index.php/login');
		return promise.then(function(response){
			return response.data.data;
		})
	}; 
    
     this.cerrarSesion = function(){
		var promise = $http.delete('api/index.php/login');
		return promise.then(function(response){
			return response.data.data;
		})
	}; 
  
});