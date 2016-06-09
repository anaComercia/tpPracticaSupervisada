angular
    .module("backendEcommerceClientes.perfil")
    .controller("PerfilController", PerfilCtrl);

PerfilCtrl.$injector = ["$state","PerfilService", "$scope", "ProductosService"];

function PerfilCtrl($state, PerfilService, $scope, ProductosService) {
    var vm = this;
    vm.idUsuario = 2;           //SACAR HARDCODE
    vm.cuponUsadosLista =[];    //TOMO EN CONSIDERACION usado = SI
    vm.cuponNuevosLista = [];   //TOMO EN CONSIDERACION usado = NO
    vm.datosDelCliente=[];      //acastillo 22/05/2016
    //vm.detalleDelCliente ={};   //acastillo 24/05/2016
    vm.nombre=" ";
    
    // acastillo 27/05/2016
    vm.generos = [];
    vm.generoSeleccionado = "";
    vm.provincias = [];
    vm.localidades = [];
    vm.tiposDni = [];
    
    //acastillo 30/05/2016
    vm.datosUsuario=[];  
    vm.emailUsuario="vanesa";
    vm.passwordNueva=" ";
    vm.passwordActual=" ";
    vm.passwordRepetir=" ";
	vm.dateEditar = new Date();
    vm.banner = '';
    
    vm.mostrarBanner = function(){
        return ProductosService.getImgModulo().then(function(data){
            if(data){
                vm.banner = data[0].modulo;
            }
        });
    };
    /* reputacion */
    //vm.mensajeReputacion = "";
    
    vm.mensajeInformativo= "La reputación es un acumulador de puntos que comenzará con un valor de 100 al crearse la cuenta."
                         + "Ésta disminuirá en 25 cada vez que usted realice una compra y no la concrete. Cuando la reputación llegue a 0 (cero), su cuenta será inhabilitada y deberá comunicarse con una sucursal para aclarar su situación; Del mismo modo, cada vez que usted realice una compra satisfactoria la reputación incrementará en 25 hasta un máximo de 100. ";
    
     vm.mostrarReputacion = function(){
          return PerfilService.getReputacion(vm.idUsuario).then(function(data){
                if(data){
                    var reputacionCliente = data; 
                   // $scope.$apply(function(){
                        vm.mensajeReputacion = "Tu reputación es de " + reputacionCliente[0].rep + " puntos.";
                   // });
                }
                
            });
        };
    
     vm.mostrarCuponesUsados = function(){
            return PerfilService.getCuponesUsados(vm.idUsuario).then(function(data){
                if(data){
                    vm.cuponUsadosLista = data; 
                }
            });
        };
    
     vm.mostrarCuponesNuevos = function(){
            return PerfilService.getCuponesNuevos(vm.idUsuario).then(function(data){
                if(data){
                    vm.cuponNuevosLista = data; 
                }
            });
        };
    
    //acastillo 22/05/2016--------------------------------------------------------------------------
    
     vm.getDatos = function(){
          return PerfilService.getDatosDelCliente(vm.emailUsuario).then(function(data){
            if(data){
                    vm.datosDelCliente = data;
                    vm.emailUsuario=vm.datosDelCliente[0].email;
                     var fecha = vm.convertirFecha(vm.datosDelCliente[0].fechaNacimiento);
                     fecha = fecha.split("/");
                     var dia = parseInt(fecha[0]);
                     var mes = parseInt(fecha[1])-1;
                     var year = parseInt(fecha[2]);
                     vm.dateEditar = new Date(year, mes,dia);  
                vm.getLocalidadesById(vm.datosDelCliente[0].idProvincia);    
			};              
        });
    };
    
// acastillo 27/05/2016------------------------------------------------------------- 
    vm.getGeneros = function(){
          return PerfilService.getGeneros().then(function(data){
            //console.log(data);
            vm.generos = data;
        });
    };
    
    vm.getProvincias = function(){
          return PerfilService.getProvincias().then(function(data){
            //console.log(data);
            vm.provincias = data;

              
            //console.log(vm.provincias[2].descripcion);
        });
    };
    

    vm.getLocalidadesById = function(id){
    return PerfilService.getLocalidadesById(id).then(function(data){
            //console.log(data);
            vm.localidades = data;
        });
    };

 
    vm.getTiposDni = function(){
          return PerfilService.getTiposDni().then(function(data){
            //console.log(data);
            vm.tiposDni = data;
        });
    };
    
    
    vm.modificacionDeCuenta = function(){
        console.log(vm.datosDelCliente[0].nombre);
        PerfilService.modificarCuenta(
           vm.datosDelCliente[0].nombre
         , vm.datosDelCliente[0].apellido
         , vm.datosDelCliente[0].email
         //, vm.datosDelCliente[0].repetirEmail
         , vm.datosDelCliente[0].numDni
         , vm.datosDelCliente[0].idTipoDni
         , vm.datosDelCliente[0].fechaNacimiento
         , vm.datosDelCliente[0].telefono
         , vm.datosDelCliente[0].idProvincia   
         , vm.datosDelCliente[0].direccion
         , vm.datosDelCliente[0].idLocalidad
         , vm.datosDelCliente[0].cp
         , vm.datosDelCliente[0].clave
         //, vm.datosDelCliente[0].repetirClave
         , vm.datosDelCliente[0].idGenero
         , vm.datosDelCliente[0].idDireccion
        )
        .then(function(response){
            debugger;
                if(response.data.error){
                    alert("Ha ocurrido un error al actualizar el cliente");
                    return;
                }
            })
    };
    
// acastillo 30/05/2016------------------------------------------------------------------------- 

    //console.log(vm.emailUsuario); //
    
    //Obtengo los datos de la tabla:usuario
    vm.usuarioGetAllByEmail = function(){
        return PerfilService.getAllByEmail(vm.emailUsuario).then(function(data){
            console.log(vm.emailUsuario);
            if(data){
                    vm.datosUsuario = data;
                    
            }
        });
    };
    
this.convertirFecha = function(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    }  
    vm.actualizarContrasenia = function(){
        PerfilService.actualizarContrasenia(
          vm.datosUsuario[0].usuario //email
         ,vm.passwordNueva
         ,vm.passwordRepetir
        )
        .then(function(response){
            debugger;
                if(response.data.error){
                    alert("Ha ocurrido un error al actualizar la password");
                    return;
                }
            })
    };



    
















 
      



     vm.init = function(){
        vm.mostrarReputacion();
        vm.mostrarCuponesUsados();
        vm.mostrarCuponesNuevos();
        vm.mostrarBanner();
        vm.getDatos();//acastillo 22/05/2016
		//acastillo 27/05/2016
        vm.getGeneros();
        vm.getProvincias();
        vm.getTiposDni();
         
        vm.usuarioGetAllByEmail();//acastillo 30/05/2016
	};
    
    vm.init();
    
}