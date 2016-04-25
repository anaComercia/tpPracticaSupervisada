var alerta = angular.module("backendEcommerceEmp.alertas");

alerta.controller("AlertasController", function($state, AvisoProdService){
	
	this.title = "Modulo de Alertas";
	var self = this;
    this.avisosProd = [];
    this.avisosMp = [];
    this.productos = [];
    this.stocks = [];
    this.sucursales = [];
    this.filtroAviso = [];
    this.avisoSeleccionado = null;
    this.avisoMpSeleccionado = null;
    this.reponer = false;
    this.reponerMp = false;
    
    this.getAvisoProd = function(){
    return AvisoProdService.getAvisosProd().then(function(data){
            self.avisosProd = data;
        });
    };
    
    this.getAvisoProdDetalles = function(){
    return AvisoProdService.getAvisosProdDetalles().then(function(data){
            self.avisosProd = data;
        });
    };
    
     this.getAvisoMpDetalles = function(){
    return AvisoProdService.getAvisosMpDetalles().then(function(data){
            self.avisosMp = data;
        });
    };
    
    this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.avisoSeleccionado = item;
    };
    
    this.activeItemMp = function($index, item){
        self.selectedIndexMp = $index;
        self.avisoMpSeleccionado = item;
    };
    
    this.atenderPedido = function(){
    var reposicion = jQuery('#cantRepo').val();
    self.avisosProd.forEach(function(elemento){
    if(elemento.idAvisoProducto == self.avisoSeleccionado.idAvisoProducto){
    elemento.cantidad = parseInt(elemento.cantidad) + parseInt(reposicion);
    elemento.estado = "Atendido";
    }});
    self.avisoSeleccionado = null;
    self.reponer = false;
    }
    
    this.atenderPedidoMp = function(){
    var reposicion = jQuery('#cantRepoMp').val();
    self.avisosMp.forEach(function(elemento){
    if(elemento.idAvisoMp == self.avisoMpSeleccionado.idAvisoMp){
    elemento.stock = parseInt(elemento.stock) + parseInt(reposicion);
    elemento.estado = "Atendido";
    }});
    self.avisoMpSeleccionado = null;
    self.reponerMp = false;
    }
    
    this.update = function(){
    self.filtroAviso = [];
    }
    
    this.init = function(){
        this.getAvisoProdDetalles();
        this.getAvisoMpDetalles();
	};
    
    this.init();
});