angular
    .module("backendEcommerceClientes.producto")
    .directive("productoDirective", ProductoDirective);

function ProductoDirective() {
    debugger;
    return {
        restrict: "E",
        templateUrl:'../appClientes/app/productos/InitProductTemplate.html',
        controller: function($scope, $element, $attrs) {
        debugger;
        },
        link: function($element, $scope, $attrs) {
            
        }        
    }    
}