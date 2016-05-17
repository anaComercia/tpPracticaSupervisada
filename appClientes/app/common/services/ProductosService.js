var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("ProductosService", function($http){

	this.getAllProductos = function(){
		var promise = $http.get('api/index.php/productos');

		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getDetalleProducto = function(){
		var promise = $http.get('api/index.php/productosDetail/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getProductosHombre = function(){
		var promise = $http.get('api/index.php/productosHombre');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getProductosMujer = function(){
    	var promise = $http.get('api/index.php/productosMujer');
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
    this.getProductosCamisa = function(){
    	var promise = $http.get('api/index.php/productosCamisa');
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
     this.getProductosJean = function(){
    	var promise = $http.get('api/index.php/productosJean');
		return promise.then(function(response){
			return response.data.data;
		})
    };
      this.getProductosCampera = function(){
    	var promise = $http.get('api/index.php/productosCampera');
		return promise.then(function(response){
			return response.data.data;
		})
    };
          this.getProductosRemera = function(){
    	var promise = $http.get('api/index.php/productosRemera');
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
});