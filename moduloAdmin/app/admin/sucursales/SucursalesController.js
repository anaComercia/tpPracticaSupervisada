var sucursales = angular.module("backendEcommerceAdmin.sucursales");

sucursales.controller("SucursalesController", function($state, SucursalService){
	
	var self = this;
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.sucursales = [];
    
        this.getSucursales = function(){
    return SucursalService.getSucursales().then(function(data){
            self.sucursales = data;
        });
    };
    
    this.update = function(){
    self.filtroMp = [];
    }
    
    this.init = function(){
        self.getSucursales();
	};
    
    this.init();
   
});