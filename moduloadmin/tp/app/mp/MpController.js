var mp = angular.module("backendEcommerce.mp");

mp.controller("MpController", function($state, MpService){
	
	this.title = "Modulo de Materia Prima";
	var self = this;
	this.mps = [];
    this.editOn = false;
	this.mpSeleccionada = null;
	this.activado = true;
    this.precios=[];
    this.nuevaMp="";
    this.formLabel="Nueva Materia Prima";
    
    this.getMps = function(){
    return MpService.getMps().then(function(data){
            self.mps = data;
            self.mps.forEach(function(elemento){
                var precio = self.precioPorId(elemento.idPrecio);
                elemento.precio = precio[0];
                elemento.cada = precio[1];
            });
        });
    };
    
    this.getPrecioMp = function(){
    return MpService.getPrecioMp().then(function(data){
            self.precios = data;
        });
    };
    
     this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.mpSeleccionada = item;
        self.activado = false; 
    };
    
    this.precioPorId = function(idPrecio)
    {
        var precio = "";
        self.precios.forEach(function(elemento){
        if (elemento.idPrecio == idPrecio)
        {precio = [elemento.precio, elemento.unidad];
        };
        });
        return precio;
    }
   
    this.nuevaMp = function(){
    self.formLabel = "Nueva Materia Prima";
    $state.go("mp.nueva");
    };
    
    this.clearMp = function(){
    $state.go("mp");
    };
    
    
    
    
    this.init = function(){
        this.getPrecioMp();
		this.getMps();
	};
    
    this.init();
   
});