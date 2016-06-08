angular
    .module("backendEcommerceClientes.inicio")
    .controller("InicioController", InicioCtrl);

InicioCtrl.$injector = ["$state","InicioService","$rootScope"];

function InicioCtrl($state, InicioService,$rootScope) {
    var vm = this;
    vm.productId= 0;
    vm.telefonos=[];
    vm.productListMujer=[];
    vm.productListHombre = [];
    vm.imagenesFijas = [];
    vm.listaBuscador=[];
    vm.productListCliente=[];
    var datoBuscador;
    vm.hideMostrarDatos = true;
    
      $rootScope.$on('actualizarBuscador', _actualizarBuscador);
    
    function _actualizarBuscador(event){
        debugger;
        vm.init();
    }

     vm.mostrarProductosInicioHombre = function(){
        return InicioService.getInicioHombre().then(function(data){
            if(data.length > 0){
                vm.productListHombre = data;
                vm.hideMostrarDatos = true;
           }else{
                vm.hideMostrarDatos = false;
            };
        });
    };
    vm.mostrarProductosInicioMujer = function(){
        return InicioService.getInicioMujer().then(function(data){
            if(data.length>0){
                vm.productListMujer = data;
                vm.hideMostrarDatos = true;
           }else{
                vm.hideMostrarDatos = false;
            };
        });
    };
       vm.traerImagenesFijas = function(){
        return InicioService.getImgFijas().then(function(data){
            if(data){
                vm.imagenesFijas = data;
            }
        });
    };
    
    vm.buscarProductoCliente = function(){
          return InicioService.getProductoCliente(datoBuscador).then(function(data){
              debugger;
            if(data.length>0){
                vm.productListCliente = data;
                localStorage.buscador = 'undefined';
                vm.hideMostrarDatos = true;
            }else{
                vm.hideMostrarDatos = false;
                localStorage.buscador = 'undefined';
            };
        });
    };
    
    vm.init = function(){
        debugger;
        vm.traerImagenesFijas();
        if( (typeof localStorage.buscador != 'undefined') 
             && ( localStorage.buscador != '') 
            && ( localStorage.buscador != 'undefined') ){
              datoBuscador = JSON.parse(localStorage.buscador);
              vm.productListMujer=[];
              vm.productListHombre = [];
              vm.buscarProductoCliente();
            // localStorage.buscador = 'undefined';// ponerlo cuando trae datos del arrray
              
        }else{
            vm.mostrarProductosInicioMujer();
            vm.mostrarProductosInicioHombre(); 
        };
        
        
	};
    
    vm.buscarTodosProductos= function(){
        vm.mostrarProductosInicioMujer();
        vm.mostrarProductosInicioHombre(); 
    };
    
    vm.init();
};