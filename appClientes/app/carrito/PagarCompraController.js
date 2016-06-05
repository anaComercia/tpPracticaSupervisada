angular
    .module("backendEcommerceClientes.carrito")
    .controller("PagarCompraController", PagarCompraController);

PagarCompraController.$injector = ["$state", "$scope", "CarritoService","$rootScope"];

function PagarCompraController($state,$scope,CarritoService,$rootScope) {
   var vm = this;
    
    //vm.sumaTotalReservas = $scope.carrito.totalReservas;
    vm.sumaTotalReservas = vm.totalReservas ;
    vm.mySelect = {};//seleccion de los combos
    vm.nvoDom = {};//seleccion de los combos
    vm.bancos = [];
    vm.hideErrorLongTarjeta = true;
    vm.hideErrorFechaTarjeta = true;
    vm.cupon=[];
    vm.sucursales = [];
    vm.sucursalesSelects = [];
    vm.disableTarjetas = true;
    vm.showError = true;
    vm.disableCuotas=true;
    vm.disableLocalidad = true;
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
    vm.domicilios = [];
    vm.provincias = [];
    vm.localidades = [];
    vm.idPersona = 0;
    vm.disableBtnGuardar = true;
    var puedoGuardar = false;
    var tarjetaBcoId;
    var alertas = [];
    vm.compraFinalizada = false;
    vm.hideCompraOk= true;
    vm.hidePagar= false;
    vm.mensajeCompraOk ="";
    
    
   vm.buscarLocalidades = function(){
       debugger;
       vm.habilitarGuardar();
          return CarritoService.getLocalidades(vm.nvoDom.provincia.idProv).then(function(data){
            if(data.length>0){
               vm.localidades = data;
               vm.disableLocalidad = false;
            }
        });
   };
    
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
    
    vm.setearSucRetiro = function(value){
        vm.mySelect.retiro = vm.sucursales[value];
        
    };
    
    vm.pagarCarrito = function(){
        if(vm.subTotal != 0
            || vm.totalReservas != 0){
            if(vm.isOpenSucursal == true){ //pago en efectivo
                guardarCompraEfvo();
            }
        if(vm.isOpenTarjeta == true){ //pago con tarjeta
            if(( vm.mySelect.bancoSelec != undefined)
                &&( vm.mySelect.cuotaSelec != undefined)
                &&( vm.mySelect.domicilioEntrega != undefined)
                &&( vm.mySelect.fechaTarjeta != undefined)
                &&( vm.mySelect.nroTarjeta != undefined)
                &&( vm.mySelect.tarjeta != undefined)){
                //valido longitud de tarjeta
                puedoGuardar = true;
                
                if(vm.mySelect.nroTarjeta.toString().length != 16){
                    vm.hideErrorLongTarjeta = false;
                    vm.mensajeLongTarjeta = "El número de la tarjeta debe ser de 16 dígitos."
                    puedoGuardar = false;
                };
                
                //valido fecha de tarjeta
                var today = new Date();
               
                var dateCard = new Date(vm.mySelect.fechaTarjeta);
                if(dateCard < today){
                    vm.hideErrorFechaTarjeta = false;
                    vm.mensajeFechaTarjeta = "La fecha de la tarjeta ingresada debe ser mayor al día de hoy."
                    puedoGuardar = false;
                };
              
                if(puedoGuardar == true){
                    guardarCompraTarjeta();
                };
            };
        };
        //TODO: restar productos del carrito
        //TODO: impactar en las tablas
        //TODO: front - input numero tarjeta
        //TODO: pto reposicion javi
        }
       
        
    };
    
    function buscarIdTarjetaBco(){
         return CarritoService.getTarjetaBancoId(vm.mySelect.bancoSelec.id, 
                                                 vm.mySelect.tarjeta.id,
                                                vm.mySelect.cuotaSelec.cuotas).then(function(data){
            if(data){
                tarjetaBcoId = data[0].id;
                insertarCompraTarjeta();
            }
        });
    };
    
   function insertarCompraTarjeta(){
      var idCompra;
        var idCupon;
        var detalleCompra = [];
        debugger;
        if(vm.cupon.length == 0){
            idCupon = 0; //NO TIENE CUPON
        }else{
            idCupon = vm.cupon[0].idCup;
        };
          detalleCompra =  JSON.parse(localStorage.listaTemporal);
        var compraFecha = new Date();
        //insertar compra Y ME DEVUELVE EL ID AL CONTROLLER
         CarritoService.postInsertCompraTarjeta(vm.idUsuario, //vm.idUsuario
                                         idCupon, // vm.cupon[0].idCup
                                         tarjetaBcoId, //tarjeta banco = null
                                         null, // sucursal =    vm.retiro.id
                                         vm.mySelect.domicilioEntrega.id, //idDireccion= null
                                         vm.totalReservas, //  monto = vm.totalReservas
                                         compraFecha,//  fechaCompra =null
                                         vm.mySelect.fechaTarjeta,//fechaTarjeta = null
                                         compraFecha,//fechaPago = null
                                         'PAGADA',//estado =  PENDIENTE RETIRO
                                         vm.mySelect.nroTarjeta,//NRO TARJETA = null
                                         'T',//tipoPago = E
                                         detalleCompra) //lista carrito
        .then(function(response){

            if(response.data.error){
                alert("Ha ocurrido un error");
                return;
            }else{
             
               idCompra = response.data.data.idCompra;
                
                if(idCupon != 0){
                    actualizarCupon();
                }
                 for(var i = 0; i< detalleCompra.length; i++){
                    insertarDetalle(detalleCompra[i], idCompra);
                     debugger;
                   //  actualizarStock(detalleCompra[i].sku);
                }
                localStorage.clear();
                vm.totalReservas = 0;
                vm.subTotal = 0;
                $rootScope.$emit('actualizarTotal', vm.totalReservas);
            }
        });

    };
    function guardarCompraTarjeta(){
      
       // buscar id tarjeta banco con id banco y id tarjeta
       buscarIdTarjetaBco();
       
    };
    
    function guardarCompraEfvo(){ //Tipo Pago Efectivo = E
        var idCompra;
        var idCupon;
        var detalleCompra = [];
        if(vm.cupon.length == 0){
            idCupon = 0; //NO TIENE CUPON
        }else{
            idCupon = vm.cupon[0].idCup;
        };
        
        detalleCompra =  JSON.parse(localStorage.listaTemporal);
        var compraFecha = new Date();
       //insertar compra Y ME DEVUELVE EL ID AL CONTROLLER
         CarritoService.postInsertCompra(vm.idUsuario, //vm.idUsuario
                                         idCupon, // vm.cupon[0].idCup
                                         null, //tarjeta banco = null
                                         vm.mySelect.retiro.id, // sucursal =    vm.retiro.id
                                         null, //idDireccion= null
                                         vm.totalReservas, //  monto = vm.totalReservas
                                        compraFecha,//  fechaCompra =null
                                        null,//fechaTarjeta = null
                                         null,//fechaPago = null
                                        'PENDIENTE RETIRO',//estado =  PENDIENTE RETIRO
                                        null,//NRO TARJETA = null
                                        'E',//tipoPago = E
                                        detalleCompra) //lista carrito
        .then(function(response){

            if(response.data.error){
                alert("Ha ocurrido un error");
                return;
            }else{
               idCompra = response.data.data.idCompra;
                
                if(idCupon != 0){
                    actualizarCupon();
                }
                
                for(var i = 0; i< detalleCompra.length; i++){
                    insertarDetalle(detalleCompra[i], idCompra);
                    debugger;
                    
                }
            }
        });

    };
    
    function insertarDetalle(item, idCompra){
        //TODO: reagrupar SKU y hacer bbdd clave compeusta idCompra codSku
        return CarritoService.insertarDetalle(idCompra,
                                             item.sku,
                                             1,
                                             item.unitPrice).then(function(data){
            
            debugger;
            if(data){
               actualizarStock(item.sku);
                debugger;
                localStorage.clear();
                vm.totalReservas = 0;
                vm.subTotal = 0;
                $rootScope.$emit('actualizarTotal', vm.totalReservas);
                vm.compraFinalizada = true;
                vm.hideCompraOk = false;
                vm.hidePagar = true;
                debugger;
                vm.mensajeCompraOk= "Su compra se efectuó correctamente. Su código de compra es " + idCompra + " .";
                debugger;
            }
            if(data.error){
               vm.compraFinalizada = false;
                vm.hideCompraOk = true;
                vm.hidePagar = false;
            }
        });
    };
    function actualizarCupon(){
           return CarritoService.actualizarCupon(vm.cupon[0].idCup, vm.idUsuario).then(function(data){
            if(data){
                
            }
        });
    };
    
    function actualizarStock(sku){
        return CarritoService.actualizarStock(sku).then(function(data){
            if(data){
                console.log(data);
                //consultarStock(sku);
                //TODO: manejo de stock entre sucursales
                //TODO: precio de envio entre sucursales
              console.log("refressco bien el stock");
            }
        });
    };
    function  consultarStock(sku){
        //TODO ARREGLAR porque debe ser por sku y id prod 
        //validar que ya no este insertado el alerta
        return CarritoService.consultarStock(sku).then(function(data){
            if(data.length > 0){
                alertas = data;
                generarAlerta();
              console.log("refressco bien el stock");
            }
        });
    };
    
    function generarAlerta(){
        console.log(alertas);
        for(var i = 0; i<alertas.length ; i++){
            insertAlertProducto(alertas[i].idStock);
        };
           
    };
    
    function insertAlertProducto(id){
         return CarritoService.generarAlerta(id).then(function(data){
                if(data){
                  console.log("inserto bien el alerta");
                }
            });
        
    };
    vm.verificoCupon = function(){
       // if(vm.mySelect.cupon.length == 8 ){
            return CarritoService.getVerifCupon(vm.mySelect.cupon, vm.idUsuario).then(function(data){
                if(data.length > 0){
                    vm.cupon = data;
                    vm.totalReservas = vm.subTotal - parseInt(vm.cupon[0].descuento);
                    vm.valorCupon = parseInt(vm.cupon[0].descuento);
                }
                
                if(data.length == 0){
                    vm.totalReservas = vm.subTotal
                    vm.valorCupon = 0;
                }
            });
      //  }
    };
    
    $scope.mostrarSucursales = function(value) {
        if(value){
            vm.hiddenTarjeta= true;
            vm.isOpenTarjeta = false;
            vm.hiddenSucursal = false;
            vm.isOpenSucursal = true;
            vm.hideErrorLongTarjeta = true;
            vm.hideErrorFechaTarjeta = true;
        }
        
        vm.cargarSucursales();
    };
    
    vm.cargarSucursales = function(){
        return CarritoService.getSucursales().then(function(data){
            if(data){
               vm.sucursales = data;
            }
        });
    };
    vm.cargarProvincias = function(){
        vm.localidades = [];
        return CarritoService.getProvincias().then(function(data){
            if(data){
                vm.provincias = data;
            }
        });
    };

    vm.ejecutarModal = function(){
        vm.showError = true;
        vm.nvoDom = {};//seleccion de los combos 
        vm.disableLocalidad = true;
        vm.cargarProvincias();
    };
    
     vm.cargarDomicilios = function(){
        return CarritoService.getDomicilios(vm.idUsuario).then(function(data){
            if(data){
                vm.domicilios = data;
            }
        });
    };
    
    vm.insertarNvoDom = function(){
        CarritoService.postNvoDom(vm.nvoDom.direccion, vm.nvoDom.cp, vm.nvoDom.provincia.idProv, vm.nvoDom.localidad.idLoc, vm.idPersona)
        .then(function(response){
           
            debugger;
            if(response.data.error){
                alert("Ha ocurrido un error");
                return;
            }else{
             vm.cargarDomicilios();
            }
        })
        
    };
    
      vm.buscarIdPersona = function(){
         return CarritoService.getIdPersona(vm.idUsuario).then(function(data){
            if(data.length> 0){
                vm.idPersona = data[0].id;
            }
        });
    };
    
    vm.habilitarGuardar = function(){
        if(( vm.nvoDom.direccion != undefined)
           &&( vm.nvoDom.direccion != "") 
            &&( vm.nvoDom.cp != undefined) 
           &&( vm.nvoDom.cp != null) 
            &&( vm.nvoDom.provincia != undefined)
            &&( vm.nvoDom.localidad != undefined)){
            //habilitar btn
            vm.disableBtnGuardar = false;
            if(vm.nvoDom.cp.toString().length !=4){
                vm.showError = false;
                vm.disableBtnGuardar = true;
                vm.msgErrorCp = "El código postal debe contener solo 4 números.";
            }else{
                vm.showError = true;
                vm.buscarIdPersona();
            }
        }else{
            //deshabilitar btn
            vm.disableBtnGuardar = true;
        }
    };
    vm.guardarNvoDom = function(){
        //guarda nuevo domicilio
        if(vm.idPersona != 0){
            vm.insertarNvoDom();
        }        
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
     return CarritoService.getTarjetas(vm.mySelect.bancoSelec.id).then(function(data){
            if(data){
                vm.tarjetas = data;
                vm.disableTarjetas = false;
            }
        });
    }
    
     vm.traerCuotas = function(){
     return CarritoService.getCuotas(vm.mySelect.bancoSelec.id,vm.mySelect.tarjeta.id).then(function(data){
            if(data){
                vm.cuotas = data;
                vm.disableCuotas = false;
            }
        });
    }
    
    vm.init = function(){
       //TODO: verificar local storage con bbdd el stock a comrpar con sku
        //TODO: verificar tiempo entre sucursales
        vm.mostrarBancos();
        vm.cargarDomicilios();
        
	};
    
    vm.init();

}