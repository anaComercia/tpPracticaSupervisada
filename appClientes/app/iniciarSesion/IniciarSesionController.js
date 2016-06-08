/*var iniciarSesion = angular.module("backendEcommerceClientes.iniciarSesion",['ngCookies']);

iniciarSesion.controller("IniciarSesionController", ["$state","InicioService","$rootScope","$cookies", function($state, InicioService,$rootScope,$cookies){
    var vm = this;
    vm.datosUsuario=[];  
    vm.email=" ";
    vm.password=" ";
    vm.fechaNacimiento= new Date();
    var emailUsuarioLogueado;
    var idUsuarioLogueado;
    vm.usuarioLogueado = false;
    
    vm.usuarioGetAllByEmailPassword = function(){
        return InicioService.getAllByEmailPassword(vm.email,vm.password).then(function(data){
              debugger;
            if(data != undefined && data.length>0){
                    vm.datosUsuario = data;
                    emailUsuarioLogueado = vm.datosUsuario[0].usuario;
                    idUsuarioLogueado = vm.datosUsuario[0].idUsuario;
                
                //    $cookies.put('emailUsuarioLogueado', 'emailUsuarioLogueado');
                //    $cookies.put('idUsuarioLogueado', 'idUsuarioLogueado');
                debugger;
             }
        });
    };
    
    // acastillo 04/06/2016 
    vm.usuarioGetAllByEmailFechaNacimiento = function(){
        return InicioService.getAllByEmailFechaNacimiento(vm.email,vm.fechaNacimiento).then(function(data){

            console.log('Controller-vm.email:'+vm.email);
            console.log('Controller-vm.fechaNacimiento:'+vm.fechaNacimiento);
            
            if(data){
                    vm.datosUsuario = data;

            }
        });
    };
    
    
    vm.cerrarSesion = function(){
        return InicioService.cerrarSesion().then(function(data){
          $window.location.href = 'http://localhost/tp/index.html';   
        });
    }
}]);*/

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
                    $state.go("perfil");
                //    $cookies.put('emailUsuarioLogueado', 'emailUsuarioLogueado');
                //    $cookies.put('idUsuarioLogueado', 'idUsuarioLogueado');
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
    vm.usuarioGetAllByEmailFechaNacimiento = function(){
        return InicioService.loginByEmailFechaNacimiento(vm.email,vm.fechaNacimiento).then(function(data){

            console.log('Controller-vm.email:'+vm.email);
            console.log('Controller-vm.fechaNacimiento:'+vm.fechaNacimiento);
            
            if(data){
                    vm.datosUsuario = data;

            }
        });
    };
    
    
   /* function checkCookie() {
        emailUsuarioLogueado=getCookie("emailUsuario");
        idUsuarioLogueado = getCookie("idUsuario");
        if (emailUsuarioLogueado!="" && idUsuarioLogueado!="") {
            alert("Welcome again " + emailUsuarioLogueado + " "+ idUsuarioLogueado);
            vm.usuarioLogueado = false;
        } else {
          vm.usuarioLogueado = true;
        }
    }
    */
      vm.init = function(){
       // vm.getLogin();
	};
    
    vm.init();
};
