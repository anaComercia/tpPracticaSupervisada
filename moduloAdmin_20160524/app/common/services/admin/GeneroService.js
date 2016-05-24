var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("GeneroService", function($http){

	this.getGeneros = function(){
		var promise = $http.get('api/index.php/genero');
		return promise.then(function(response){
			return response.data.data;
		})
	};
});