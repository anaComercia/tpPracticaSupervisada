var backendEcommerce = angular.module("backendEcommerceEmp");

backendEcommerce.service("AvisoProdService", function($http){

	this.getAvisosProd = function(){
		var promise = $http.get('api/index.php/avisoProd');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getAvisosProdDetalles = function(){
		var promise = $http.get('api/index.php/avisoProdDetalles');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getAvisosMpDetalles = function(){
		var promise = $http.get('api/index.php/avisoMpDetalles');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
});