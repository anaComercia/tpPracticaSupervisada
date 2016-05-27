var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("EmpleadoService", function($http){

    var self = this;
    
	this.getEmpleados = function(){
		var promise = $http.get('api/index.php/empleado');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getTipoDoc = function(){
		var promise = $http.get('api/index.php/tipoDoc');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    
    this.getEmpleadosDetalles = function(){
		var promise = $http.get('api/index.php/empleadoDetalle');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.getPerfilEmpleado = function($id){
		var promise = $http.get('api/index.php/empleado/'+$id);
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    this.createEmpleado = function(usuario, password, puesto, nombre, apellido, idTipoDoc, numDoc, telefono, email, idGenero, fechaNac, direccion, idProvincia, idLocalidad, cp){    
         data1 = 
        {
            'nombre' : nombre,
            'apellido' : apellido,
            'tipoDni' : idTipoDoc,
            'numDni' : numDoc,
            'telefono' : telefono,
            'email' : email,
            'idGenero' : idGenero,
            'fechaNacimiento' : fechaNac,
            'direccion' : direccion,
            'idProvincia' : idProvincia,
            'idLocalidad' : idLocalidad,
            'cp' : cp
        };
        $http.post('api/index.php/personas', data1).then(function(response){
        data2 = 
        {
            'usuario' : usuario,
            'pass' : password,
            'idPersona' : response.data.data.idPersona
        };
        var promise = $http.post('api/index.php/usuarios', data2).then(function(response2){
        data = 
        {
            'puesto' : puesto,
            'idUsuario' : response2.data.data.idUsuario
        };
        var promise = $http.post('api/index.php/empleados', data);
        return promise.then(function(response3){
            return response3;
        });
        });
        });
    };
    
     this.updateEmpleado = function(idEmpleado, idPersona, idUsuario, usuario, password, puesto, nombre, apellido, idTipoDoc, numDoc, telefono, email, idGenero, fechaNac, direccion, idProvincia, idLocalidad, cp, idDireccion){    
         data1 = 
        {
            'idPersona' : idPersona,
            'nombre' : nombre,
            'apellido' : apellido,
            'tipoDni' : idTipoDoc,
            'numDni' : numDoc,
            'telefono' : telefono,
            'email' : email,
            'idGenero' : idGenero,
            'fechaNacimiento' : fechaNac,
            'direccion' : direccion,
            'idProvincia' : idProvincia,
            'idLocalidad' : idLocalidad,
            'cp' : cp,
            'idDireccion':idDireccion
        };
        $http.put('api/index.php/personas', data1).then(function(response){
        data2 = 
        {
            'idUsuario' : idUsuario,
            'usuario' : usuario,
            'pass' : password
        };
        var promise = $http.put('api/index.php/usuarios', data2).then(function(response2){
        data = 
        {
            'idEmpleado':idEmpleado,
            'puesto' : puesto
        };
        var promise = $http.put('api/index.php/empleados', data);
        return promise.then(function(response3){
            return response3;
        });
        });
        });
    };
    
    this.deleteEmpleado = function($id){
        var promise = $http.delete('api/index.php/empleados/'+$id);
        return promise.then(function(response){
            return response;
        });
    };
    
     this.cambiarHabilitacion = function(id, habilitado){
         data = 
        {
            'idUsuario':id,
            'habilitado' : habilitado
        };
        var promise = $http.put('api/index.php/usuariosHabilitacion', data);
        return promise.then(function(response){
            return response;
        });
    };
});