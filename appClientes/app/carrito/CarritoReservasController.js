angular
    .module("backendEcommerceClientes.carrito")
    .controller("CarritoReservasController", CarritoReservasCtrl);

CarritoReservasCtrl.$injector = ["$state , $scope"];

function CarritoReservasCtrl($state,$scope) {
   var vm = this;
  
    /* lista reservas */
   vm.listaReservas = [
        {
            id:1,
            image: 'img/modulos/prueba2.jpg', 
            detail: 'campera milano', 
            quantity: 1,
            unitPrice: 800
        },
        {
            id:1,
            image: 'img/modulos/prueba2.jpg', 
            detail: 'campera milano', 
            quantity: 2,
            unitPrice: 550
        }
    ];
}