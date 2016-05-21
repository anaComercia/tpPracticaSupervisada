angular
    .module("backendEcommerceClientes.perfil")
    .controller("PerfilController", PerfilCtrl);

PerfilCtrl.$injector = ["$state","PerfilService"];

function PerfilCtrl($state, PerfilService) {
    var vm = this;
    vm.idUsuario = 1; //SACAR HARDCODE
    vm.cuponUsadosLista =[]; //TOMO EN CONSIDERACION usado = SI
    vm.cuponNuevosLista = []; //TOMO EN CONSIDERACION usado = NO
    
    /* reputacion */
    vm.reputacionCliente=[];
   
    
    vm.mensajeInformativo= "La reputación es un acumulador de puntos que comenzará con un valor de 100 al crearse la cuenta."
                         + "Ésta disminuirá en 25 cada vez que usted realice una compra y no la concrete. Cuando la reputación llegue a 0 (cero), su cuenta será inhabilitada y deberá comunicarse con una sucursal para aclarar su situación; Del mismo modo, cada vez que usted realice una compra satisfactoria la reputación incrementará en 25 hasta un máximo de 100. ";
    
     vm.mostrarReputacion = function(){
            return PerfilService.getReputacion(vm.idUsuario).then(function(data){
                if(data){
                    vm.reputacionCliente = data; 
                    vm.mensajeReputacion = "Tu reputación es de " + vm.reputacionCliente[0].rep + " puntos.";
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
    
    /* lista cupones 
    vm.cuponUsadosLista = [
        {
            id: 1,
            code: '987dmslk43',
            date: '14/03/2016',
            price: 50
        },
        {
            id: 2,
            code: '87fdswrlkju',
            date: '14/11/2015',
            price: 150
        },
        {
            id: 3,
            code: 'fdsdfh6wet5',
            date: '10/03/2016',
            price: 350
        }];
    
      vm.cuponNuevosLista = [
        {
            id: 1,
            code: '45fdhy57w54',
            price: 150
        },
        {
            id: 2,
            code: 'fhs437use4',
            price: 250
        }];*/
    
     vm.init = function(){
        vm.mostrarReputacion();
        vm.mostrarCuponesUsados();
        vm.mostrarCuponesNuevos();
	};
    
    vm.init();
    
}