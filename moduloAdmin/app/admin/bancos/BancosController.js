var bancos = angular.module("backendEcommerceAdmin.bancos");

bancos.controller("BancosController", function($state, BancoTarjetaService){
	
	var self = this;
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.bancos = [];
    this.tarjetas = [];
    this.cuotas = [];
    this.mostrar = false;
    this.bancoSeleccionado = null;
    this.bancoSeleccionadoEditar = null;
    this.tarjetaSeleccionada = null;
    this.tarjetaSeleccionadaEditar = null;
    this.nuevoBanco = null;
    this.nuevaTarjeta = null;
    this.cuotaValor;
    this.interes;
    
      this.getBancos = function(){
    return BancoTarjetaService.getBancos().then(function(data){
            self.bancos = data;
        });
    };
    
      this.getTarjetas = function(){
    return BancoTarjetaService.getTarjetas().then(function(data){
            self.tarjetas = data;
        });
    };
    
      this.getCuotas = function(id){
    return BancoTarjetaService.getCuotas(id).then(function(data){
            self.cuotas = data;
        });
    };
    
    this.agregarCuota = function(){
    var descripcion;
    self.bancos.forEach(function(elemento){
    if(elemento.idBanco = self.cuotaBanco){
    descripcion = elemento.descripcion;
    }
    });
    var cuota = {
    idTarjeta:self.tarjetaSeleccionada.idTarjeta,
    idBanco:self.cuotaBanco,
    cuotas:self.cuotaValor,
    interes:self.interes,
    banco_desc:descripcion
    }
    self.cuotas.push(cuota);
    }
    
    this.nuevoBanco = function(){
    $state.go("bancos.nuevo");
    }
    
    this.editarBanco = function(){
    $state.go("bancos.editar");
    self.bancoSeleccionadoEditar = JSON.parse(JSON.stringify(self.bancoSeleccionado));
    }
    
    this.clearBanco = function(){
    $state.go("bancos");
    self.bancoSeleccionado = null;
    self.activeItemBanco(-1, null);
    }
    
    this.crearBanco = function(){
        BancoTarjetaService.createBanco(self.nuevoBanco.descripcion).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            $state.go("bancos");
            self.getBancos();
        });
    }
    
    this.updateBanco = function(){
     BancoTarjetaService.updateBanco(self.bancoSeleccionadoEditar.idBanco, self.bancoSeleccionadoEditar.descripcion).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            $state.go("bancos");
            self.getBancos();
            self.bancoSeleccionadoEditar = null;
        });
    
    }
    
    this.deleteBanco = function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        BancoTarjetaService.deleteBanco(self.bancoSeleccionado.idBanco).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.getBancos();
			self.activeItemBanco(-1, null);
			$state.go("bancos");
            })
        } 
    };
    
    this.nuevaTarjeta = function(){
    $state.go("bancos.tarjetas.nuevo");
    }
    
    this.editarTarjeta = function(){
    $state.go("bancos.tarjetas.editar");
    self.tarjetaSeleccionadaEditar = JSON.parse(JSON.stringify(self.tarjetaSeleccionada));
    }
    
    this.clearTarjeta = function(){
    $state.go("bancos.tarjetas");
    self.tarjetaSeleccionada = null;
    self.activeItemTarjeta(-1, null);
    }
    
    this.crearTarjeta = function(){
        BancoTarjetaService.createTarjeta(self.nuevaTarjeta.descripcion).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            $state.go("bancos.tarjetas");
            self.getTarjetas();
        });
    }
    
    this.updateTarjeta = function(){
     BancoTarjetaService.updateTarjeta(self.tarjetaSeleccionadaEditar.idTarjeta, self.tarjetaSeleccionadaEditar.descripcion).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            $state.go("bancos.tarjetas");
            self.tarjetaSeleccionadaEditar = null;
            self.getTarjetas();
        });
    
    }
    
    this.deleteTarjeta = function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        BancoTarjetaService.deleteTarjeta(self.tarjetaSeleccionada.idTarjeta).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.getTarjetas();
			self.activeItemTarjeta(-1, null);
			$state.go("bancos.tarjetas");
            })
        } 
    };
    
    this.quitarCuota = function(indice){
    self.cuotas.pop(indice);
    }
    
    
    this.activeItemBanco = function($index, item){
        self.selectedIndexBanco = $index;
        self.bancoSeleccionado = item;
     };
    
    this.activeItemTarjeta = function($index, item){
        self.selectedIndexTarjeta = $index;
        self.tarjetaSeleccionada = item;
        if(item.idTarjeta){
        self.getCuotas(item.idTarjeta);
        }
        self.mostrar=true;
     };
    
    this.updateCuota = function(){
    BancoTarjetaService.updateCuota(self.cuotas).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
			self.activeItemTarjeta(-1, null);
			$state.go("bancos.tarjetas");
            });
    }
    
    this.init = function(){
        self.getBancos();
        self.getTarjetas();
	};
    
    this.init();
   
});