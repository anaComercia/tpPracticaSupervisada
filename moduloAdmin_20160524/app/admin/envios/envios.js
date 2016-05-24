var envios = angular.module("backendEcommerceAdmin.envios", [
"ui.router"
]);

envios.config(function($stateProvider){
$stateProvider
		.state("envios.cliente",{
			url : "/cliente",
			templateUrl : "app/admin/envios/EnviosClienteTemplate.html"
		});
});