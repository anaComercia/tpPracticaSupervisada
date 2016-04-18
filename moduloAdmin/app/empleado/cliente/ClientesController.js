var cliente = angular.module("backendEcommerceEmp.clientes");

cliente.controller("ClientesController", function($state, ClienteService){
	
	var self = this;
	this.clientes = [];
    this.nuevaMp="";
    this.formLabel="Nuevo Cliente";
    this.seleccion = '';
    
 this.getClientesDetalles = function(){
    return ClienteService.getClientesDetalles().then(function(data){
            if(data){
            self.clientes = data;
            }
        });
    };
	
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