//acá se agregan las dependencias entre [], las dependencias son cada uno de los módulos que se declaran en sus respectivos nombre.js
var backendEcommerceAdmin = angular.module("backendEcommerceAdmin", [
	"backendEcommerceAdmin.categorias",
	"backendEcommerceAdmin.productos",
    "backendEcommerceAdmin.mp",
    "backendEcommerceAdmin.usuarios",
    "backendEcommerceAdmin.imagenes",
    "backendEcommerceAdmin.envios",
    "backendEcommerceAdmin.sucursales",
    "backendEcommerceAdmin.cupones",
    "backendEcommerceAdmin.admGeneral",
    "backendEcommerceAdmin.bancos",
    "backendEcommerceAdmin.provincias",
    "backendEcommerceAdmin.colores",
	"ui.router",
    "ngFileUpload"
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
        .state("colores", {
			url : "/colores",
			templateUrl : "app/admin/colores/ColoresTemplate.html",
			controller : "ColoresController",
			controllerAs : "col"
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
        .state("imagenes", {
			url : "/imagenes",
			templateUrl : "app/admin/imagenes/ImagenesTemplate.html",
			controller : "ImagenesController",
			controllerAs : "img"
		})
     .state("cupones", {
			url : "/cupones",
			templateUrl : "app/admin/cupones/CuponesTemplate.html",
			controller : "CuponesController",
			controllerAs : "cup"
		})
     .state("envios", {
			url : "/envios",
			templateUrl : "app/admin/envios/EnviosTemplate.html",
			controller : "EnviosController",
			controllerAs : "env"
		})
     .state("sucursales", {
			url : "/sucursales",
			templateUrl : "app/admin/sucursales/SucursalesTemplate.html",
			controller : "SucursalesController",
			controllerAs : "suc"
		})
    .state("admGeneral", {
			url : "/admGeneral",
			templateUrl : "app/admin/admGeneral/AdmGeneralTemplate.html",
			controller : "AdmGeneralController",
			controllerAs : "adm"
		})
      .state("bancos", {
			url : "/bancos",
			templateUrl : "app/admin/bancos/BancosTemplate.html",
			controller : "BancosController",
			controllerAs : "bank"
		})
      .state("provincias", {
			url : "/provincias",
			templateUrl : "app/admin/provincias/ProvinciasTemplate.html",
			controller : "ProvinciasController",
			controllerAs : "prov"
		});
	
	$urlRouterProvider.otherwise("/admGeneral");
	
});