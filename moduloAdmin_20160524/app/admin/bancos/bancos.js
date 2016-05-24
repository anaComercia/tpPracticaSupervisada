var bancos = angular.module("backendEcommerceAdmin.bancos", [
"ui.router"
]);

bancos.config(function($stateProvider){
$stateProvider
    .state("bancos.tarjetas",{
			url : "/tarjetas",
			templateUrl : "app/admin/bancos/TarjetasFormTemplate.html"
		});
});