var backendEcommerce = angular.module("backendEcommerce");

backendEcommerce.service("MpService", function($http){

	this.getMps = function(){
		var promise = $http.get('api/index.php/mp');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getPrecioMp = function(){
		var promise = $http.get('api/index.php/preciomp');
		return promise.then(function(response){
			return response.data.data;
		})
	};
});