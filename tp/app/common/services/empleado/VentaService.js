var backendEcommerce = angular.module("backendEcommerceEmp");

backendEcommerce.service("VentaService", function($http){

	this.getVentas = function(){
		var promise = $http.get('api/index.php/venta');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getVentasDetalles = function(){
		var promise = $http.get('api/index.php/ventaDetalle');
		return promise.then(function(response){
			return response.data.data;
		})
	};
});