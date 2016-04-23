angular
    .module("backendEcommerceClientes.carrito")
    .directive("carritoReservasDirective", CarritoReservasDirective);

function CarritoReservasDirective() {
    
    return {
        restrict: "E",
        replace: true,
        templateUrl:'app/carrito/CarritoReservasDirective.html',
        scope: { buyData: '=buyData' }, //product-data="cupon"
        link: function($scope, $element, $attrs) {
            //$scope.verDetalle = verDetalle;  
            $scope.buyData.subTotal = $scope.buyData.unitPrice * $scope.buyData.quantity;
        }       
    }    
}