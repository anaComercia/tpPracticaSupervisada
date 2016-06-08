angular
    .module("backendEcommerceClientes.carrito")
    .controller("ComprasController", CarritoComprasCtrl);

CarritoComprasCtrl.$injector = ["$state , $scope", "CarritoService"];

function CarritoComprasCtrl($state,$scope,CarritoService) {
    var vm = this;
    vm.listaCompras = []; 
    vm.idUsuario = 1; //SACAR HARDCODE
    vm.detallesCompra=[];
    vm.compraVisualizar;
    vm.pagoEn;
    vm.totalCompra;
    vm.hideDivTarjeta = true;
    vm.hideDivEfectivo = true;
    
    buscarlistaCompras = function buscar(){
          return CarritoService.getCompras(vm.idUsuario).then(function(data){
            if(data.length>0){
               vm.listaCompras = data;
            }
        });
   };


    
    vm.onClickDetail = function(compraDet){
        //carritoComprasController.js
        //carritoCompras.html
        //carritoComprasDirective.js
        //carritoComprasDirective.html

        if(compraDet.formaPago == 'E'){//efectivo
            vm.pagoEn= "efectivo";
            vm.hideDivTarjeta = true;
            vm.hideDivEfectivo = false;
            traerDetalleEfectivo(compraDet);
        }else{//tarjeta
            vm.pagoEn= "tarjeta";
            
            vm.hideDivTarjeta = false;
            vm.hideDivEfectivo = true;
            traerDetalleTarjeta(compraDet);
        }

        //Aca voy con el id a buscar a la base los detalles de la compra y cuando vuelvo lo seteo a vm.DetalleCompras
    };
    
    function traerDetalleTarjeta(compraDet){
        return CarritoService.getDetalleTarjeta(compraDet.compra).then(function(data){
            if(data.length>0){
                debugger;
                vm.detallesCompra = data;//si tiene cupon hay que sumarle el monto del cupon al total
                //vm.totalCompra = vm.totalCompra - parseInt(vm.detallesCompra[0].costo);
                rellenarDatos(compraDet);
               
            }
        });
    };
    
    function traerDetalleEfectivo(compraDet){
         return CarritoService.getDetalleEfectivo(compraDet.compra, compraDet.sucu).then(function(data){
            if(data.length>0){
                vm.detallesCompra = data;//si tiene cupon hay que sumarle el monto del cupon al total
                rellenarDatos(compraDet);
               
            }
        });
    };
        
    function rellenarDatos(compraDet){
        vm.compraVisualizar = compraDet;
        vm.compraVisualizar.precio = parseInt(vm.compraVisualizar.precio);
        if(compraDet.cupon == null){
            compraDet.cupon = 0; //para el filtro enel php
            vm.totalCompra =  vm.compraVisualizar.precio; 
        }else{
            vm.totalCompra = parseInt(compraDet.cupon) + vm.compraVisualizar.precio;
        }
    };
    
    vm.init = function(){
        buscarlistaCompras();
	};
    
    vm.init();
    
}