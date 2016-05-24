var provincias = angular.module("backendEcommerceAdmin.provincias", [
"ui.router"
]);

provincias.config(function($stateProvider){
$stateProvider
		.state("provincias.localidades",{
			url : "/localidades",
			templateUrl : "app/admin/provincias/LocalidadesTemplate.html"
		});
});