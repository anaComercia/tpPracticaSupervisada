var usuarios = angular.module("backendEcommerceAdmin.usuarios");

usuarios.controller("UsuariosController", function($state, EmpleadoService, ProvinciaService, LocalidadService, GeneroService){
	
	var self = this;
	this.empleados = [];
    this.filtroEmp = [];
    this.seleccion = '';
    this.provincias = [];
    this.localidades = [];
    this.tiposDoc = [];
    this.nuevoEmpleado = null;
    this.empleadoSeleccionado = null;
    this.empleadoSeleccionadoEditar = null;
    this.habilitar;
    this.dateEditar = new Date();
    
    this.getEmpleadosDetalles = function(){
    return EmpleadoService.getEmpleadosDetalles().then(function(data){
            self.empleados = data;
        });
     };
                                                                                              
     this.getProvincias = function(){
    return ProvinciaService.getProvincias().then(function(data){
            self.provincias = data;
        });
    };
    
     this.getLocalidades = function(){
    return LocalidadService.getLocalidades().then(function(data){
            self.localidades = data;
        });
    };
    
      this.getLocalidadesById = function(id){
    return LocalidadService.getLocalidadesById(id).then(function(data){
            self.localidades = data;
        });
    };
    
    this.getGeneros = function(){
          return GeneroService.getGeneros().then(function(data){
            self.generos = data;
        });
    };
    
     this.getDocs = function(){
          return EmpleadoService.getTipoDoc().then(function(data){
            self.tiposDoc = data;
        });
    };
    
    this.getDireccion = function(id){
        return LocalidadService.getDireccion(id).then(function(data){
        if(data){
        self.empleadoSeleccionadoEditar.idLocalidad = data[0].idLocalidad;
        self.empleadoSeleccionadoEditar.idProvincia = data[0].idProvincia;
        self.empleadoSeleccionadoEditar.direccion = data[0].direccion;
        self.empleadoSeleccionadoEditar.cp = data[0].cp;
        self.getLocalidadesById(self.empleadoSeleccionadoEditar.idProvincia);
        }
        });
    }
    
    this.editarUsuario = function(){
        self.empleadoSeleccionadoEditar = JSON.parse(JSON.stringify(self.empleadoSeleccionado));
        self.getDireccion(self.empleadoSeleccionadoEditar.idDireccion); 
		$state.go("usuarios.editar",  { id : self.empleadoSeleccionadoEditar.idEmpleado});
            var fecha = self.convertirFecha(self.empleadoSeleccionadoEditar.fechaNacimiento);
            var fecha = fecha.split("/");
            var dia = parseInt(fecha[0]);
            var mes = parseInt(fecha[1])-1;
            var year = parseInt(fecha[2]);
            self.dateEditar = new Date(year, mes,dia);
    };
    
    this.createEmpleado = function(){
        EmpleadoService.createEmpleado(self.nuevoEmpleado.usuario, self.nuevoEmpleado.password, self.nuevoEmpleado.puesto, self.nuevoEmpleado.nombre, self.nuevoEmpleado.apellido, self.nuevoEmpleado.idTipoDoc, self.nuevoEmpleado.numDoc, self.nuevoEmpleado.telefono, self.nuevoEmpleado.email, self.nuevoEmpleado.idGenero, self.nuevoEmpleado.fechaNac, self.nuevoEmpleado.direccion, self.nuevoEmpleado.idProvincia, self.nuevoEmpleado.idLocalidad, self.nuevoEmpleado.cp).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.nuevoEmpleado = null;
            self.empleadoSeleccionadoEditar = null;
            self.getEmpleadosDetalles();
			self.activeItem(-1, null);
			$state.go("usuarios");
        })
    };
    
      this.updateEmpleado = function(){
 EmpleadoService.updateEmpleado(self.empleadoSeleccionadoEditar.idEmpleado, self.empleadoSeleccionadoEditar.idPersona, self.empleadoSeleccionadoEditar.idUsuario, self.empleadoSeleccionadoEditar.usuario, self.empleadoSeleccionadoEditar.password, self.empleadoSeleccionadoEditar.puesto, self.empleadoSeleccionadoEditar.nombre, self.empleadoSeleccionadoEditar.apellido, self.empleadoSeleccionadoEditar.tipoDni, self.empleadoSeleccionadoEditar.numDni, self.empleadoSeleccionadoEditar.telefono, self.empleadoSeleccionadoEditar.email, self.empleadoSeleccionadoEditar.idGenero, self.dateEditar, self.empleadoSeleccionadoEditar.direccion, self.empleadoSeleccionadoEditar.idProvincia, self.empleadoSeleccionadoEditar.idLocalidad, self.empleadoSeleccionadoEditar.cp, self.empleadoSeleccionadoEditar.idDireccion ).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.nuevoEmpleado = null;
            self.empleadoSeleccionadoEditar = null;
            self.getEmpleadosDetalles();
			self.activeItem(-1, null);
			$state.go("usuarios");
        })
    };
    
      this.deleteEmpleado = function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        EmpleadoService.deleteEmpleado(self.empleadoSeleccionado.idEmpleado).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.getEmpleadosDetalles();
			self.activeItem(-1, null);
			$state.go("usuarios");
            })
        } 
    };
    
    this.convertirFecha = function(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    }   
    
    this.clear = function(){
    $state.go("usuarios");
    self.empleadoSeleccionadoEditar = null;
    self.nuevoEmpleado = null;
    }
    
    this.activeItem = function($index, item){
    self.selectedIndex = $index;
    self.empleadoSeleccionado = item;
    if(item.habilitado == 1){
    self.habilitar = 'Deshabilitar';
    }else{
    self.habilitar = 'Habilitar';
    }
    };
     
    this.update = function(){
    self.filtroEmp = [];
    }
    
    this.habilitacion = function(empleado){
    if(empleado.habilitado == 1){
    empleado.habilitado = 0;
    }else{
    empleado.habilitado = 1;
    }
    EmpleadoService.cambiarHabilitacion(empleado.idUsuario, empleado.habilitado);
    }
    
    this.init = function(){
        this.getProvincias();
        this.getGeneros();
        this.getDocs();
		this.getEmpleadosDetalles();
	};
    
    this.init();
});