var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("LugarService", function($http){

	this.getLugares = function(){
		var promise = $http.get('api/index.php/lugar');
		return promise.then(function(response){
			return response.data.data;
		})
	};
});