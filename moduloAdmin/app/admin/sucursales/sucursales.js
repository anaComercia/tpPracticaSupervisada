var sucursales = angular.module("backendEcommerceAdmin.sucursales", [
"ui.router"
]);


sucursales.config(function($stateProvider){
//Acá se declaran más rutas, tal cual se hizo en app.js. La diferencia es que estas rutas solo aplican dentro de productos.
	$stateProvider
		.state("sucursales.nueva",{
			url : "/nueva",
			templateUrl : "app/admin/sucursales/SucursalesFormTemplate.html"
		})
		.state("sucursales.editar",{
			url : "/editar/:id",
			templateUrl : "app/admin/sucursales/SucursalesFormTemplateEditar.html"
		});
});
