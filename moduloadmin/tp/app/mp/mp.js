var mp = angular.module("backendEcommerce.mp", [
"ui.router"
]);

mp.config(function($stateProvider){

	$stateProvider
		.state("mp.nueva",{
			url : "/nuevo",
			templateUrl : "app/mp/MpFormTemplate.html"
		})
		.state("mp.editar",{
			url : "/editar/:id",
			templateUrl : "app/mp/MpFormTemplate.html"
		});
});