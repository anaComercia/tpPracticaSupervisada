var cliente = angular.module("backendEcommerceEmp.clientes");

cliente.controller("ClientesController", function($state,ClienteService){
	
	var self = this;
	this.clientes = [];
    this.nuevaMp="";
    this.formLabel="Nuevo Cliente";
    this.seleccion = '';
    this.parametrosBusqueda= [];
    this.busqAv = false;
    this.clienteSeleccionado = null;
    this.habilitar;
    
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
    }}
    
    this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.clienteSeleccionado = item;
        if(item.habilitado == 1){
        self.habilitar = 'Deshabilitar';
        }else{
        self.habilitar = 'Habilitar';
        }
        self.activado = false; 
    };
    
    this.habilitacion = function(cliente){
    if(cliente.habilitado == 1){
    cliente.habilitado = 0;
    }else{
    cliente.habilitado = 1;
    cliente.reputacion = 100;
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