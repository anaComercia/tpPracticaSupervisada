var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

//Se crea un nuevo service para operar con la BD
backendEcommerceAdmin.service("ProductoService", function($http){

//Todas las operaciones le pegan siempre a un php solicitándole por url con que tabla se quiere trabajar

//Se realiza un get para traer datos
	this.getProductos = function(){
		var promise = $http.get('api/index.php/productos');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getProductosDetalles = function(){
		var promise = $http.get('api/index.php/productosDetalles');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
//Se realiza un delete para borrar datos y se le pasa por parámetro la id a borrar
      this.deleteProducto = function($id){
        var promise = $http.delete('api/index.php/productos/'+$id);
        return promise.then(function(response){
            return response;
        });
    };
    
//Se realiza un put para actualizar un producto y se le pasa por parámetro los datos a actualizar
    this.updateProducto = function(id, prod_desc, prod_precio, cat_id){
        data = 
        {
            'producto_id' : id,
            'producto_desc' : prod_desc, 
            'producto_precio' : prod_precio,
            'categoria_id' : cat_id 
        };
        
        var promise = $http.put('api/index.php/productos', data);
        return promise.then(function(response){
            return response;
        });
    };
    
//Se realiza un post para insertar un producto y se le pasa por parámetro los datos a insertar
      this.createProducto = function(prod_desc, prod_precio, cat_id){
        data = 
        {
            'producto_desc' : prod_desc, 
            'producto_precio' : prod_precio,
            'categoria_id' : cat_id    
        };
        
        var promise = $http.post('api/index.php/productos', data);
        return promise.then(function(response){
            return response;
        });
    };
    
});