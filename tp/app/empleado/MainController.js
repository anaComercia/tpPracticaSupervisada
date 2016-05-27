//Siempre que se trabaje con angular en js se tiene que traer el modulo declarado en index.html ng-app
var backendEcommerceEmp = angular.module("backendEcommerceEmp");

//Así se agrega un controller, el controller se usa para trabajar con un html, en el caso del main controller aplica todos los html
backendEcommerceEmp.controller("MainController", function(AvisoProdService,ProductoService, SucursalService,StockService){
	
    this.user = "empleado001";
	this.brand = "Empleado";
	this.abrir = false;
    var self = this;
    this.avisosProd = [];
    this.productos = [];
    this.stocks = [];
    this.sucursales = [];
    this.avisosProdPendientes = [];
    this.avisosMpPendientes = [];
    
    this.getAvisoProd = function(){
    return AvisoProdService.getAvisosProdDetalles().then(function(data){
            self.avisosProd = data;
        self.avisosPendientes();
        });
    };
    
    this.avisosPendientes = function(){   
        if(self.avisosProd){
        self.avisosProd.forEach(function(elemento){
            if(elemento.estado == 'Pendiente'){
            self.avisosProdPendientes.push(elemento);
            } 
        });
        }
    }
      
     this.getAvisoMpDetalles = function(){
    return AvisoProdService.getAvisosMpDetalles().then(function(data){
            self.avisosMp = data;
        self.avisosPendientesMp();
        });
    };

    this.avisosPendientesMp = function(){
          if(self.avisosMp){
        self.avisosMp.forEach(function(elemento){
            if(elemento.estado == 'Pendiente'){
            self.avisosMpPendientes.push(elemento);
            } 
        });
        }
    
    }
    
    this.init = function(){
        this.getAvisoProd();
        this.getAvisoMpDetalles();
	};
    
    this.init();
});