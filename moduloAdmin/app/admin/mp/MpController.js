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
    this.colores = [];
    
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
    
    this.update = function(){
    self.filtroMp = [];
    }
    
    this.init = function(){
		this.getMpsDetalles();
	};
    
    this.init();
   
});