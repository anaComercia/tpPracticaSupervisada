var perfilAdm = angular.module("backendEcommerceAdmin.perfilAdm", [
"ui.router"
]);

perfilAdm.config(function($stateProvider){

	$stateProvider
		.state("perfilAdm.nuevapass",{
			url : "/nuevaPass",
			templateUrl : "app/admin/perfil/PerfilAdmPassTemplate.html"
		})
});