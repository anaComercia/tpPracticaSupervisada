var backendEcommerceEmp= angular.module("backendEcommerceEmp");

//Se crea un nuevo service para operar con la BD
backendEcommerceEmp.service("RecetaService", function($http){

//Todas las operaciones le pegan siempre a un php solicitándole por url con que tabla se quiere trabajar

//Se realiza un get para traer datos
   this.getReceta = function($id){
		var promise = $http.get('api/index.php/receta/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	}; 
    
	this.getRecetas = function(){
		var promise = $http.get('api/index.php/receta');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getRecetasSoloProductos = function(){
		var promise = $http.get('api/index.php/recetaSoloProductos');
		return promise.then(function(response){
			return response.data.data;
		})
	};
 
});