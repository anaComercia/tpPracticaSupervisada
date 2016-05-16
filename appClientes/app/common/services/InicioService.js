var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("InicioService", function($http){

	this.getTelefonos = function(){
		var promise = $http.get('api/index.php/inicio');

		return promise.then(function(response){
			return response.data.data;
		})
	};
    
  
});