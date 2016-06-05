angular
    .module("backendEcommerceClientes.carrito")
    .controller("ComprasController", CarritoComprasCtrl);

CarritoComprasCtrl.$injector = ["$state , $scope", "CarritoService"];

function CarritoComprasCtrl($state,$scope,CarritoService) {
   var vm = this;
   vm.listaCompras = []; 
    vm.idUsuario = 1; //SACAR HARDCODE
        vm.detallesCompra=[];
    /* lista compras 
    vm.listaCompras = [
        {
            id:1,
            image: 'img/modulos/prueba2.jpg', 
            detail: 'campera milano', 
            quantity: 2,
            price: 1600,
            buyDate: '16/01/2016',
            state:'Pendiente'
        },
        {
            id:2,
            image: 'img/modulos/prueba1.jpg', 
            detail: 'remera ny',
            quantity: 1,
            price: 800,
            buyDate: '06/10/2015',
            state:'Pagado'
        }
    ];*/
    
      buscarlistaCompras = function buscar(){
          return CarritoService.getCompras(vm.idUsuario).then(function(data){
            if(data.length>0){
                debugger; 
               vm.listaCompras = data;
                debugger;
            }
        });
   };


    
    vm.onClickDetail = function(compraDet){
        //carritoComprasController.js
        //carritoCompras.html
        //carritoComprasDirective.js
        //carritoComprasDirective.html
        if(compraDet.cupon == null){
            compraDet.cupon = 'NO'; //para el filtro enel php
        }
        if(compraDet.formaPago == 'E'){//efectivo
            debugger;
            /*
            */
            traerDetalleEfectivo(compraDet.compra,
                                compraDet.sucu);
        }else{//tarjeta
            debugger;
            /*compraDet compra
            compraDet dir
            compraDet e
            compraDet fechaC
            compraDet fechaP
            compraDet formaPago
            compraDet precio
            compraDet sucu
            compraDet tarjetaBco*/
        }
        
        //Aca voy con el id a buscar a la base los detalles de la compra y cuando vuelvo lo seteo a vm.DetalleCompras
    };
    
   function traerDetalleEfectivo(compra,
                         sucu){
         return CarritoService.getDetalleEfectivo(compra,
                                                 sucu).then(function(data){
            if(data.length>0){
                debugger; 
               vm.detallesCompra = data;//si tiene cupon hay que sumarle el monto del cupon al total
            }
        });
    };
        
    vm.init = function(){
        buscarlistaCompras();
	};
    
    vm.init();
    
}