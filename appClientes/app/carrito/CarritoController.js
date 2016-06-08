angular
    .module("backendEcommerceClientes.carrito")
    .controller("CarritoController", CarritoCtrl);

CarritoCtrl.$injector = ["$state","$rootScope", "ProductosService"];

function CarritoCtrl($state,$rootScope,ProductosService) {
    var vm = this;
    vm.disablePagar = true;
    vm.totalReservas = localStorage.contador == undefined ? new Number() : JSON.parse(localStorage.contador);
    var contador;
    vm.listaReservas = localStorage.listaTemporal == undefined ? new Array() : JSON.parse(localStorage.listaTemporal);
    var precio;
    vm.banner = '';
    
    vm.mostrarBanner = function(){
        return ProductosService.getImgModulo().then(function(data){
            if(data){
                vm.banner = data[0].modulo;
            }
        });
    };
    
    vm.onClickDetail= function(reserva){ //remueve item de la lista temporal de reservas
       
        debugger;
        if(reserva.cantidad > 1){
            debugger;
            reserva.cantidad = reserva.cantidad - 1;
            reserva.unitPrice = reserva.unitPrice / 2; 
            precio = reserva.unitPrice ;
            debugger;
            for (i = 0; i < vm.listaReservas.length; i++) {
                if(vm.listaReservas[i] == reserva){
                    vm.actualizarListaTemp();
                };
            
            }; 
        }else{
            debugger;
            for (i = 0; i < vm.listaReservas.length; i++) {
                if(vm.listaReservas[i] == reserva){
                    precio = vm.listaReservas[i].unitPrice;
                    vm.listaReservas.splice(i,1);
                    vm.actualizarListaTemp();
                };
            
            }; 
        };
       
    };
    
    vm.actualizarListaTemp = function(){ //actualiza datos desde la lista temporal
        debugger;
        localStorage.listaTemporal = JSON.stringify(vm.listaReservas);

        contador =localStorage.contador == undefined ? new Number() : JSON.parse(localStorage.contador) ;
        contador = contador - precio;
        vm.totalReservas = contador;
        localStorage.contador = JSON.stringify(contador);
       
        mostrarBoton();
        
        $rootScope.$emit('actualizarTotal', contador);
       
    }
    
    //TODO: timer de productos, reputacion?? si cuando agrego al carrito no resto de mi stock
    //TODO: validar que los productos antes de apgar, sigan estando con stock y si no, alert
    
    function mostrarBoton(){
        if(vm.totalReservas == 0 || vm.totalReservas == undefined){
            vm.disablePagar = true
        }else{
            vm.disablePagar = false;
        }
      };
    
    vm.init = function(){
        vm.mostrarBanner();
        mostrarBoton();
	};
    
    vm.init();

}