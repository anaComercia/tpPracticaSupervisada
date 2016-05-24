var backendEcommerceAdmin= angular.module("backendEcommerceAdmin");

//Se crea un nuevo service para operar con la BD
backendEcommerceAdmin.service("SucursalService", function($http){

//Todas las operaciones le pegan siempre a un php solicitándole por url con que tabla se quiere trabajar

//Se realiza un get para traer datos
	this.getSucursales = function(){
		var promise = $http.get('api/index.php/sucursal');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getSucursalesById = function($id){
		var promise = $http.get('api/index.php/sucursal/'+id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
 
    
       this.createSucursal = function(nro, telefono, horario, idLocalidad, direccion, cp){
        data = 
        {
            'nro' : nro,
            'telefono' : telefono,
            'horario' : horario,
            'idLocalidad' : idLocalidad,
            'direccion' : direccion,
            'cp' : cp
        };
        
        var promise = $http.post('api/index.php/sucursal', data);
        return promise.then(function(response){
            return response;
        });
    };
    
         this.editSucursal = function(id,nro, telefono, horario, idLocalidad, direccion, cp, idDireccion)       {
        data = 
        {
            'id' : id,
            'nro' : nro,
            'telefono' : telefono,
            'horario' : horario,
            'idLocalidad' : idLocalidad,
            'direccion' : direccion,
            'cp' : cp,
            'idDireccion':idDireccion
        };
        
        var promise = $http.put('api/index.php/sucursal', data);
        return promise.then(function(response){
            return response;
        });
        };
    
        this.deleteSucursal = function($id)       {
        var promise = $http.delete('api/index.php/sucursal/'+ $id);
        return promise.then(function(response){
            return response;
        });
        };
    
});