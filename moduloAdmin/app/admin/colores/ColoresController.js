var colores = angular.module("backendEcommerceAdmin.colores");

colores.controller("ColoresController", function($state, ColorService){
	
	var self = this;
	this.colores = [];
	this.formLabel = "Nuevo Color";
	this.colorSeleccionado = null;
    this.colorNuevo = null;
    this.colorSeleccionadoEditar = null;
    
    this.getColores = function(){
    return ColorService.getColores().then(function(data){
            self.colores = data;
        });
    };
    
    
    this.createColor = function(){
        ColorService.createColor(self.colorNuevo.descripcion).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.getColores();
            $state.go("colores");
        })
    };
    
    this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.colorSeleccionado = item;
        self.colorSeleccionadoEditar = JSON.parse(JSON.stringify(self.colorSeleccionado));
    };

    this.updateColor = function(){
        ColorService.updateColor(self.colorSeleccionadoEditar.descripcion,self.colorSeleccionado.idColor).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.getColores();
			self.activeItem(-1, null);
			$state.go("colores");
        })
    };
    
    
     this.deleteColor = function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        ColorService.deleteColor(self.colorSeleccionadoEditar.idColor).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.getColores();
			self.activeItem(-1, null);
			$state.go("colores");
            })
        } 
    };
    
    
    this.putColor = function(){
		self.formLabel = "Editar Color";
        self.editOn = true;
		$state.go("colores.editar",  { id : self.colorSeleccionado.idColor});
    };
    
	this.nuevoColor = function(){
		self.formLabel = "Nuevo Color";
		$state.go("colores.nuevo");
	};
	
  this.clearCol = function(){
    $state.go("colores");
    self.formLabel = '';
    };
    
	this.init = function(){
    self.getColores();
	};
	
	this.init();
	
});