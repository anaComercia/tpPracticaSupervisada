//acá se agregan las dependencias entre [], las dependencias son cada uno de los módulos que se declaran en sus respectivos nombre.js
var backendEcommerceAdmin = angular.module("backendEcommerceAdmin", [
	"backendEcommerceAdmin.categorias",
	"backendEcommerceAdmin.productos",
    "backendEcommerceAdmin.mp",
    "backendEcommerceAdmin.talles",
    "backendEcommerceAdmin.usuarios",
    "backendEcommerceAdmin.perfilAdm",
	"ui.router"
]);

backendEcommerceAdmin.config(function($stateProvider, $urlRouterProvider){
//Aquí se declaran todas las rutas (estados) que va a utilizar la página
//Cada ruta debe declarar una url, el html que se va a mostrar, el controller a usar y con que alias se va a llamar a dicho controller
	$stateProvider
		.state("categorias", {
			url : "/categorias",
			templateUrl : "app/admin/categorias/CategoriasTemplate.html",
			controller : "CategoriasController",
			controllerAs : "cat"
		})
		.state("productos", {
			url : "/productos",
			templateUrl : "app/admin/productos/ProductosTemplate.html",
			controller : "ProductosController",
			controllerAs : "prod"
		})
       .state("mp", {
			url : "/mp",
			templateUrl : "app/admin/mp/MpTemplate.html",
			controller : "MpController",
			controllerAs : "mp"
		})
		.state("usuarios", {
			url : "/usuarios",
			templateUrl : "app/admin/usuarios/UsuariosTemplate.html",
			controller : "UsuariosController",
			controllerAs : "user"
		})
    .state("talles", {
			url : "/talles",
			templateUrl : "app/admin/talles/TallesTemplate.html",
			controller : "TallesController",
			controllerAs : "tall"
		})
    	.state("perfilAdm", {
			url : "/perfilAdm",
			templateUrl : "app/admin/perfil/PerfilAdmTemplate.html",
			controller : "PerfilAdmController",
			controllerAs : "pfAdm"
		});
	
	$urlRouterProvider.otherwise("/perfilAdm");
	
});