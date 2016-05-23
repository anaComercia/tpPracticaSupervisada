angular
    .module("backendEcommerceClientes.carrito")
    .controller("CarritoController", CarritoCtrl);

CarritoCtrl.$injector = ["$state","$rootScope"];

function CarritoCtrl($state,$rootScope) {
    var vm = this;
    vm.totalReservas = localStorage.contador == undefined ? new Number() : JSON.parse(localStorage.contador);
    
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

        var contador =localStorage.contador == undefined ? new Number() : JSON.parse(localStorage.contador) ;
        contador = contador - precio;
        vm.totalReservas = contador;
        localStorage.contador = JSON.stringify(contador);
       
        $rootScope.$emit('actualizarTotal', contador);
       
    }
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