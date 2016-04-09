var perfil = angular.module("backendEcommerce.perfil", [
"ui.router"
]);

perfil.config(function($stateProvider){

	$stateProvider
		.state("perfil",{
			url : "/nuevo",
			templateUrl : "app/productos/ProductosFormTemplate.html"
		})
});