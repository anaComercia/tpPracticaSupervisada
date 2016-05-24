var usuarios = angular.module("backendEcommerceAdmin.usuarios");

usuarios.controller("UsuariosController", function($state, EmpleadoService, ProvinciaService, LocalidadService){
	
	this.title = "Modulo de Empleados";
	var self = this;
	this.empleados = [];
    this.filtroEmp = [];
    this.formLabel="Nuevo Empleado";
    this.seleccion = '';
    this.provincias = [];
    this.localidades = [];
    this.empleadoSeleccionado;
    this.habilitar;
    
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
    
    this.nuevoEmpleado = function(){
    $state.go("usuarios.nuevo");
    this.formLabel="Nuevo Empleado";
    }
    
     this.clear = function(){
    $state.go("usuarios");
    this.formLabel="";
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
    }
    
    this.init = function(){
        this.getProvincias();
        this.getLocalidades();
		this.getEmpleadosDetalles();
	};
    
    this.init();
});