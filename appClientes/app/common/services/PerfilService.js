var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("PerfilService", function($http){


    // acastillo 22/05/2016-------------------------------------------------------------
    this.getDatosDelCliente = function(){
		var promise = $http.get('api/index.php/mostrarDatosCuenta');
    
		return promise.then(function(response){
			return response.data.data;
		})
	};                  

    //----------------------------------------------------------------------------------
    
    this.getReputacion = function($id){
		var promise = $http.get('api/index.php/reputacionPerf/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getCuponesNuevos = function($id){
		var promise = $http.get('api/index.php/cuponNuevo/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getCuponesUsados = function($id){
		var promise = $http.get('api/index.php/cuponUsado/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
   
    
});