angular
    .module("backendEcommerceClientes.crearCuenta")
    .controller("CrearCuentaController", CrearCtaCtrl);


CrearCtaCtrl.$injector = ["$state","CrearCuentaService"];

function CrearCtaCtrl($state, CrearCuentaService) {

}