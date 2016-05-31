var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("CarritoService", function($http){

	this.getBancos = function(){
		var promise = $http.get('api/index.php/bancosCarrito');

		return promise.then(function(response){
			return response.data.data;
		})
	};
    
       this.getTarjetas = function($id){
    	var promise = $http.get('api/index.php/carritoTarjetas/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
     this.getCuotas = function($idBanco,$idTarjeta){
    	var promise = $http.get('api/index.php/CuotasCarrito/'+$idBanco+'&'+$idTarjeta);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
    this.getSucursales = function(){
    	var promise = $http.get('api/index.php/traerSucursales');
		return promise.then(function(response){
			return response.data.data;
		})
    };
     this.getDomicilios = function($idUsuario){
    	var promise = $http.get('api/index.php/traerDomicilios/'+$idUsuario);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    this.getLocalidades = function($idProv){
    	var promise = $http.get('api/index.php/traerLocalidades/'+$idProv);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    this.getProvincias = function(){
    	var promise = $http.get('api/index.php/traerProvincias');
		return promise.then(function(response){
			return response.data.data;
		})
    };
     this.getVerifCupon = function($descCupon,$idUsr){
    	var promise = $http.get('api/index.php/verifCupon/'+$descCupon+'&'+$idUsr);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    this.getIdPersona = function($idUsr){
    	var promise = $http.get('api/index.php/buscarIdPersona/'+$idUsr);
		return promise.then(function(response){
			return response.data.data;
		})
    };
    
     this.postNvoDom = function(direccion, cp, idProv, idLoc, idPersona){
        data = {
            'direccion':direccion, 
            'cp':cp,
            'provincia':idProv,
            'localidad':idLoc,
            'usuario':idPersona};
        
          
        var promise = $http.post('api/index.php/altaDeDomicilio', data);
        return promise.then(function(response){
            return response;
        });
    };
    
    this.actualizarCupon = function(idCupon, idUsuario){
        data = {
            'idCupon':idCupon,
            'idUsuario':idUsuario};
        var promise = $http.post('api/index.php/updateCupon', data);
        return promise.then(function(response){
            return response;
        });
    };
    
     this.postInsertCompra = function(idUsuario, 
                                      idCupon, 
                                      idTarjetaBanco, 
                                      idSucursal, 
                                      idDireccion,
                                      totalPagar,
                                      fechaCompra,
                                      fechaTarjeta,
                                       fechaPago,
                                      estado,
                                      nroTarjeta,
                                      tipoPago,
                                      detalleCompra){
        data = {
            'idUsuario':idUsuario, 
            'idCupon':idCupon,
            'idTarjetaBanco':idTarjetaBanco,
            'idSucursal':idSucursal,
            'idDireccion':idDireccion,
            'totalPagar':totalPagar,
            'fechaCompra':fechaCompra,
            'fechaTarjeta':fechaTarjeta,
            'fechaPago':fechaPago,
            'estado':estado,
            'nroTarjeta':nroTarjeta,
            'tipoPago':tipoPago,
            'detalle':detalleCompra};
        
          
        var promise = $http.post('api/index.php/insertCompra', data);
        return promise.then(function(response){
            console.log(response);
            return response;
        });
    };
    
});