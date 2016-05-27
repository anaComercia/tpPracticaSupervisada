var cupones = angular.module("backendEcommerceAdmin.cupones", [
"ui.router"
]);

cupones.config(function($stateProvider){

    $stateProvider
		.state("cupones.nuevo",{
			url : "/nuevo",
			templateUrl : "app/admin/cupones/CuponesNuevo.html"
		})
		.state("cupones.editar",{
			url : "/editar/:id",
			templateUrl : "app/admin/cupones/CuponesEditar.html"
		});
    
});