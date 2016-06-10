angular
    .module("backendEcommerceClientes.iniciarSesion")
    .controller("IniciarSesionController", InicioSesionCtrl);

InicioSesionCtrl.$injector = ["$state","InicioService","$rootScope", "$scope"];

function InicioSesionCtrl($state, InicioService,$rootScope, $scope) {
    var vm = this;
    vm.datosUsuario=[];  
    vm.email=" ";
    vm.password=" ";
    vm.fechaNacimiento= new Date();
    var emailUsuarioLogueado;
    var idUsuarioLogueado;
    vm.usuarioLogueado = false;
    
    vm.usuarioGetAllByEmailPassword = function(){
        return InicioService.loginByEmailPassword(vm.email,vm.password).then(function(data){
              debugger;
            if(data != undefined && data.length>0){
                    vm.datosUsuario = data;
                    emailUsuarioLogueado = vm.datosUsuario[0].usuario;
                    idUsuarioLogueado = vm.datosUsuario[0].idUsuario;
                    vm.getLogin();
                    $state.go("perfil.detalleCuenta");
					debugger;
             }
        });
    };
    
     vm.getLogin = function(){
      return InicioService.getLogin().then(function(data){
            if(data){    
                $scope.main.datosUsuario = data;
            }else{
                $scope.main.datosUsuario = null;
            }
        });
    }
    // acastillo 04/06/2016 
    vm.usuarioGetAllByEmailDni = function(){
        return InicioService.getAllByEmailDni(vm.email,vm.dni).then(function(data){

            console.log('Controller-vm.email:'+vm.email);
            console.log('Controller-vm.dni:'+vm.dni);
            
            if(data){
                    vm.datosUsuario = data;
                    console.log('Controller-vm.datosUsuario[0].password:'+vm.datosUsuario[0].password);
                
                    MailService.mandarMail("modashowventaropa@gmail.com" //mailRemitente
                                           , "ModaShow"                       //nombreRemitente
                                           , vm.email//"adriana.castillo2025@gmail.com"//mailDestinatario
                                           , "Recupero de password"                       //asunto
                                           ,"<p>"//contenido
                                            +"</br> Datos:</br>"
                                            +"  <br>Usuario:</br>"+"<I>"+vm.email+"</I>"
                                            +"  <br>password:</br>"+"<I>"+vm.datosUsuario[0].password+"</I>"
                                            +"</p>"
                                          );

            }
        });
    };
    

      vm.init = function(){
       // vm.getLogin();
	};
    
    vm.init();
};
