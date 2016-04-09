//Se declara el modulo productos, si el módulo es una ruta (declarado en app.js), se tiene que incluir como dependencia a ui.router
var productos = angular.module("backendEcommerce.productos", [ //Traigo el objeto prosuctos
"ui.router" //Totas las rutas deben agregar esto como una dependencia
]);

productos.config(function($stateProvider){ //Declara mas rutas, son rutas hijas 
//Acá se declaran más rutas, tal cual se hizo en app.js. La diferencia es que estas rutas solo aplican dentro de productos.
	$stateProvider
		.state("productos.nuevo",{
			url : "/nuevo",
			templateUrl : "app/productos/ProductosFormTemplate.html"
		})
		.state("productos.editar",{
			url : "/editar/:id",//id, es el id del producto

			templateUrl : "app/productos/ProductosFormTemplate.html"
		});
});