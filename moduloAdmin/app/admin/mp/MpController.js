var mp = angular.module("backendEcommerceAdmin.mp");

mp.controller("MpController", function($state, MpService){
	
	this.title = "Modulo de Materia Prima";
	var self = this;
	this.mps = [];
    this.editOn = false;
	this.mpSeleccionada = null;
	this.activado = true;
    this.nuevaMp="";
    this.formLabel="";
    this.seleccion = '';
    this.filtroMp = [];
    
     this.getMpsDetalles = function(){
    return MpService.getMpsDetalles().then(function(data){
            self.mps = data;
        });
    };
    
     this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.mpSeleccionada = item;
        self.activado = false; 
    };

   
    this.nuevaMp = function(){
    self.formLabel = "Nueva Materia Prima";
    $state.go("mp.nueva");
    };
    
    this.clearMp = function(){
    $state.go("mp");
    self.formLabel = '';
    };
    
    this.update = function(){
    self.filtroMp = [];
    }
    
    
    this.init = function(){
		this.getMpsDetalles();
	};
    
    this.init();
   
});