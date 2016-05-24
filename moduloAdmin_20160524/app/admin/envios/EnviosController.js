var envios = angular.module("backendEcommerceAdmin.envios");

envios.controller("EnviosController", function($state, EnvioService, LugarService){
	
	var self = this;
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.envios = [];
    this.lugares = [];
    
     this.getEnvios = function(){
          return EnvioService.getEnvios().then(function(data){
            self.envios = data;
        });
    };
    
    this.getLugares = function(){
          return LugarService.getLugares().then(function(data){
            self.lugares = data;
        });
    };
    
    this.init = function(){
        self.getEnvios();
        self.getLugares();
	};
    
    this.init();
   
});