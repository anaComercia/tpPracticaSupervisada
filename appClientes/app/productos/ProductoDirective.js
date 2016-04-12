angular
    .module("backendEcommerceClientes.producto")
    .directive("productoDirective", ProductoDirective);

function ProductoDirective() {
    
    return {
        restrict: "E",
        replace: true,
        templateUrl:'../appClientes/app/productos/InitProductTemplate.html',
        scope: { product: '=productData' },
        controller: function($scope, $element, $attrs) {
        debugger;
            $scope.product;
        }       
    }    
}