angular
    .module("backendEcommerceClientes.carrito")
    .controller("PagarCompraController", PagarCompraController);

PagarCompraController.$injector = ["$state, $scope"];

function PagarCompraController($state,$scope) {
   var vm = this;
    
    vm.sumaTotalReservas = $scope.carrito.totalReservas;
debugger;
}