var admGeneral = angular.module("backendEcommerceAdmin.admGeneral", [
"ui.router"
]);

admGeneral.config(function($stateProvider){
$stateProvider
		.state("admGeneral.nuevapass",{
			url : "/nuevaPass",
			templateUrl : "app/admin/admGeneral/PerfilAdmPassTemplate.html"
		})
});