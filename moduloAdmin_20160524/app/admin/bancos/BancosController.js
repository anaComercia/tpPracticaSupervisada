var bancos = angular.module("backendEcommerceAdmin.bancos");

bancos.controller("BancosController", function($state, BancoTarjetaService){
	
	var self = this;
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.bancos = [];
    this.tarjetas = [];
    this.cuotas = [];
    this.mostrar = false;
    this.bancoSeleccionado = null;
    this.tarjetaSeleccionada = null;
    
      this.getBancos = function(){
    return BancoTarjetaService.getBancos().then(function(data){
            self.bancos = data;
        });
    };
    
      this.getTarjetas = function(){
    return BancoTarjetaService.getTarjetas().then(function(data){
            self.tarjetas = data;
        });
    };
    
      this.getCuotas = function(id){
    return BancoTarjetaService.getCuotas(id).then(function(data){
            self.cuotas = data;
        });
    };
    
    this.agregarCuota = function(){
    var cuota;
    
    }
    
    this.activeItemBanco = function($index, item){
        self.selectedIndexBanco = $index;
        self.bancoSeleccionado = item;
     };
    
    this.activeItemTarjeta = function($index, item){
        self.selectedIndexTarjeta = $index;
        self.tarjetaSeleccionada = item;
        self.getCuotas(item.idTarjeta);
        self.mostrar=true;
     };
    
    this.init = function(){
        self.getBancos();
        self.getTarjetas();
	};
    
    this.init();
   
});