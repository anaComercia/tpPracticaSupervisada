var colores = angular.module("backendEcommerceAdmin.colores", [
	"ui.router"
]);

colores.config(function($stateProvider){

	$stateProvider
		.state("colores.nuevo",{
			url : "/nuevo",
			templateUrl : "app/admin/colores/ColoresFormNew.html"
		})
		.state("colores.editar",{
			url : "/editar/:id",
			templateUrl : "app/admin/colores/ColoresFormTemplate.html"
		});
});