var categorias = angular.module("backendEcommerceAdmin.categorias", [
	"ui.router"
]);

categorias.config(function($stateProvider){

	$stateProvider
		.state("categorias.nueva",{
			url : "/nueva",
			templateUrl : "app/admin/categorias/CategoriasNew.html"
		})
		.state("categorias.editar",{
			url : "/editar/:id",
			templateUrl : "app/admin/categorias/CategoriasFormTemplate.html"
		});
});