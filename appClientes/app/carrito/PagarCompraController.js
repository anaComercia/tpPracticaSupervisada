angular
    .module("backendEcommerceClientes.carrito")
    .controller("PagarCompraController", PagarCompraController);

PagarCompraController.$injector = ["$state, $scope"];

function PagarCompraController($state,$scope) {
   var vm = this;
    
    vm.sumaTotalReservas = $scope.carrito.totalReservas;
    
    vm.mySelect = {};//seleccion de los combos
      vm.tarjetas = [
        {
            id: 1,
            type: 'VISA'
        },
        {
            id: 2,
            type: 'MASTER CARD'
        },
        {
            id: 3,
            type: 'AMEX'
        }];
      vm.cuotas = [1,2,3];
    
      vm.domicilios = [
        {
            id: 1,
            detail: 'Ameguino 125'
        },
        {
            id: 2,
            detail: 'Segurola 1765'
        },
        {
            id: 3,
            detail: 'Jonte 987'
        }];
    
    
    vm.hiddenTarjeta = true;
    vm.isOpenTarjeta = false;
    vm.hiddenSucursal = true;
    vm.isOpenSucursal = false;
    
    $scope.mostrarTarjetas = function(value) {
        if(value){
            vm.hiddenTarjeta= false;
            vm.isOpenTarjeta = true;
            vm.hiddenSucursal = true;
            vm.isOpenSucursal = false;
        }
   
    };
     $scope.mostrarSucursales = function(value) {
        if(value){
            vm.hiddenTarjeta= true;
            vm.isOpenTarjeta = false;
            vm.hiddenSucursal = false;
            vm.isOpenSucursal = true;
        }
   
    };
    
  /*  $(function () {
     $("#datepicker").datepicker({ 
            autoclose: true, 
            todayHighlight: true
      }).datepicker('update', new Date());;
    });*/

}