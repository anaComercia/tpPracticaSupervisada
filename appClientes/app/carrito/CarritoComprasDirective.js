angular
    .module("backendEcommerceClientes.carrito")
    .directive("carritoComprasDirective", CarritoComprasDirective);

function CarritoComprasDirective() {
    
    return {
        restrict: "E",
        replace: true,
        templateUrl:'app/carrito/CarritoComprasDirective.html',
        scope: { buyData: '=buyData' }, //product-data="cupon"
        controller: function($scope, $element, $attrs) {
            //$scope.verDetalle = verDetalle;            
        }       
    }    
}