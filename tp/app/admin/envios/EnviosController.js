var envios = angular.module("backendEcommerceAdmin.envios");

envios.controller("EnviosController", function($state, EnvioService, LugarService, SucursalService, LocalidadService){
	
	var self = this;
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.envios = [];
    this.lugares = [];
    this.sucursales = [];
    this.localidades = [];
    
     this.getEnvios = function(){
          return EnvioService.getEnvios().then(function(data){
              if(data.length > 0){
            self.envios = data;
            }else{
            self.getSucursales();
            }
        });
    };
    
    this.getLugares = function(){
          return LugarService.getLugares().then(function(data){
            if(data.length > 0){
            self.lugares = data;
            }else{
            self.getLocalidades();
            }  
        });
    };
    
    this.getSucursales = function(){
    return SucursalService.getSucursales().then(function(data){
        if(data.length > 0){    
            self.sucursales = data;
            self.inicializarSucursales();
        }
        });
    };
    
     this.getLocalidades = function(){
    return LocalidadService.getLocalidades().then(function(data){
        if(data.length > 0){
        self.localidades = data;
        self.inicializarLugares();
        }
        });
    };
    
    this.updateEnvioSucursal = function(){
        self.envios.forEach(function(elemento){
        EnvioService.updateEnvio(elemento.idEnvioSucursal, elemento.tardanza);
        });
        self.getEnvios();
    }
    
      this.updateEnvioLugar = function(){
        self.lugares.forEach(function(elemento){
        LugarService.updateEnvio(elemento.idLugar, elemento.tardanzaDias, elemento.costo);
        });
        self.getLugares();
    }
    
    this.inicializarSucursales = function(){
    var lista1 = [];
    var lista2 = [];
    var listaTestigo = [];
    
    self.sucursales.forEach(function(elemento){
    listaTestigo.push(elemento);
    });
    var cantidad = listaTestigo.length;
    var listaPasados = [];
    listaTestigo = listaTestigo.sort(function(a, b) {
    return parseFloat(a.nroSucursal) - parseFloat(b.nroSucursal);
    });   
    for(i = 0; i < cantidad-1;i++){
        var elementoActual = listaTestigo[i];
        for(j=0;j<cantidad-(i+1);j++){
        lista1.push(elementoActual);
        }
        
        listaPasados.push(elementoActual);
        listaTestigo.forEach(function(elemento2){
        if(listaPasados.indexOf(elemento2) == -1){
        lista2.push(elemento2);
        }
        });
    }
        for(i = 0; i < lista1.length; i++){
        EnvioService.inicializarEnviosSucursales(lista1[i].idSucursal, lista2[i].idSucursal);
        }
    }
    
    this.inicializarLugares = function(){
    self.localidades.forEach(function(elemento){
    LugarService.inicializarLugares(elemento.idLocalidad);
    });
    }
    
    this.init = function(){
        self.getEnvios();
        self.getLugares();
	};
    
    this.init();
   
});