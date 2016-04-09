var backendEcommerce = angular.module("backendEcommerce");

backendEcommerce.service("TalleService", function($http){

	this.getTalles = function(){
		var promise = $http.get('api/index.php/talle');
		return promise.then(function(response){
			return response.data.data;
		})
	};
});