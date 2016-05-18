var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("FooterService", function($http){

	this.getTelefonos = function(){
		var promise = $http.get('api/index.php/telSucursales');

		return promise.then(function(response){
			return response.data.data;
		})
	};

  
});