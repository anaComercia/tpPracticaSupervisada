angular
    .module("backendEcommerceClientes.perfil")
    .controller("PerfilController", PerfilCtrl);

PerfilCtrl.$injector = ["$state"];

function PerfilCtrl($state) {
    vm = this;
    
    vm.reputacionCliente = 75;
    vm.mensajeReputacion = "Tu reputación es de ";
    
    vm.mensajeInformativo= "La reputación es un acumulador de puntos que comenzará con un valor de 100 al crearse la cuenta."
                         + "Ésta disminuirá en 25 cada vez que usted realice una compra y no la concrete. Cuando la reputación llegue a 0 (cero), su cuenta será inhabilitada y deberá comunicarse con una sucursal para aclarar su situación; Del mismo modo, cada vez que usted realice una compra satisfactoria la reputación incrementará en 25 hasta un máximo de 100. "
}