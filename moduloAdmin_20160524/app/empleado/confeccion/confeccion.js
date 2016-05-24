var confeccion = angular.module("backendEcommerceEmp.confeccion", [
"ui.router"
]);

confeccion.config(function($stateProvider){
$stateProvider
		.state("confeccion.nueva",{
			url : "/nueva",
			templateUrl : "app/empleado/stock/ConfeccionFormTemplate.html"
		})

});