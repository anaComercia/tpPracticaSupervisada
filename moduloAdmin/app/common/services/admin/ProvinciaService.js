var backendEcommerceAdmin= angular.module("backendEcommerceAdmin");

//Se crea un nuevo service para operar con la BD
backendEcommerceAdmin.service("ProvinciaService", function($http){

//Todas las operaciones le pegan siempre a un php solicitándole por url con que tabla se quiere trabajar

//Se realiza un get para traer datos
	this.getProvincias = function(){
		var promise = $http.get('api/index.php/provincia');
		return promise.then(function(response){
			return response.data.data;
		})
	};
 
});