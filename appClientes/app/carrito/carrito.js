var carrito = angular.module("backendEcommerceClientes.carrito", [
	"ui.router"
]);

carrito.config(function($stateProvider){
    $stateProvider
        .state("carrito.reservas", {
			url : "/reservas",
			templateUrl : "app/carrito/CarritoReservas.html"

		})
       .state("carrito.compras", {
			url : "/compras",
			templateUrl : "app/carrito/CarritoCompras.html",
            controller : "ComprasController",
			controllerAs : "comprasCtrl"
		})
        .state("carrito.pagarCompra", {
			url : "/pagar",
			templateUrl : "app/carrito/PagarCompra1.html",
            controller : "PagarCompraController",
            controllerAs : "pagarCtrl"
		});

});
    