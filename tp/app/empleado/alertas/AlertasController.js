var alerta = angular.module("backendEcommerceEmp.alertas");

alerta.controller("AlertasController", function($state, AvisoProdService, $scope){
	
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
    this.prodDeposito = [];
    
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
    
    this.getDeposito = function(){
    return AvisoProdService.getProdDeposito().then(function(data){
            self.prodDeposito = data;
        });
    }
    
    this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.avisoSeleccionado = item;
        self.avisoSeleccionado.enDeposito = 'Reponer';
        self.prodDeposito.forEach(function(elemento){
        if(elemento.idProducto == self.avisoSeleccionado.idProducto){
        self.avisoSeleccionado.enDeposito = 'Disponible: ' + elemento.cantidad;
        }
        });
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
    var index = $scope.main.avisosProdPendientes.indexOf(elemento);
    $scope.main.avisosProdPendientes.splice(index,1);
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
    var index = $scope.main.avisosMpPendientes.indexOf(elemento);
    $scope.main.avisosMpPendientes.splice(index,1);
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
        this.getDeposito();
	};
    
    this.init();
});