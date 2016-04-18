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
    
    this.update = function(){
    self.filtroAviso = [];
    }
    
    this.init = function(){
        this.getAvisoProdDetalles();
        this.getAvisoMpDetalles();
	};
    
    this.init();
});