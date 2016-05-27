var backendEcommerceEmp = angular.module("backendEcommerceEmp");

backendEcommerceEmp.service("MpService", function($http){

	this.getMps = function(){
		var promise = $http.get('api/index.php/mp');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    
    
});