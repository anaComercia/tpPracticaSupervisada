var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("PerfilAdmService", function($http){

	this.getPerfil = function($id){
		var promise = $http.get('api/index.php/admin/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	}; 
    
});