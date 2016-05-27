var backendEcommerce = angular.module("backendEcommerceEmp");

backendEcommerce.service("ClienteService", function($http){

	this.getClientes = function(){
		var promise = $http.get('api/index.php/cliente');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getClientesDetalles = function(){
		var promise = $http.get('api/index.php/clienteDetalle');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getPerfilCliente = function($id){
		var promise = $http.get('api/index.php/cliente/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	}; 
});