var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("EnvioService", function($http){

	this.getEnvios = function(){
		var promise = $http.get('api/index.php/envio');
		return promise.then(function(response){
			return response.data.data;
		})
	};
});