var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("MpService", function($http){

	this.getMps = function(){
		var promise = $http.get('api/index.php/mp');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getPrecios = function($id){
		var promise = $http.get('api/index.php/mpPrecios/' + $id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.createMp = function(titulo, unidad, puntoReposicion, precios){
        data = 
        {
            'titulo' : titulo,
            'unidad' : unidad,
            'puntoReposicion' : puntoReposicion
        };
        
        var promise = $http.post('api/index.php/mp', data);
        return promise.then(function(response){
        if(precios){
        if(precios.length > 0){
                precios.forEach(function(elemento){
                masData= {
                    'idMp' : response.data.data.idMp,
                    'precio' : elemento.precio,
                    'cantidad' : elemento.cantidad
                }
                $http.post('api/index.php/precio_mp', masData);
                });
        }
        }
            
            return response;
        });
    };
    
       this.updateMp = function(id, titulo, medida, puntoReposicion, precios){
         data = 
        {
            'idMp' : id, 
            'titulo' : titulo,
            'medida' : medida,
            'puntoReposicion' : puntoReposicion
        };
        
        var promise = $http.put('api/index.php/mp', data);
        return promise.then(function(response){
        if(precios){
        if(precios.length > 0){
            $http.delete('api/index.php/precio_mp/' + id).then(function(response2){
                precios.forEach(function(elemento){
                masData= {
                    'idMp' : id,
                    'precio' : elemento.precio,
                    'cantidad' : elemento.cantidad
                }
                $http.post('api/index.php/precio_mp', masData);
                });});
        }
        }
            return response;
        });
    };
    
          this.deleteMp = function($id){
        var promise = $http.delete('api/index.php/mp/'+$id);
        return promise.then(function(response){
            return response;
        });
    };
    
});