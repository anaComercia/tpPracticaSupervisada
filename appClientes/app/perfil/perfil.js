var perfil = angular.module("backendEcommerceClientes.perfil", [
  	"ui.router"
]);

perfil.config(function($stateProvider){
    $stateProvider
        .state("perfil.detalleCuenta", {
			url : "/detalleCuenta",
			templateUrl : "app/perfil/PerfilDetalleCuenta.html"

		})
        .state("perfil.modificarContrasenia", {
			url : "/modificarContrasenia",
			templateUrl : "app/perfil/PerfilModificarContrasenia.html"

		})
        .state("perfil.reputacion", {
			url : "/reputacion",
			templateUrl : "app/perfil/PerfilReputacion.html"

		})
        .state("perfil.modificarCuenta", {
			url : "/modificarCuenta",
			templateUrl : "app/perfil/PerfilModificarCuenta.html"

		});

});
              
/*             
$('#perfilTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

*/

