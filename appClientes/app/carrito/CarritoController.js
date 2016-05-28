angular
    .module("backendEcommerceClientes.carrito")
    .controller("CarritoController", CarritoCtrl);

CarritoCtrl.$injector = ["$state","$rootScope"];

function CarritoCtrl($state,$rootScope) {
    var vm = this;
    vm.disablePagar = vm.totalReservas == 0 ? true : false;
    vm.totalReservas = localStorage.contador == undefined ? new Number() : JSON.parse(localStorage.contador);
    var contador;
    vm.listaReservas = localStorage.listaTemporal == undefined ? new Array() : JSON.parse(localStorage.listaTemporal);
    var precio;
    
    vm.onClickDetail= function(reserva){ //remueve item de la lista temporal de reservas
        for (i = 0; i < vm.listaReservas.length; i++) {
            if(vm.listaReservas[i] == reserva){
                precio = vm.listaReservas[i].unitPrice;
                vm.listaReservas.splice(i,1);
                vm.actualizarListaTemp();
            }
            
        }
    };
    
    vm.actualizarListaTemp = function(){ //actualiza datos desde la lista temporal
        localStorage.listaTemporal = JSON.stringify(vm.listaReservas);

        contador =localStorage.contador == undefined ? new Number() : JSON.parse(localStorage.contador) ;
        contador = contador - precio;
        vm.totalReservas = contador;
        localStorage.contador = JSON.stringify(contador);
       
        if(vm.totalReservas == 0){
            vm.disablePagar = true;
        }else{
            vm.disablePagar = false;
        }
        
        $rootScope.$emit('actualizarTotal', contador);
       
    }
    
    //TODO: timer de productos, reputacion?? si cuando agrego al carrito no resto de mi stock
    //TODO: validar que los productos antes de apgar, sigan estando con stock y si no, alert
    
    /* lista compras */
    
    /*vm.totalReservas = _calculationTotal();
        
    function _calculationTotal(){
        var total = 0;
        for (i = 0; i < vm.listaReservas.length; i++) {
            var aux = vm.listaReservas[i].quantity * vm.listaReservas[i].unitPrice;
            total = total + aux;
        }
        return total;
    };

    vm.totalReservas = 
        
    function _calculationTotal(productList){
        var total = 0;
        var aux = 0;
        for (i = 0; i < listaReservas.length; i++) {
            debugger;
            aux = listaReservas[i].quantity * listaReservas[i].unitPrice;
            totalReservas = totalReservas + aux;
            debugger;
        }

    };*/
}