angular
    .module("backendEcommerceClientes.carrito")
    .directive("carritoComprasDirective", CarritoComprasDirective);

function CarritoComprasDirective() {
    
    return {
        restrict: "E",
        replace: true,
        templateUrl:'app/carrito/CarritoComprasDirective.html',
        scope: { product: '=productData' }, //product-data="cupon"
        controller: function($scope, $element, $attrs) {
            //$scope.verDetalle = verDetalle;            
        }       
    }    
}