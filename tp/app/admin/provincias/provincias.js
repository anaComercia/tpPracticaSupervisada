var provincias = angular.module("backendEcommerceAdmin.provincias", [
"ui.router"
]);

provincias.config(function($stateProvider){
$stateProvider
		.state("provincias.localidades",{
			url : "/localidades",
			templateUrl : "app/admin/provincias/LocalidadesTemplate.html"
		})
        .state("provincias.localidades.nueva",{
			url : "/nueva",
			templateUrl : "app/admin/provincias/LocalidadNuevaTemplate.html"
		})
        .state("provincias.localidades.editar",{
			url : "/editar",
			templateUrl : "app/admin/provincias/LocalidadEditarTemplate.html"
		})
        .state("provincias.nueva",{
			url : "/nueva",
			templateUrl : "app/admin/provincias/ProvinciaNuevaTemplate.html"
		})
        .state("provincias.editar",{
			url : "/editar",
			templateUrl : "app/admin/provincias/ProvinciaEditarTemplate.html"
		});
});