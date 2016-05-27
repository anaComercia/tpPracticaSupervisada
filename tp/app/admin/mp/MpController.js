var mp = angular.module("backendEcommerceAdmin.mp");

mp.controller("MpController", function($state, MpService){
	
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
    this.mpSeleccionadaEditar = [];
    this.precios = [];
    this.nuevoPrecio = null;
    this.nuevaCantidad = null;
    
    this.getMps = function(){
            return MpService.getMps().then(function(data){
            self.mps = data;
        });
    };
    
    this.getPrecios = function(){
            return MpService.getPrecios(self.mpSeleccionadaEditar.idMP).then(function(data){
            self.precios = data;
        });
    };
    
     this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.mpSeleccionada = item;
        self.activado = false; 
    };

    
    this.createMp = function(){
        MpService.createMp(self.nuevaMp.titulo,self.nuevaMp.medida, self.nuevaMp.puntoReposicion, self.precios).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.nuevaMp = null;
            self.precios = [];
            self.getMps();
            $state.go("mp");
        })
    };
    
      this.updateMp = function(){
 MpService.updateMp(self.mpSeleccionadaEditar.idMP,self.mpSeleccionadaEditar.titulo, self.mpSeleccionadaEditar.medida, self.mpSeleccionadaEditar.puntoReposicion, self.precios).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            
            self.getMps();
			$state.go("mp");
        })
    };
    
     this.deleteMp= function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        MpService.deleteMp(self.mpSeleccionada.idMP).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.mpSeleccionada = null;
            self.getMps();
            self.activeItem(-1, null);
			$state.go("mp");
            })
        } 
    };

   
    this.editarMp = function(){
        self.mpSeleccionadaEditar = JSON.parse(JSON.stringify(self.mpSeleccionada));
        self.getPrecios(self.mpSeleccionadaEditar.idMP);
        $state.go("mp.editar",  { id : self.mpSeleccionadaEditar.idMP});
    };
    
    this.agregarPrecio = function(){
    data = {
    'precio' : self.nuevoPrecio,
    'cantidad' : self.nuevaCantidad
    }
    self.nuevoPrecio = null;
    self.nuevaCantidad = null;
    self.precios.push(data);
    }
    
    this.quitarPrecio = function(index){
     self.precios.splice(index,1);
    }
    
    this.clearMp = function(){
    $state.go("mp");
    self.precios = [];
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
		this.getMps();
	};
    
    this.init();
   
});