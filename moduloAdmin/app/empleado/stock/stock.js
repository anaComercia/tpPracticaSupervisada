var stock = angular.module("backendEcommerceEmp.stock", [
"ui.router"
]);

stock.config(function($stateProvider){
$stateProvider
		.state("stock.mp",{
			url : "/mp",
			templateUrl : "app/empleado/stock/StockMpTemplate.html"
		})

});