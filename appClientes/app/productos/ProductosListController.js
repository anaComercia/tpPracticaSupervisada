angular
    .module("backendEcommerceClientes.producto")
    .controller("ProductosListController", ProductosCtrl);


ProductosCtrl.$injector = ["$state","ProductosService"];

function ProductosCtrl($state, ProductosService) {
    vm = this;
    vm.productList=[];
    vm.banner = '';
  
   /* vm.productList = [
        {
            id: 1,
            title: 'Campera Milano',
            price: 600,
            gender: 'Mujer',
            size: ['1','2'],
            color: ['Azul', 'Rosa', 'Blanca'],
            stock: 3,
            image: ['img/modulos/prueba1.jpg',
            'img/modulos/prueba2.jpg',
            'img/modulos/prueba3.jpg',
            'img/modulos/prueba4.jpg']
        },
    */
        vm.mostrarListaProductos = function(){
             return ProductosService.getAllProductos().then(function(data){
                if(data){
                    vm.productList=[];
                    vm.productList = data;
                   
                }
            });
        };

        vm.mostrarListaJeans = function(){
            return ProductosService.getProductosJean().then(function(data){
                if(data){
                   
                    vm.productList=[];
                    vm.productList = data;
                    
                }
            });
        };

        vm.mostrarListaCamperas = function(){
            return ProductosService.getProductosCampera().then(function(data){
                if(data){
                   
                    vm.productList=[];
                    vm.productList = data;
                   
                }
            });
        };
        vm.mostrarListaRemeras = function(){
            return ProductosService.getProductosRemera().then(function(data){
                if(data){
                    
                    vm.productList=[];
                    vm.productList = data;
                    
                }
            });
        };

        vm.mostrarListaCamisas = function(){
            return ProductosService.getProductosCamisa().then(function(data){
                if(data){
                   
                    vm.productList=[];
                    vm.productList = data;
                    
                }
            });
        };

        vm.mostrarListaHombre = function(){
            return ProductosService.getProductosHombre().then(function(data){
                if(data){
                   
                    vm.productList=[];
                    vm.productList = data;
                    
                }
            });
        };

        vm.mostrarListaMujer = function(){
            return ProductosService.getProductosMujer().then(function(data){
                if(data){
                    vm.productList=[];
                    vm.productList = data;
                     }
            });
        };
      vm.mostrarBanner = function(){
            return ProductosService.getImgModulo().then(function(data){
                if(data){
                    vm.banner = data;
                   
                    
                }
            });
        };
    
    function getProductList(filter) {}
    
    vm.init = function(){
        debugger;
        vm.mostrarBanner();
       vm.mostrarListaProductos();
	};
    
    vm.init();
}
