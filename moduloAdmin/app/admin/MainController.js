//Siempre que se trabaje con angular en js se tiene que traer el modulo declarado en index.html ng-app
var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

//Así se agrega un controller, el controller se usa para trabajar con un html, en el caso del main controller aplica todos los html
backendEcommerceAdmin.controller("MainController", function(){
	
	this.brand = "Administrador";
	this.user = "administrador001";
});