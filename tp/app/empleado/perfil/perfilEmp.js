var perfil = angular.module("backendEcommerceEmp.perfilEmp", [
"ui.router"
]);

perfil.config(function($stateProvider){
	$stateProvider
		.state("perfilEmp.nuevapass",{
			url : "/nuevaPass",
			templateUrl : "app/empleado/perfil/PerfilFormTemplate.html"
		})
});