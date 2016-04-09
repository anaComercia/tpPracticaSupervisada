//Siempre que se trabaje con angular en js se tiene que traer el modulo declarado en index.html ng-app
var backendEcommerce = angular.module("backendEcommerceClientes");

//Así se agrega un controller, el controller se usa para trabajar con un html, en el caso del main controller aplica todos los html
backendEcommerce.controller("MainController", function(){
	
	this.brand = "Usuario";
	
});