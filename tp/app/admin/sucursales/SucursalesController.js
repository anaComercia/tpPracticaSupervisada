var sucursales = angular.module("backendEcommerceAdmin.sucursales");

sucursales.controller("SucursalesController", function($state, SucursalService,ProvinciaService, LocalidadService){
	
	var self = this;
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.sucursales = [];
    this.provincias = [];
    this.localidades = [];
    this.nuevaSuc = null;
    this.sucSeleccionada = null;
    this.sucursalSeleccionadaEditar = null;
    
        this.getSucursales = function(){
    return SucursalService.getSucursales().then(function(data){
            self.sucursales = data;
        });
    };
    
        this.getProvincias = function(){
    return ProvinciaService.getProvincias().then(function(data){
            self.provincias = data;
        });
    };
    
     this.getLocalidadesById = function(id){
    return LocalidadService.getLocalidadesById(id).then(function(data){
            self.localidades = data;
        });
    };
    
        this.createSucursal = function(){
        SucursalService.createSucursal(self.nuevaSuc.nro,self.nuevaSuc.telefono, self.nuevaSuc.horario, self.nuevaSuc.idLocalidad, self.nuevaSuc.direccion, self.nuevaSuc.cp).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.getSucursales();
            self.nuevaSuc = null;
            $state.go("sucursales");
        })
    };
    
       this.editSucursal = function(){
        SucursalService.editSucursal(self.sucursalSeleccionadaEditar.idSucursal, self.sucursalSeleccionadaEditar.nroSucursal,self.sucursalSeleccionadaEditar.telefono, self.sucursalSeleccionadaEditar.horarioAtencion, self.sucursalSeleccionadaEditar.idLocalidad, self.sucursalSeleccionadaEditar.direccion, self.sucursalSeleccionadaEditar.cp, self.sucursalSeleccionadaEditar.idDireccion).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.getSucursales();
            $state.go("sucursales");
        })
    };
    
        this.deleteSucursal= function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        SucursalService.deleteSucursal(self.sucSeleccionada.idSucursal).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.sucursalSeleccionadaEditar = null;
            self.getSucursales();
            self.activeItem(-1, null);
			$state.go("sucursales");
            })
        } 
    };
    
    
      this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.sucSeleccionada = item;
    };
    
    this.nuevaSucursal = function(){
    $state.go("sucursales.nueva");
    }
    
    this.editarSucursal = function(){
    self.sucursalSeleccionadaEditar = JSON.parse(JSON.stringify(self.sucSeleccionada));
    self.getLocalidadesById(self.sucursalSeleccionadaEditar.idProvincia);
    $state.go("sucursales.editar");
    }
    
    this.clear = function(){
    $state.go("sucursales");
    }
    
    
    this.update = function(){
    self.filtroMp = [];
    }
    
    this.init = function(){
        self.getSucursales();
        self.getProvincias();
	};
    
    this.init();
   
});