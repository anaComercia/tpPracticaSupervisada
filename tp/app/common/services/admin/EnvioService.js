var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("EnvioService", function($http){

	this.getEnvios = function(){
		var promise = $http.get('api/index.php/envio');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
     this.inicializarEnviosSucursales = function(idSuc1, idSuc2){
        data = 
        {
            'idSuc1' : idSuc1,
            'idSuc2' : idSuc2
        };
        
        var promise = $http.post('api/index.php/inicializarEnvio', data);
        return promise.then(function(response){
            return response;
        });
    };
    
 
    
    this.deleteEnvio = function(){
        var promise = $http.delete('api/index.php/envio');
        return promise.then(function(response){
            return response;
        });
    };
    
     this.updateEnvio = function(idEnvioSucursal, tardanza){
        data = 
        {
            'idEnvioSucursal' : idEnvioSucursal,
            'tardanza':tardanza
        };
        
        var promise = $http.put('api/index.php/envio', data);
        return promise.then(function(response){
            return response;
        });
    };
    
});