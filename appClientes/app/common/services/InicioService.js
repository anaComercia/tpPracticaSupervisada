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
  
});