var usuarios = angular.module("backendEcommerceAdmin.usuarios", [
"ui.router"
]);

productos.config(function($stateProvider){

	$stateProvider
		.state("usuarios.nuevo",{
			url : "/nuevo",
			templateUrl : "app/admin/usuarios/UsuariosFormTemplate.html"
		})
		.state("usuarios.editar",{
			url : "/editar/:id",
			templateUrl : "app/usuarios/UsuariosFormTemplate.html"
		});
});