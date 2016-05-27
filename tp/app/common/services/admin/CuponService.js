var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("CuponService", function($http){

	this.getCupones = function(){
		var promise = $http.get('api/index.php/cupones');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.createCupon = function(descripcion, montoDescuento){
        data = 
        {
            'descripcion' : descripcion,
            'montoDescuento' : montoDescuento
        };
        
        var promise = $http.post('api/index.php/cupones', data);
        return promise.then(function(response){
            return response;
        });
    };
    
    this.updateCupon = function(id, descripcion, montoDescuento){
        data = 
        {
            'id' : id,
            'descripcion' : descripcion,
            'montoDescuento' : montoDescuento
        };
        
        var promise = $http.put('api/index.php/cupones', data);
        return promise.then(function(response){
            return response;
        });
    };

    this.deleteCupon = function($id){
        var promise = $http.delete('api/index.php/cupones/'+$id);
        return promise.then(function(response){
            return response;
        });
    };
});