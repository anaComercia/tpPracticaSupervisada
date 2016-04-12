angular
    .module("backendEcommerceClientes.producto")
    .directive("productoDirective", ProductoDirective);

function ProductoDirective() {
    //debugger;
    return {
        restrict: "E",
        replace: true,
        templateUrl:'../appClientes/app/productos/InitProductTemplate.html',
        controller: function($scope, $element, $attrs) {
       // debugger;
        }       
    }    
}