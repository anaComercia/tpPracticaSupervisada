var ventas = angular.module("backendEcommerceEmp.ventas");

ventas.controller("VentasController", function($state, VentaService){
	
	var self = this;
	this.ventas = [];
	this.clientes = [];
    this.seleccion = '';
    
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
    
    this.init = function(){
		this.getVentasDetalles();
	};
    
    this.init();
   
});