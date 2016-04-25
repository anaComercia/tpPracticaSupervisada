var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("ColorService", function($http){

	this.getColores = function(){
		var promise = $http.get('api/index.php/color');
		return promise.then(function(response){
			return response.data.data;
		})
	};
});