var backendEcommerceEmp= angular.module("backendEcommerceEmp");

//Se crea un nuevo service para operar con la BD
backendEcommerceEmp.service("DireccionService", function($http){

//Todas las operaciones le pegan siempre a un php solicitándole por url con que tabla se quiere trabajar

//Se realiza un get para traer datos
	this.getDirecciones = function(){
		var promise = $http.get('api/index.php/direccion');
		return promise.then(function(response){
			return response.data.data;
		})
	};
 
});