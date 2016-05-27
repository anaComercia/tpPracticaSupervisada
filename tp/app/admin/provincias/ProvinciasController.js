var provincias = angular.module("backendEcommerceAdmin.provincias");

provincias.controller("ProvinciasController", function($state, ProvinciaService, LocalidadService){
	
	var self = this;
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.provincias = [];
    this.localidades = [];
    this.nuevaProvincia = null;
    this.provinciaSeleccionada = null;
    this.provinciaSeleccionadaEditar = null;
    this.nuevaLocalidad = null;
    this.localidadSeleccionada = null;
    this.localidadSeleccionadaEditar = null;
    this.seleccion;
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
    
    this.activeItemProvincia = function($index, item){
        self.selectedIndexProvincia = $index;
        self.provinciaSeleccionada = item;
        self.provinciaSeleccionadaEditar = JSON.parse(JSON.stringify(self.provinciaSeleccionada));
    };
    
    this.activeItemLocalidad = function($index, item){
        self.selectedIndexLocalidad = $index;
        self.localidadSeleccionada = item;
        self.localidadSeleccionadaEditar = JSON.parse(JSON.stringify(self.localidadSeleccionada));
    };
    
    this.nuevaProvincia = function(){
    $state.go("provincias.nueva");
    };
    
    this.editarProvincia = function(){
    $state.go("provincias.editar");
    };
    
    this.nuevaLocalidad = function(){
    $state.go("provincias.localidades.nueva");
    };
    
    this.editarLocalidad = function(){
    $state.go("provincias.localidades.editar");
    };
    
    this.clearProvincia = function(){
    self.provinciaSeleccionadaEditar = null;
    $state.go("provincias");
    };
    
    this.clearLocalidad = function(){
    self.localidadSeleccionadaEditar = null;
    $state.go("provincias.localidades");
    }
    
    this.createProvincia = function(){
        ProvinciaService.createProvincia(self.nuevaProvincia.descripcion).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            $state.go("provincias");
            self.nuevaProvincia = null;
            self.getProvincias();
        })
    };
    
    this.updateProvincia = function(){
 ProvinciaService.updateProvincia(self.provinciaSeleccionadaEditar.idProvincia,self.provinciaSeleccionadaEditar.descripcion).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            $state.go("provincias");
            self.getProvincias();
        })
    };
    
     this.deleteProvincia = function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        ProvinciaService.deleteProvincia(self.provinciaSeleccionada.idProvincia).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            alert("Provincia eliminada");
            self.getProvincias();
			self.activeItem(-1, null);
			$state.go("provincias");
            })
        } 
    };
    
    this.createLocalidad = function(){
        LocalidadService.createLocalidad(self.nuevaLocalidad.descripcion, self.nuevaLocalidad.idProvincia).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            $state.go("provincias.localidades");
            self.nuevaLocalidad = null;
            self.getLocalidades();
        })
    };
    
    this.updateLocalidad = function(){
 LocalidadService.updateLocalidad(self.localidadSeleccionadaEditar.idLocalidad,self.localidadSeleccionadaEditar.descripcion, self.localidadSeleccionadaEditar.idProvincia).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            $state.go("provincias.localidades");
            self.getLocalidades();
        })
    };
    
     this.deleteLocalidad = function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        LocalidadService.deleteLocalidad(self.localidadSeleccionadaEditar.idLocalidad).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            alert("Localidad eliminada");
            self.getLocalidades();
			self.activeItem(-1, null);
			$state.go("provincias.localidades");
            })
        } 
    };
    
    this.update = function(){
    self.filtroProv = [];
    }
    
     this.updateLoc = function(){
    self.filtroLoc= [];
    }
    
    this.init = function(){
    self.getProvincias();
    self.getLocalidades();
	};
    
    this.init();
   
});