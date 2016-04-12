//var producto = angular.module("backendEcommerceClientes.producto");

//producto.controller("ProductosController", function($state){
    
//});



angular
    .module("backendEcommerceClientes.producto")
    .controller("ProductosController", ProductosCtrl);

ProductosCtrl.$injector = ["$state"];

function ProductosCtrl($state) {
    var obj = {
        title: 'CAMPERA MILANO',
        price: '$600',
        gender: 'Mujer',
        size: ['1','2'],
        color: ['Azul', 'Rosa', 'Blanca'],
        stock: 3,
        image: ['img/modulos/prueba2.jpg', 'img/modulos/prueba3.jpg', 'img/modulos/prueba4.jpg']
  };
    
    vm = this;
    
    vm.prod = obj;
    vm.mySelect = {};//seleccion de los combos
    
    vm.source = vm.prod.image[0];
    vm.changeImage = _changeImage;
    
        
    function _changeImage($event){
        vm.source = $event.target.src;
    }
}