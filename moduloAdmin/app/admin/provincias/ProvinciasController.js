var provincias = angular.module("backendEcommerceAdmin.provincias");

provincias.controller("ProvinciasController", function($state, ProvinciaService, LocalidadService){
	
	var self = this;
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.provincias = [];
    this.localidades = [];
    
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
    
    this.init = function(){
    self.getProvincias();
    self.getLocalidades();
	};
    
    this.init();
   
});