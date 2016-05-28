var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("CarritoService", function($http){

	this.getBancos = function(){
		var promise = $http.get('api/index.php/bancosCarrito');

		return promise.then(function(response){
			return response.data.data;
		})
	};
    
       this.getTarjetas = function($id){
    	var promise = $http.get('api/index.php/carritoTarjetas/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
     this.getCuotas = function($idBanco,$idTarjeta){
    	var promise = $http.get('api/index.php/CuotasCarrito/'+$idBanco+'&'+$idTarjeta);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
    this.getSucursales = function(){
    	var promise = $http.get('api/index.php/traerSucursales');
		return promise.then(function(response){
			return response.data.data;
		})
    };
     this.getVerifCupon = function($descCupon,$idUsr){
    	var promise = $http.get('api/index.php/verifCupon/'+$descCupon+'&'+$idUsr);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
    
});