var backendEcommerceAdmin= angular.module("backendEcommerceAdmin");

//Se crea un nuevo service para operar con la BD
backendEcommerceAdmin.service("LocalidadService", function($http){

//Todas las operaciones le pegan siempre a un php solicitándole por url con que tabla se quiere trabajar

//Se realiza un get para traer datos
	this.getLocalidades = function(){
		var promise = $http.get('api/index.php/localidad');
		return promise.then(function(response){
			return response.data.data;
		})
	};
 
    
     this.getLocalidadesById = function($id){
		var promise = $http.get('api/index.php/localidad/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
     this.getDireccion = function($id){
		var promise = $http.get('api/index.php/direccion/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
         this.createLocalidad = function(descripcion, idProvincia){
        data = 
        {
            'descripcion' : descripcion,
            'idProvincia' : idProvincia
        };
        
        var promise = $http.post('api/index.php/localidad', data);
        return promise.then(function(response){
            return response;
        });
    };
    
       this.updateLocalidad = function(idLocalidad,descripcion, idProvincia){
        data = 
        {
            'idLocalidad' : idLocalidad,
            'descripcion' : descripcion,
            'idProvincia' : idProvincia
        };
        
        var promise = $http.put('api/index.php/localidad', data);
        return promise.then(function(response){
            return response;
        });
    };
    
     this.deleteLocalidad = function($id){
        var promise = $http.delete('api/index.php/localidad/'+ $id);
        return promise.then(function(response){
            return response;
    });
    };
});