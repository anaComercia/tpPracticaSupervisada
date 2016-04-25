//Se declara el modulo productos, si el módulo es una ruta (declarado en app.js), se tiene que incluir como dependencia a ui.router
var productos = angular.module("backendEcommerceAdmin.productos", [
"ui.router"
]);

productos.config(function($stateProvider){
//Acá se declaran más rutas, tal cual se hizo en app.js. La diferencia es que estas rutas solo aplican dentro de productos.
	$stateProvider
		.state("productos.nuevo",{
			url : "/nuevo",
			templateUrl : "app/admin/productos/ProductosFormTemplate.html"
		})
		.state("productos.editar",{
			url : "/editar/:id",
			templateUrl : "app/admin/productos/ProductosFormTemplateEdit.html"
		});
});