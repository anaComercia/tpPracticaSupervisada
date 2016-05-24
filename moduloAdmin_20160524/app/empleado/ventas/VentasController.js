var ventas = angular.module("backendEcommerceEmp.ventas");

ventas.controller("VentasController", function($state, VentaService){
	
	var self = this;
	this.ventas = [];
	this.clientes = [];
    this.seleccion = '';
    this.parametrosBusqueda= [];
    this.busqAv = false;
    
 this.getVentasDetalles = function(){
    return VentaService.getVentasDetalles().then(function(data){
            if(data){
            self.ventas = data;
            }
        });
    };
	
    this.update = function(){
    self.filtroVenta = [];
    }
    
    this.clear = function(){
    $state.go("ventas");
    }
    
    this.agregarParametro = function(){
     var texto = jQuery('#cbParametro').val();
    if(self.parametrosBusqueda.indexOf(texto) == -1){
     self.parametrosBusqueda.push(texto);
    }
    }
        
    this.quitarParametro = function(index){
     self.parametrosBusqueda.splice(index,1);
    }
    
    this.init = function(){
		this.getVentasDetalles();
	};
    
    this.init();
   
});