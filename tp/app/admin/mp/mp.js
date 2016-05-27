var mp = angular.module("backendEcommerceAdmin.mp", [
"ui.router"
]);

mp.config(function($stateProvider){

	$stateProvider
		.state("mp.nueva",{
			url : "/nuevo",
			templateUrl : "app/admin/mp/MpFormTemplate.html"
		})
		.state("mp.editar",{
			url : "/editar/:id",
			templateUrl : "app/admin/mp/MpFormTemplateEditar.html"
		});
});