angular
    .module("backendEcommerceClientes.carrito")
    .controller("CarritoController", CarritoCtrl);

CarritoCtrl.$injector = ["$state"];

function CarritoCtrl($state) {
   var vm = this;
    vm.totalReservas = 10;
    
    /* lista compras */
    vm.listaCompras = [
        {
            id:1,
            image: 'img/modulos/prueba2.jpg', 
            detail: 'campera milano', 
            quantity: 2,
            price: 1600,
            buyDate: '16/01/2016',
            payDate:'17/01/2016'
        },
        {
            id:2,
            image: 'img/modulos/prueba1.jpg', 
            detail: 'remera ny',
            quantity: 1,
            price: 800,
            buyDate: '06/10/2015',
            payDate:'07/20/2015'
        }
    ];
    
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
    
   /* vm.totalReservas = function(){
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