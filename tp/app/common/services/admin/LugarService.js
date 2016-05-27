var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("LugarService", function($http){

	this.getLugares = function(){
		var promise = $http.get('api/index.php/lugar');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
       this.inicializarLugares = function($id){
        var promise = $http.post('api/index.php/inicializarLugar/'+$id);
        return promise.then(function(response){
            return response;
        });
    };
    
         this.updateEnvio = function(idLugar, tardanza, costo){
        data = 
        {
            'idLugar' : idLugar,
            'tardanza':tardanza,
            'costo' : costo
        };
        
        var promise = $http.put('api/index.php/lugar', data);
        return promise.then(function(response){
            return response;
        });
    };
});