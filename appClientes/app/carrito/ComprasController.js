angular
    .module("backendEcommerceClientes.carrito")
    .controller("ComprasController", CarritoComprasCtrl);

CarritoComprasCtrl.$injector = ["$state , $scope", "CarritoService"];

function CarritoComprasCtrl($state,$scope,CarritoService) {
   var vm = this;
   vm.listaCompras = []; 
    vm.idUsuario = 1; //SACAR HARDCODE
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
    vm.detallesCompra={};
    
    vm.init = function(){
        buscarlistaCompras();
	};
    
    vm.init();
    
    vm.onClickDetail = function(compraId){
        //carritoComprasController.js
        //carritoCompras.html
        //carritoComprasDirective.js
        //carritoComprasDirective.html
        debugger;
        //Aca voy con el id a buscar a la base los detalles de la compra y cuando vuelvo lo seteo a vm.DetalleCompras
        //creo el evento
    }
    
}