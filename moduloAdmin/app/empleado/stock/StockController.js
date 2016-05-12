var stock = angular.module("backendEcommerceEmp.stock");

stock.controller("StockController", function($state, StockService, MpService){
	
	this.title = "Modulo de Stock";
	var self = this;
    this.stocks = [];
    this.filtroStock = [];
    this.seleccion = '';
    this.mps = [];
    this.busqAv = false;
    this.busqAvMp = false;
    this.parametrosBusqueda= [];
    this.parametrosMpBusqueda= [];
    
     this.getStocks = function(){
    return StockService.getStock().then(function(data){
            self.stocks = data;
        });
    };
    
     this.getStocksDetalles = function(){
    return StockService.getStockDetalles().then(function(data){
            self.stocks = data;
        });
    };
    
     this.getMp = function(){
    return MpService.getMps().then(function(data){
            self.mps = data;
        });
    };
    
    this.agregarParametro = function(){
     var texto = jQuery('#cbParametro').val();
    if(self.parametrosBusqueda.indexOf(texto) == -1){
     self.parametrosBusqueda.push(texto);
    }
    }
    
    this.agregarParametroMp = function(){
     var texto = jQuery('#cbParametro').val();
    if(self.parametrosMpBusqueda.indexOf(texto) == -1){
     self.parametrosMpBusqueda.push(texto);
    }
    }
        
    this.quitarParametro = function(index){
     self.parametrosBusqueda.splice(index,1);
    }
    
    this.quitarParametroMp = function(index){
     self.parametrosMpBusqueda.splice(index,1);
    }
    
    this.update = function(){
    self.filtroStock = [];
    }
    
    this.init = function(){
        this.getStocksDetalles();
        this.getMp();
	};
    
    
    
    this.init();
   
});