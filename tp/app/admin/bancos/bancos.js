var bancos = angular.module("backendEcommerceAdmin.bancos", [
"ui.router"
]);

bancos.config(function($stateProvider){
$stateProvider
    .state("bancos.tarjetas",{
			url : "/tarjetas",
			templateUrl : "app/admin/bancos/TarjetasFormTemplate.html"
		})
    .state("bancos.nuevo",{
			url : "/nuevo",
			templateUrl : "app/admin/bancos/BancoNuevoTemplate.html"
		})
    .state("bancos.editar",{
			url : "/editar",
			templateUrl : "app/admin/bancos/BancoEditarTemplate.html"
		})
    .state("bancos.tarjetas.nuevo",{
			url : "/nuevo",
			templateUrl : "app/admin/bancos/TarjetaNuevaTemplate.html"
		})
    .state("bancos.tarjetas.editar",{
			url : "/editar",
			templateUrl : "app/admin/bancos/TarjetaEditarTemplate.html"
		});
});