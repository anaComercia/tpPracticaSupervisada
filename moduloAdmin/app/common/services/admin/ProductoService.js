var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

//Se crea un nuevo service para operar con la BD
backendEcommerceAdmin.service("ProductoService", function($http, Upload){
var self = this;
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
    this.updateProducto = function(idProducto, idCategoria, idGenero, titulo, descripcion, precio, puntoReposicion,mpsAgregadas, tallesAgregados, coloresAgregados,picFile1,picFile2, picFile3, picFile4){
       data = 
        {
            'idProducto' : idProducto, 
            'idCategoria' : idCategoria,
            'idGenero' : idGenero,
            'titulo':titulo,
            'descripcion':descripcion,
            'precio':precio,
            'puntoReposicion':puntoReposicion
        };
        
        var promise = $http.put('api/index.php/productos', data);
        return promise.then(function(response){
            
             if(picFile1){
            Upload.upload({
                  url: 'api/index.php/upload_fotos',
                  data: {image: [picFile1, picFile2, picFile3, picFile4], username: "usuario"}
            })
                .then(function(resp) {
                        var urls = [];
                        urls = resp.data.split(",").slice();
                        var indice = urls.indexOf("");
                        if(indice > -1){
                        urls.splice(indice,1);
                        }
                        fotos = {
                        'idProducto' : idProducto,
                        'urls' : urls
                        }
                    $http.post('api/index.php/productos_fotos', fotos);
                    });
           }
            
            
              if(tallesAgregados){
              if(tallesAgregados.length > 0){
            tallesAgregados.forEach(function(elemento){
                if(coloresAgregados){
                if(coloresAgregados.length > 0){
                    coloresAgregados.forEach(function(elemento2){
                        masData = {
                        'idProducto' : idProducto,
                        'idTalle' : elemento.idTalle,
                        'idColor' : elemento2.idColor
                        }
                    });
                }
                }
                $http.post('api/index.php/presentacion_producto', masData);
            });
        }
        }
        if(mpsAgregadas){
        if(mpsAgregadas.length > 0){
            var promise2 = $http.delete('api/index.php/prod_mp/'+ idProducto).then(function(response2){
                mpsAgregadas.forEach(function(elemento){
                masData= {
                    'idProducto' : idProducto,
                    'idMp' : elemento.idMP,
                    'cantidad' : elemento.cantidad
                }
                $http.post('api/index.php/prod_mp', masData);
                });});
        }
        }
            return response;
        });
    };
    
//Se realiza un post para insertar un producto y se le pasa por parámetro los datos a insertar
      this.createProducto = function(titulo,descripcion,idGenero, idCategoria, precio, puntoReposicion, mpsAgregadas, tallesAgregados, coloresAgregados, picFile1,picFile2, picFile3, picFile4){
             
          data = 
        {
            'titulo' : titulo, 
            'descripcion' : descripcion,
            'idGenero' : idGenero,
            'idCategoria':idCategoria,
            'precio':precio,
            'puntoReposicion':puntoReposicion
        };
        
        var promise = $http.post('api/index.php/productos', data);
        return promise.then(function(response){
      if(picFile1){
            Upload.upload({
                  url: 'api/index.php/upload_fotos',
                  data: {image: [picFile1, picFile2, picFile3, picFile4], username: "usuario"}
            })
                .then(function(resp) {
                        var urls = [];
                        urls = resp.data.split(",").slice();
                        var indice = urls.indexOf("");
                        if(indice > -1){
                        urls.splice(indice,1);
                        }
                        fotos = {
                        'idProducto' : response.data.data.idProducto,
                        'urls' : urls
                        }
                    $http.post('api/index.php/productos_fotos', fotos);
                    });
       }
            if(tallesAgregados){
        if(tallesAgregados.length > 0){
            tallesAgregados.forEach(function(elemento){
                if(coloresAgregados){
                if(coloresAgregados.length > 0){
                    coloresAgregados.forEach(function(elemento2){
                        masData = {
                        'idProducto' : response.data.data.idProducto,
                        'idTalle' : elemento.idTalle,
                        'idColor' : elemento2.idColor
                        }
                    });
                }
                }
                $http.post('api/index.php/presentacion_producto', masData);
            });
        }
        }
        if(mpsAgregadas){
        if(mpsAgregadas.length > 0){
                mpsAgregadas.forEach(function(elemento){
                masData= {
                    'idProducto' : response.data.data.idProducto,
                    'idMp' : elemento.idMP,
                    'cantidad' : elemento.cantidad
                }
                $http.post('api/index.php/prod_mp', masData);
                });
        }
        }
            return response;
        
        });
        
        };
    
    this.getPresentacionTalle = function($id){
		var promise = $http.get('api/index.php/productosPresentacionTalle/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
     this.getPresentacionColor = function($id){
		var promise = $http.get('api/index.php/productosPresentacionColor/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getProdMp = function($id){
		var promise = $http.get('api/index.php/productosMp/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
});