var talles = angular.module("backendEcommerce.talles", [
"ui.router"
]);

talles.config(function($stateProvider){

	$stateProvider
		.state("talles.nueva",{
			url : "/nuevo",
			templateUrl : "app/talles/TallesFormTemplate.html"
		})
		.state("talles.editar",{
			url : "/editar/:id",
			templateUrl : "app/talles/TallesFormTemplate.html"
		});
});