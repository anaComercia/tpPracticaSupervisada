angular
    .module("backendEcommerceClientes.carrito")
    .controller("CarritoComprasController", CarritoComprasCtrl);

CarritoComprasCtrl.$injector = ["$state"];

function CarritoComprasCtrl($state) {
   var vm = this;
    
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
}