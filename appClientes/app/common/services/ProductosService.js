var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("ProductosService", function($http){

	this.getAllBancos = function(){
		var promise = $http.get('api/index.php/bancos');

		return promise.then(function(response){
			return response.data.data;
		})
	};
    
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
          this.getImgModulo = function(){
    	var promise = $http.get('api/index.php/ProdImgModulo');
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
    this.getTalles = function($id){
    	var promise = $http.get('api/index.php/ProdTalles/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
   // $app->get('/ProdColores/:colorBusqueda', function($colorBusqueda){
    this.getColores = function($idTalle,$idProd){
    	var promise = $http.get('api/index.php/ProdColores/'+$idTalle+'&'+$idProd);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
});