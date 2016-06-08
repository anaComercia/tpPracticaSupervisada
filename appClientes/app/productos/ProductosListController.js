    angular
    .module("backendEcommerceClientes.producto")
    .controller("ProductosListController", ProductosCtrl);


ProductosCtrl.$injector = ["$state","ProductosService" ,"$rootScope"];

function ProductosCtrl($state, ProductosService,$rootScope) {
   var  vm = this;
    vm.productList=[];
    vm.banner = '';
    vm.talles = [];
    vm.colores = [];
    vm.talleDesHabilitado = true;
    vm.colorDesHabilitado = true;
    vm.deshabilitarBtnAgregar=true;
    vm.talleSelecId;
    vm.cookieUser ='ana'; //DESHARCODEAR ESTO
    vm.bancos = [];
    vm.sku=0;
    vm.objColor = [];
    vm.mySelect = {};//seleccion de los combos
    vm.messageSuccess = "El producto se agregó con éxito a tus reservas."
    vm.hideMsgSuccess = true;
 
  
    
    //lista del carrito
    var objTemporal = {};// cada item del carrito

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
                vm.banner = data[0].modulo;
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
        vm.source = $event.target.src;
    }

    function getProductDetail(prod) {
        if(prod != null){
            vm.prodDetalle = $state.params.prodId;
            vm.source = vm.prodDetalle.img1;
            vm.mostrarTalles();
        }
    }
    
   vm.evalHabilitacionBtnAg = function evalBtn(){
       if((typeof vm.mySelect != "undefined") 
          && ( typeof vm.mySelect.size != "undefined" ) 
          && ( typeof vm.mySelect.color != "undefined" ) 
          &&(vm.cookieUser != '')){
            vm.deshabilitarBtnAgregar = false;
       }else{
          vm.hideMsgSuccess = true; 
          vm.deshabilitarBtnAgregar = true; 
       }
   }
   
   vm.ejectuarCambioColor =   function traerDatos(){
       vm.obtenerSKU();
       vm.evalHabilitacionBtnAg();
   }
   
   vm.ejectuarCambioTalle =  function traerColores (talle){
       
        vm.mySelect.color= undefined;
        
        vm.talleSelecId = talle.idTalle;
        vm.mostrarColores();
        vm.evalHabilitacionBtnAg();
    }
    
   vm.obtenerSKU = function obtenerSKUprod(){
        return ProductosService.getSKU(vm.mySelect.size.idTalle,vm.mySelect.color.idColor,vm.prodDetalle.idProd).then(function(data){
            if(data){
                vm.sku = data[0].codSku; 
            }
        });
   };
   
   vm.agregarProductoTemporal= function generarListaTemp (){
       debugger;
       var cantidad = 1;
       var flagAgregar = true;
       var carrito = localStorage.listaTemporal == undefined ? new Array() : JSON.parse(localStorage.listaTemporal);
       if(carrito.length > 0){ 
           //si ya hay productos, necesito validar el sku para sumarlo
           for(var i = 0; i< carrito.length; i++){
                if(carrito[i].sku == vm.sku){
                    carrito[i].cantidad = carrito[i].cantidad + 1;
                    debugger;
                    carrito[i].unitPrice = parseInt(carrito[i].unitPrice) + parseInt(vm.prodDetalle.prodPrecio);
                    flagAgregar = false;
                }
            }
           
       }
       if(flagAgregar){
           objTemporal = {
                id: vm.prodDetalle.idProd,
                sku: vm.sku ,
                cantidad: cantidad ,
                detail: vm.prodDetalle.prodTit,
                unitPrice: vm.prodDetalle.prodPrecio,
                gender: vm.prodDetalle.gendDesc,
                sizeId: vm.mySelect.size.idTalle,
                size: vm.mySelect.size.descripcion,
                colorId: vm.mySelect.color.idColor,
                color: vm.mySelect.color.descripcion,
                image: vm.prodDetalle.img1        
            };
           carrito.push(objTemporal);
       }
       
        //var carrito = localStorage.listaTemporal == undefined ? new Array() : JSON.parse(localStorage.listaTemporal);
       // carrito.push(objTemporal);
        localStorage.listaTemporal = JSON.stringify(carrito);
       
        var precio =  parseInt(vm.prodDetalle.prodPrecio);
        var contador =localStorage.contador == undefined ? new Number() : JSON.parse(localStorage.contador) ;
        contador = contador + precio;
        localStorage.contador = JSON.stringify(contador);
       
        $rootScope.$emit('actualizarTotal', contador);

              
       vm.hideMsgSuccess = false;
    };
   
      vm.init = function(){
        vm.mostrarListaProductos(); 
        vm.mostrarBanner();
        vm.mostrarListaProductos();
        vm.mostrarBancos();
	};
    
    vm.init();

    
    
  
}
