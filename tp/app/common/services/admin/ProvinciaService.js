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
 
    this.getProvinciasById = function($id){
		var promise = $http.get('api/index.php/provincia/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
     this.createProvincia = function(descripcion){
        data = 
        {
            'descripcion' : descripcion    
        };
        
        var promise = $http.post('api/index.php/provincia', data);
        return promise.then(function(response){
            return response;
        });
    };
    
       this.updateProvincia = function(idProvincia,descripcion){
        data = 
        {
            'idProvincia' : idProvincia,
            'descripcion' : descripcion    
        };
        
        var promise = $http.put('api/index.php/provincia', data);
        return promise.then(function(response){
            return response;
        });
    };
    
     this.deleteProvincia = function($id){
        var promise = $http.delete('api/index.php/provincia/'+ $id);
        return promise.then(function(response){
            return response;
    });
    };
    
});