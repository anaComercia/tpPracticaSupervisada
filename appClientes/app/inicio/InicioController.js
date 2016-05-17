angular
    .module("backendEcommerceClientes.inicio")
    .controller("InicioController", InicioCtrl);

InicioCtrl.$injector = ["$state","InicioService"];

function InicioCtrl($state, InicioService) {
    var vm = this;
    vm.productId= 0;
    vm.telefonos=[];
    vm.productListMujer=[];
    vm.productListHombre = [];
    vm.imagenesFijas = [];

     vm.mostrarProductosInicioHombre = function(){
        return InicioService.getInicioHombre().then(function(data){
            if(data){
                vm.productListHombre = data;
           }
        });
    };
    vm.mostrarProductosInicioMujer = function(){
        return InicioService.getInicioMujer().then(function(data){
            if(data){
                debugger;
                vm.productListMujer = data;
            }
        });
    };
       vm.traerImagenesFijas = function(){
        return InicioService.getImgFijas().then(function(data){
            if(data){
                debugger;
                vm.imagenesFijas = data;
            }
        });
    };
    
    vm.init = function(){
        vm.traerImagenesFijas();
        debugger;
        vm.mostrarProductosInicioMujer();
        vm.mostrarProductosInicioHombre();
	};
    
    vm.init();
};