angular
    .module("backendEcommerceClientes.carrito")
    .controller("PagarCompraController", PagarCompraController);

PagarCompraController.$injector = ["$state", "$scope", "CarritoService"];

function PagarCompraController($state,$scope,CarritoService) {
   var vm = this;
    
    //vm.sumaTotalReservas = $scope.carrito.totalReservas;
    vm.sumaTotalReservas = vm.totalReservas ;
    vm.mySelect = {};//seleccion de los combos
    vm.nvoDom = {};//seleccion de los combos
    vm.bancos = [];
    vm.cupon=[];
    vm.sucursales = [];
    vm.disableTarjetas = true;
    vm.disableCuotas=true;
    vm.tarjetas = [];
    vm.cuotas = [];
    vm.hiddenTarjeta = true;
    vm.isOpenTarjeta = false;
    vm.hiddenSucursal = true;
    vm.isOpenSucursal = false;  
    vm.idUsuario = 1; //sacar HARDCODE
    vm.subTotal = localStorage.contador == undefined ? new Number() : JSON.parse(localStorage.contador);
    vm.valorCupon = 0;
    vm.totalReservas = vm.subTotal - vm.valorCupon;
    
     
    
      vm.domicilios = [
        {
            id: 1,
            detail: 'Ameguino 125'
        },
        {
            id: 2,
            detail: 'Segurola 1765'
        },
        {
            id: 3,
            detail: 'Jonte 987'
        }];
    
     
    
     vm.localidades = [
        {
            id: 1,
            detail: 'San Isidro'
        },
        {
            id: 2,
            detail: 'Monte Castro'
        },
        {
            id: 3,
            detail: 'Avellaneda'
        }];
    vm.provincias = [
        {
            id: 1,
            detail: 'Buenos Aires'
        },
        {
            id: 2,
            detail: 'Capital Federal'
        },
        {
            id: 3,
            detail: 'Gran Buenos Aires'
        }];
    
   
    
    $scope.mostrarTarjetas = function(value) {
        if(value){
            vm.hiddenTarjeta= false;
            vm.isOpenTarjeta = true;
            vm.hiddenSucursal = true;
            vm.isOpenSucursal = false;
        }
        
        
   
    };
    vm.prueba = function(){
    debugger;   
        console.log(vm.mySelect);
    };
    
    vm.pagarCarrito = function(){
        debugger;
        if(vm.isOpenSucursal == true){ //pago en efectivo
            
        }
        if(vm.isOpenTarjeta == true){ //pago con tarjeta
           console.log(vm.mySelect);
            //necesito estos cambios 
            //tabla compra -> idTarjetaBanco
            //tabla tarjeta_banco -> idTarjetaBanco
            if((typeof vm.mySelect.bancos != undefined)
                &&(typeof vm.mySelect.cuotas != undefined)
                &&(typeof vm.mySelect.domicilioEntrega != undefined)
                &&(typeof vm.mySelect.fechaTarjeta != undefined)
                &&(typeof vm.mySelect.nroTarjeta != undefined)
                &&(typeof vm.mySelect.tarjeta != undefined)){
                //puedo pagar
              
                
            }
        }
    };
    
    vm.verificoCupon = function(){
        if(vm.mySelect.cupon.length == 8 ){
            return CarritoService.getVerifCupon(vm.mySelect.cupon, vm.idUsuario).then(function(data){
                if(data){
                    debugger;
                    vm.cupon = data;
                    vm.totalReservas = vm.subTotal - parseInt(vm.cupon[0].descuento);
                    vm.valorCupon = parseInt(vm.cupon[0].descuento);
                }
            });
        }
    };
    
     $scope.mostrarSucursales = function(value) {
        if(value){
            vm.hiddenTarjeta= true;
            vm.isOpenTarjeta = false;
            vm.hiddenSucursal = false;
            vm.isOpenSucursal = true;
        }
        
         vm.cargarSucursales();
   
    };
    
    vm.cargarSucursales = function(){
        return CarritoService.getSucursales().then(function(data){
            if(data){
                debugger;
                vm.sucursales = data;
            }
        });
    };
    
    vm.cambioBanco = function(){
        vm.traerTarjetas();
    }
    
    vm.cambioTarjeta = function(){
        vm.traerCuotas();
    }
    
    vm.mostrarBancos = function(){
     return CarritoService.getBancos().then(function(data){
            if(data){
                vm.bancos = data;

            }
        });
    }
    
    vm.traerTarjetas = function(){
     return CarritoService.getTarjetas(vm.mySelect.bancos.id).then(function(data){
            if(data){
                vm.tarjetas = data;
                vm.disableTarjetas = false;
            }
        });
    }
    
     vm.traerCuotas = function(){
     return CarritoService.getCuotas(vm.mySelect.bancos.id,vm.mySelect.tarjeta.id).then(function(data){
            if(data){
                vm.cuotas = data;
                vm.disableCuotas = false;
            }
        });
    }
    
    vm.init = function(){
       
        vm.mostrarBancos();
	};
    
    vm.init();
  /*  $(function () {
     $("#datepicker").datepicker({ 
            autoclose: true, 
            todayHighlight: true
      }).datepicker('update', new Date());;
    });*/

}