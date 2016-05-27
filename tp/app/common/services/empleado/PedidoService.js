var backendEcommerce = angular.module("backendEcommerceEmp");

backendEcommerce.service("PedidoService", function($http){

	this.getPedidos = function(){
		var promise = $http.get('api/index.php/pedido');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getPedidosDetalles = function(){
		var promise = $http.get('api/index.php/pedidoDetalle');
		return promise.then(function(response){
			return response.data.data;
		})
	};
});