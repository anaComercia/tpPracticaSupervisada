var alerta = angular.module("backendEcommerceEmp.alertas", [
"ui.router"
]);

alerta.config(function($stateProvider){
$stateProvider
		.state("alertas.mp",{
			url : "/mp",
			templateUrl : "app/empleado/alertas/AlertasMpTemplate.html"
		})
	
});