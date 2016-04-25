var pedidos = angular.module("backendEcommerceEmp.pedidos");

pedidos.controller("PedidosController", function($state, PedidoService){
	
	var self = this;
	this.ventas = [];
	this.pedidos = [];
    this.seleccion = '';
    this.parametrosBusqueda= [];
    this.busqAv = false;
    
 this.getPedidosDetalles = function(){
    return PedidoService.getPedidosDetalles().then(function(data){
            if(data){
            self.pedidos = data;
            }
        });
    };
	
    this.update = function(){
    self.filtroPedido = [];
    }
    
    this.clear = function(){
    $state.go("pedidos");
    }
    
    this.init = function(){
		this.getPedidosDetalles();
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
    
    this.init();
   
});