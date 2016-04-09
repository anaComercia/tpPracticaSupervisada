//acá se agregan las dependencias entre [], las dependencias son cada uno de los módulos que se declaran en sus respectivos nombre.js
//Agrego todos los modulos que voy a usar despues, lo agrego porque estoy en el principal, agrego los hijos
var backendEcommerce = angular.module("backendEcommerce", [
	"backendEcommerce.categorias",
	"backendEcommerce.productos",
    "backendEcommerce.mp",
    "backendEcommerce.talles",
	"ui.router" //Se agrega siempre como una dependencia
]);

//Solo se declara en la principal
backendEcommerce.config(function($stateProvider, $urlRouterProvider){
//Aquí se declaran todas las rutas (estados) que va a utilizar la página
//Cada ruta debe declarar una url, el html que se va a mostrar, el controller a usar y con que alias se va a llamar a dicho controller
	$stateProvider
		.state("categorias", { //Nombre con que se reconoce la ruta
			url : "/categorias", //como voy a mostrar la ruta en la web
			templateUrl : "app/categorias/CategoriasTemplate.html",//Es el HTML que se va a insertar en <div class="container" ui-view></div>
			controller : "CategoriasController",// Es el nombre del controller
			controllerAs : "cat"// es el alias que usamos para referirnos al controller
		})
		.state("productos", {
			url : "/productos",
			templateUrl : "app/productos/ProductosTemplate.html",
			controller : "ProductosController",
			controllerAs : "prod"
		})
       .state("mp", {
			url : "/mp",
			templateUrl : "app/mp/MpTemplate.html",
			controller : "MpController",
			controllerAs : "mp"
		})
		.state("usuarios", {
			url : "/usuarios",
			templateUrl : "app/usuarios/UsuariosTemplate.html",
			controller : "UsuariosController",
			controllerAs : "user"
		})
    .state("talles", {
			url : "/talles",
			templateUrl : "app/talles/TallesTemplate.html",
			controller : "TallesController",
			controllerAs : "tall"
		})
    	.state("perfil", {
			url : "/perfil",
			templateUrl : "app/perfil/PerfilTemplate.html",
			controller : "PerfilController",
			controllerAs : "prfl"
		});
	
	$urlRouterProvider.otherwise("/productos"); //Le definimos cual se muestra por defecto cuando entramos al index, Nombre de la ruta
	
});