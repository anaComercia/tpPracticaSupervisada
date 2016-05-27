var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("CategoriaService", function($http){

	this.getCategorias = function(){
		var promise = $http.get('api/index.php/categorias');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.createCategoria = function(cat_desc){
        data = 
        {
            'categoria_desc' : cat_desc    
        };
        
        var promise = $http.post('api/index.php/categorias', data);
        return promise.then(function(response){
            return response;
        });
    };
    
    this.updateCategoria = function(cat_desc, id){
        data = 
        {
            'categoria_id' : id,
            'categoria_desc' : cat_desc    
        };
        
        var promise = $http.put('api/index.php/categorias', data);
        return promise.then(function(response){
            return response;
        });
    };

    this.deleteCategoria = function($id){
        var promise = $http.delete('api/index.php/categorias/'+$id);
        return promise.then(function(response){
            return response;
        });
    };
    this.getCategoria = function($id){
        var promise = $http.get('api/index.php/categorias/'+$id);
        return promise.then(function(response){
            return response.data.data;
        });
    };
});