var backendEcommerceEmp= angular.module("backendEcommerceEmp");

//Se crea un nuevo service para operar con la BD
backendEcommerceEmp.service("StockService", function($http){

//Todas las operaciones le pegan siempre a un php solicitándole por url con que tabla se quiere trabajar

//Se realiza un get para traer datos
	this.getStock = function(){
		var promise = $http.get('api/index.php/stock');
		return promise.then(function(response){
			return response.data.data;
		})
	};
 
    this.getStockDetalles = function(){
		var promise = $http.get('api/index.php/stockDetalles');
		return promise.then(function(response){
			return response.data.data;
		})
	};
});