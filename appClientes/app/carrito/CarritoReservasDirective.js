angular
    .module("backendEcommerceClientes.carrito")
    .directive("carritoReservasDirective", CarritoReservasDirective);

function CarritoReservasDirective() {
    
    return {
        restrict: "E",
        replace: true,
        templateUrl:'app/carrito/CarritoReservasDirective.html',
        scope: { product: '=productData' }, //product-data="cupon"
        controller: function($scope, $element, $attrs) {
            //$scope.verDetalle = verDetalle;            
        }       
    }    
}