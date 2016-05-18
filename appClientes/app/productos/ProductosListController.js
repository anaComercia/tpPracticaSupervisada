angular
    .module("backendEcommerceClientes.producto")
    .controller("ProductosListController", ProductosCtrl);


ProductosCtrl.$injector = ["$state","ProductosService"];

function ProductosCtrl($state, ProductosService) {
    vm = this;
    vm.productList=[];
    vm.banner = '';

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
    
     vm.onClickDetail = function(prodId){
        debugger;
  
    }
     
    
    function getProductList(filter) {}
  
    vm.prodDetalle = $state.params.prodId;
    vm.prodDetallePresentacion = getProductDetail($state.params.prodId);
    vm.source = vm.prodDetalle.img1;
 
    
   vm.changeImage=  function($event){
        debugger;
        vm.source = $event.target.src;
    }

    function getProductDetail(id) {
        debugger;
     
       
    }
    
      vm.init = function(){
        vm.mostrarBanner();
        vm.mostrarListaProductos();
	};
    
    vm.init();
    
  
   /* DETALLE */ 
    
 
    //vm.roductID= $state.params.prodId; //param para el productosDetail.html
  /*   vm.prod = getProductDetail($state.params.prodId);*/
   
   // vm.precioXcuota = vm.prod.price / 3;
   /* vm.precioXcuota = vm.precioXcuota.toFixed(2);
    vm.mySelect = {};//seleccion de los combos
    
    vm.source = vm.prod.image[0];
    vm.changeImage = _changeImage;
    
        
    function _changeImage($event){
        vm.source = $event.target.src;
    }

    function getProductDetail(id) {
        debugger;
     
         for (index = 0; index <  vm.productList.length; ++index) {
             if(vm.productList[index].id == id){
                 return vm.productList[index];
             }
         }
       
    } */
    
    
       /* DETALLE FIN */ 
    
    
    
  
}
