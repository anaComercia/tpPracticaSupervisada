var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("ColorService", function($http){

	this.getColores = function(){
		var promise = $http.get('api/index.php/color');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.createColor = function(color_desc){
        data = 
        {
            'color_desc' : color_desc    
        };
        
        var promise = $http.post('api/index.php/colores', data);
        return promise.then(function(response){
            return response;
        });
    };
    
    this.updateColor = function(color_desc, id){
        data = 
        {
            'color_id' : id,
            'color_desc' : color_desc    
        };
        
        var promise = $http.put('api/index.php/colores', data);
        return promise.then(function(response){
            return response;
        });
    };

    this.deleteColor = function($id){
        var promise = $http.delete('api/index.php/colores/'+$id);
        return promise.then(function(response){
            return response;
        });
    };
});