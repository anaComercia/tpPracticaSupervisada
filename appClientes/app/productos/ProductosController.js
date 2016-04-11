//var producto = angular.module("backendEcommerceClientes.producto");

//producto.controller("ProductosController", function($state){
    
//});



angular
    .module("backendEcommerceClientes.producto")
    .controller("ProductosController", ProductosCtrl);

ProductosCtrl.$injector = ["$state"];

function ProductosCtrl($state) {
    vm = this;
 //   debugger;
    vm.changeImage = _changeImage
        
    function _changeImage(e){
    //    debugger;
    }
}