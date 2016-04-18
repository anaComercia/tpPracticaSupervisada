//acá se agregan las dependencias entre [], las dependencias son cada uno de los módulos que se declaran en sus respectivos nombre.js
//Agrego todos los modulos que voy a usar despues, lo agrego porque estoy en el principal, agrego los hijos
var backendEcommerce = angular.module("backendEcommerceClientes", [
	"backendEcommerceClientes.inicio",
	"backendEcommerceClientes.producto",
    "backendEcommerceClientes.contacto",
    "backendEcommerceClientes.formaPago",
    "backendEcommerceClientes.carrito",
    "backendEcommerceClientes.crearCuenta",
    "backendEcommerceClientes.formaPago",
    "backendEcommerceClientes.iniciarSesion",
    "backendEcommerceClientes.perfil",
	//"backendEcommerceClientes.modificarCuenta",
    //"backendEcommerceClientes.recordarContrasenia",
    "ui.router"
    
    /*2016/04/11 acastillo*/
    
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
			templateUrl : "app/productos/ProductosIndex.html",
			controller : "ProductosListController",
			controllerAs : "prod"
		})
    .state("productosDetail", {
			url : "/productosDetail",
            params: {
                prodId: null
            },
			templateUrl : "app/productos/ProductosDetail.html",
			controller : "ProductosDetailController",
			controllerAs : "prodDetail"
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
			templateUrl : "app/iniciarSesion/IniciarSesionTemplate.html",
			controller : "IniciarSesionController",
			controllerAs : "login"
		})
      .state("crearCuenta", {
			url : "/crearCuenta",
			templateUrl : "app/crearCuenta/CrearCuentaTemplate.html",
			controller : "CrearCuentaController",
			controllerAs : "crearCta"
		})
     .state("carrito", {
			url : "/carrito",
			templateUrl : "app/carrito/CarritoTemplate.html",
			controller : "CarritoController",
			controllerAs : "carrito"
		})
    	.state("perfil", {
			url : "/perfil",
			templateUrl : "app/perfil/PerfilTemplate.html",
			controller : "PerfilController",
			controllerAs : "prfl"
		})
        .state("detalleCuenta", {
			url : "/detalleCuenta",
			templateUrl : "app/perfil/PerfilDetalleCuenta.html",
			controller : "PerfilController",
			controllerAs : "detalleCta"
		})
    
    //2016/04/11 acastillo*/
        .state("modificarCuenta", {
			url : "/modificarCuenta",
			templateUrl : "app/perfil/PerfilModificarCuenta.html",
			controller : "PerfilController",
			controllerAs : "modificarCta"
		})
        .state("recordarContrasenia", {
			url : "/recordarContrasenia",
			templateUrl : "app/iniciarSesion/RecordarContrasenia.html",
			controller : "IniciarSesionController",
			controllerAs : "recordarContraseniaCta"
		});
	$urlRouterProvider.otherwise("/inicio"); 
	
});