var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("BancoTarjetaService", function($http){

	this.getBancos = function(){
		var promise = $http.get('api/index.php/banco');
		return promise.then(function(response){
			return response.data.data;
		})
	}; 
    
    this.getTarjetas = function(){
		var promise = $http.get('api/index.php/tarjeta');
		return promise.then(function(response){
			return response.data.data;
		})
	}; 
    
	this.getCuotas = function($id){
		var promise = $http.get('api/index.php/tarjeta/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
});