//acá se agregan las dependencias entre [], las dependencias son cada uno de los módulos que se declaran en sus respectivos nombre.js
//Agrego todos los modulos que voy a usar despues, lo agrego porque estoy en el principal, agrego los hijos
var backendEcommerce = angular.module("backendEcommerceClientes", [
	"backendEcommerceClientes.inicio",
	"backendEcommerceClientes.productos",
    "backendEcommerceClientes.contacto",
    "backendEcommerceClientes.politicaPago",
	"ui.router"
]);

//Solo se declara en la principal
backendEcommerce.config(function($stateProvider, $urlRouterProvider){
//Aquí se declaran todas las rutas (estados) que va a utilizar la página
//Cada ruta debe declarar una url, el html que se va a mostrar, el controller a usar y con que alias se va a llamar a dicho controller
	$stateProvider
		.state("inicio", { //Nombre con que se reconoce la ruta
			url : "/inicio", //como voy a mostrar la ruta en la web
			templateUrl : "app/inicio/InicioTemplate.html",
			controller : "InicioController",// Es el nombre del controller
			controllerAs : "ini"// es el alias que usamos para referirnos al controller
		})
		.state("productos", {
			url : "/productos",
			templateUrl : "app/productos/ProductosTemplate.html",
			controller : "ProductosController",
			controllerAs : "prod"
		})
       .state("contacto", {
			url : "/contacto",
			templateUrl : "app/contacto/ContactoTemplate.html",
			controller : "ContactoController",
			controllerAs : "cont"
		})
		.state("formaPago", {
			url : "/formaPago",
			templateUrl : "app/formaPago/FormaPagoTemplate.html",
			controller : "FormaPagoController",
			controllerAs : "fp"
		})
    .state("iniciarSesion", {
			url : "/login",
			templateUrl : "app/iniciarSesion/IniciarSesion.html",
			controller : "IniciarSesionController",
			controllerAs : "login"
		})
      .state("crearCuenta", {
			url : "/crearCuenta",
			templateUrl : "app/crearCuenta/CrearCuenta.html",
			controller : "CrearCuentaController",
			controllerAs : "crearCta"
		})
     .state("carrito", {
			url : "/carrito",
			templateUrl : "app/carrito/carrito.html",
			controller : "CarritoController",
			controllerAs : "carrito"
		})
    	.state("perfil", {
			url : "/perfil",
			templateUrl : "app/perfil/PerfilTemplate.html",
			controller : "PerfilController",
			controllerAs : "prfl"
		});
	
	$urlRouterProvider.otherwise("/inicio"); 
	
});