var cupones = angular.module("backendEcommerceAdmin.cupones");

cupones.controller("CuponesController", function($state, CuponService){
	
	var self = this;
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.cuponSeleccionado = null;
    this.cuponSeleccionadoEditar = null;
    this.nuevoCupon = null;
    this.cupones = [];
    
      this.getCupones = function(){
    return CuponService.getCupones().then(function(data){
            self.cupones = data;
        });
    };
    
    this.createCupon = function(){
        CuponService.createCupon(self.nuevoCupon.descripcion, self.nuevoCupon.montoDescuento).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.nuevoCupon = null;
            $state.go("cupones");
            self.getCupones();
        })
    };
    
      this.updateCupon = function(){
 CuponService.updateCupon(self.cuponSeleccionadoEditar.idCupon, self.cuponSeleccionadoEditar.descripcion, self.cuponSeleccionadoEditar.montoDescuento).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.cuponSeleccionadoEditar = null;
            $state.go("cupones");
            self.getCupones();	
        })
    };
    
      this.deleteCupon = function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        CuponService.deleteCupon(self.cuponSeleccionado.idCupon).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.getCupones();
			self.activeItem(-1, null);
			$state.go("cupones");
            })
        } 
    };
    
    this.clearCupones = function(){
    self.nuevoCupon = null;
    self.cuponSeleccionadoEditar = null;
    $state.go("cupones");
    
    }
    
    this.editarCupon = function(){
        self.cuponSeleccionadoEditar = JSON.parse(JSON.stringify(self.cuponSeleccionado));
		$state.go("cupones.editar",  { id : self.cuponSeleccionadoEditar.idCupon});
    };
    
    this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.cuponSeleccionado = item;
    };
    
    this.init = function(){
        self.getCupones();
	};
    
    this.init();
   
});