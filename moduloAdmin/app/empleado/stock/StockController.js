var stock = angular.module("backendEcommerceEmp.stock");

stock.controller("StockController", function($state, StockService, MpService){
	
	this.title = "Modulo de Stock";
	var self = this;
    this.stocks = [];
    this.filtroStock = [];
    this.seleccion = '';
    this.mps = [];
    
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
    
    this.update = function(){
    self.filtroStock = [];
    }
    
    this.init = function(){
        this.getStocksDetalles();
        this.getMp();
	};
    
    
    
    this.init();
   
});