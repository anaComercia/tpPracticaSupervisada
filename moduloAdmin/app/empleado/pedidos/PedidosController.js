var pedidos = angular.module("backendEcommerceEmp.pedidos");

pedidos.controller("PedidosController", function($state, PedidoService){
	
	var self = this;
	this.ventas = [];
	this.pedidos = [];
    this.seleccion = '';
    
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
    
    this.init();
   
});