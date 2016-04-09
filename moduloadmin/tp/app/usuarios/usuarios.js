var usuarios = angular.module("backendEcommerce.usuarios", [
"ui.router"
]);

productos.config(function($stateProvider){

	$stateProvider
		.state("usuarios.nueva",{
			url : "/nuevo",
			templateUrl : "app/usuarios/UsuariosFormTemplate.html"
		})
		.state("usuarios.editar",{
			url : "/editar/:id",
			templateUrl : "app/usuarios/UsuariosFormTemplate.html"
		});
});