var backendEcommerceEmp= angular.module("backendEcommerceEmp");

//Se crea un nuevo service para operar con la BD
backendEcommerceEmp.service("LocalidadService", function($http){

//Todas las operaciones le pegan siempre a un php solicitándole por url con que tabla se quiere trabajar

//Se realiza un get para traer datos
	this.getLocalidades = function(){
		var promise = $http.get('api/index.php/localidad');
		return promise.then(function(response){
			return response.data.data;
		})
	};
 
});