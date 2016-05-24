var mp = angular.module("backendEcommerceAdmin.mp");

mp.controller("MpController", function($state, MpService, ColorService){
	
	this.title = "Modulo de Materia Prima";
	var self = this;
	this.mps = [];
	this.mpSeleccionada = null;
	this.activado = true;
    this.nuevaMp="";
    this.formLabel="";
    this.seleccion = '';
    this.filtroMp = [];
    this.busqAv = false;
    this.parametrosBusqueda= [];
    
    
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
   
    this.editarMp = function(){
		self.formLabel = "Editar Materia Prima";
        self.mps.forEach(function(elemento){
        if(elemento.idMP == self.mpSeleccionada.idMP){
        self.mpSeleccionada == elemento;
        }});
        $state.go("mp.editar",  { id : self.mpSeleccionada.idMP});
    };
    
    this.clearMp = function(){
    $state.go("mp");
    self.formLabel = '';
    };
    
    this.agregarParametro = function(){
     var texto = jQuery('#cbParametro').val();
    if(self.parametrosBusqueda.indexOf(texto) == -1){
     self.parametrosBusqueda.push(texto);
    }
    }
        
    this.quitarParametro = function(index){
     self.parametrosBusqueda.splice(index,1);
    }
    
    this.update = function(){
    self.filtroMp = [];
    }
    
    this.init = function(){
		this.getMpsDetalles();
	};
    
    this.init();
   
});