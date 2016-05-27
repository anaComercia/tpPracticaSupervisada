var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("BancoTarjetaService", function($http){

	this.getBancos = function(){
		var promise = $http.get('api/index.php/banco');
		return promise.then(function(response){
			return response.data.data;
		})
	}; 
    
    this.getTarjetas = function(){
		var promise = $http.get('api/index.php/tarjeta');
		return promise.then(function(response){
			return response.data.data;
		})
	}; 
    
	this.getCuotas = function($id){
		var promise = $http.get('api/index.php/tarjeta/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.createBanco = function(descripcion){
        data = 
        {
            'descripcion' : descripcion    
        };
        
        var promise = $http.post('api/index.php/banco', data);
        return promise.then(function(response){
            return response;
        });
    };
    
    this.updateBanco = function(idBanco, descripcion){
        data = 
        {
            'idBanco' : idBanco,
            'descripcion' : descripcion    
        };
        
        var promise = $http.put('api/index.php/banco', data);
        return promise.then(function(response){
            return response;
        });
    };
    
    this.deleteBanco = function($id){
        
        var promise = $http.delete('api/index.php/banco/'+$id);
        return promise.then(function(response){
            return response;
        });
    };
    
    this.createTarjeta = function(descripcion){
        data = 
        {
            'descripcion' : descripcion    
        };
        
        var promise = $http.post('api/index.php/tarjeta', data);
        return promise.then(function(response){
            return response;
        });
    };
    
    this.updateTarjeta = function(idTarjeta, descripcion){
        data = 
        {
            'idTarjeta' : idTarjeta,
            'descripcion' : descripcion    
        };
        
        var promise = $http.put('api/index.php/tarjeta', data);
        return promise.then(function(response){
            return response;
        });
    };
    
    this.deleteTarjeta = function($id){
        var promise = $http.delete('api/index.php/tarjeta/'+$id);
        return promise.then(function(response){
            return response;
        });
    };
    
       this.updateCuota = function(cuotas){
       
         var promise2 = $http.delete('api/index.php/cuotas/' + cuotas[0].idTarjeta);
        return promise2.then(function(response2){
        cuotas.forEach(function(elemento){
        data = 
        {
            'idTarjeta' : elemento.idTarjeta,
            'idBanco' : elemento.idBanco,
            'cuotas' : elemento.cuotas,
            'interes' : elemento.interes
        };
        var promise = $http.post('api/index.php/cuotas', data);
        });   
        return response2;
        });
    };
});