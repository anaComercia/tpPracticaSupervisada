var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("EmpleadoService", function($http){

	this.getEmpleados = function(){
		var promise = $http.get('api/index.php/empleado');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getEmpleadosDetalles = function(){
		var promise = $http.get('api/index.php/empleadoDetalle');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getPerfilEmpleado = function($id){
		var promise = $http.get('api/index.php/empleado/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	}; 
});