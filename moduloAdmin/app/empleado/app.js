//acá se agregan las dependencias entre [], las dependencias son cada uno de los módulos que se declaran en sus respectivos nombre.js
var backendEcommerceEmp = angular.module("backendEcommerceEmp", [
	"backendEcommerceEmp.alertas",
	"backendEcommerceEmp.clientes",
    "backendEcommerceEmp.pedidos",
    "backendEcommerceEmp.ventas",
    "backendEcommerceEmp.perfilEmp",
    "backendEcommerceEmp.stock",
	"ui.router"
]);

backendEcommerceEmp.config(function($stateProvider, $urlRouterProvider){
//Aquí se declaran todas las rutas (estados) que va a utilizar la página
//Cada ruta debe declarar una url, el html que se va a mostrar, el controller a usar y con que alias se va a llamar a dicho controller
	$stateProvider
    .state("stock", {
			url : "/stock",
			templateUrl : "app/empleado/stock/StockTemplate.html",
			controller : "StockController",
			controllerAs : "stock"
		})
		.state("alertas", {
			url : "/alertas",
			templateUrl : "app/empleado/alertas/AlertasTemplate.html",
			controller : "AlertasController",
			controllerAs : "ale"
		})
		.state("clientes", {
			url : "/clientes",
			templateUrl : "app/empleado/cliente/ClientesTemplate.html",
			controller : "ClientesController",
			controllerAs : "cli"
		})
       .state("pedidos", {
			url : "/pedidos",
			templateUrl : "app/empleado/pedidos/PedidosTemplate.html",
			controller : "PedidosController",
			controllerAs : "ped"
		})
		.state("ventas", {
			url : "/ventas",
			templateUrl : "app/empleado/ventas/VentasTemplate.html",
			controller : "VentasController",
			controllerAs : "ven"
		})
    	.state("perfilEmp", {
			url : "/perfilEmp",
			templateUrl : "app/empleado/perfil/PerfilEmpTemplate.html",
			controller : "PerfilEmpController",
			controllerAs : "pfEmp"
		});
	
	$urlRouterProvider.otherwise("/perfilEmp");
	
});