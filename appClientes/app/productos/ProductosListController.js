    angular
    .module("backendEcommerceClientes.producto")
    .controller("ProductosListController", ProductosCtrl);


ProductosCtrl.$injector = ["$state","ProductosService"];

function ProductosCtrl($state, ProductosService) {
   var  vm = this;
    vm.productList=[];
    vm.banner = '';
    vm.talles = [];
    vm.colores = [];
    vm.talleDesHabilitado = true;
    vm.colorDesHabilitado = true;
    vm.talleSelecId;
    vm.bancos = [];
    vm.objColor = [];

     vm.mostrarBancos = function(){
             return ProductosService.getAllBancos().then(function(data){
                if(data){
                    vm.bancos = data;
                   
                }
            });
        };
    
        vm.mostrarListaProductos = function(){
             return ProductosService.getAllProductos().then(function(data){
                if(data){
                    vm.productList = data;
                   
                }
            });
        };

        vm.mostrarListaJeans = function(){
            return ProductosService.getProductosJean().then(function(data){
                if(data){
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
    
       vm.mostrarTalles = function(){
            return ProductosService.getTalles($state.params.prodId.idProd).then(function(data){
                if(data){
                    vm.talles = data; 
                    vm.talleDesHabilitado = false;
                }
            });
        };
    
    vm.mostrarColores = function(){
            var objColor = [{
                talleSeleccionado: vm.talleSelecId,
                productoSeleccionado: vm.prodDetalle.idProd
            } ];
      //  return ProductosService.getColores(objColor).then(function(data){
            return ProductosService.getColores(vm.talleSelecId,vm.prodDetalle.idProd).then(function(data){
                if(data){
                    vm.colores = data; 
                    vm.colorDesHabilitado = false;
                }
            });
        };
    
     vm.onClickDetail = function(prodId){
        debugger;
  
    }

  
    if(($state.params != null) && (typeof $state.params != "undefined")){  
        vm.prodDetallePresentacion = getProductDetail($state.params.prodId);
    }
 
    
   vm.changeImage=  function($event){
        debugger;
        vm.source = $event.target.src;
    }

    function getProductDetail(prod) {
        if(prod != null){
            vm.prodDetalle = $state.params.prodId;
            vm.source = vm.prodDetalle.img1;
            vm.mostrarTalles();
            
        }
     
    }
    
   vm.ejectuarCambioTalle =  function traerColores (talle){
        vm.talleSelecId = talle.idTalle;
        vm.mostrarColores();
    }
    
      vm.init = function(){
        vm.mostrarBanner();
        vm.mostrarListaProductos();
        vm.mostrarBancos();
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
