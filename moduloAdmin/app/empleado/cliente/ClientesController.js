var cliente = angular.module("backendEcommerceEmp.clientes");

cliente.controller("ClientesController", function($state,ClienteService){
	
	var self = this;
	this.clientes = [];
    this.nuevaMp="";
    this.formLabel="Nuevo Cliente";
    this.seleccion = '';
    this.parametrosBusqueda= [];
    this.busqAv = false;
    
 this.getClientesDetalles = function(){
    return ClienteService.getClientesDetalles().then(function(data){
            if(data){
            self.clientes = data;
            }
        });
    };
	
    this.agregarParametro = function(){
     var texto = jQuery('#cbParametro').val();
    if(self.parametrosBusqueda.indexOf(texto) == -1){
     self.parametrosBusqueda.push(texto);
    }
    }
        
    this.quitarParametro = function(index){
     self.parametrosBusqueda.splice(index,1);
    }
    
    this.update = function(){
    self.filtroCliente = [];
    }
    
    this.clear = function(){
    $state.go("clientes");
    }
    
    this.init = function(){
		this.getClientesDetalles();
	};
    
    this.init();
   
});