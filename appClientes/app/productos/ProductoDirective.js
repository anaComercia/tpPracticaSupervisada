angular
    .module("backendEcommerceClientes.producto")
    .directive("productoDirective", ProductoDirective);

function ProductoDirective() {
    
    return {
        restrict: "E",
        replace: true,
        templateUrl:'app/productos/ProductoDirective.html',
        scope: { product: '=productData' }, //product-data="product"
        controller: function($scope, $element, $attrs) {
            //$scope.verDetalle = verDetalle;            
        }       
    }    
}