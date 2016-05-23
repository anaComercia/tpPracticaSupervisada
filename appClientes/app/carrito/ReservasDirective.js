angular
    .module("backendEcommerceClientes.carrito")
    .directive("reservasDirective", ReservasDirective);

function ReservasDirective() {
    
    return {
        restrict: "E",
        replace: true,
        templateUrl:'app/carrito/ReservasDirective.html',
        scope: { buyData: '=buyData',
                reservaItem: '&onClickDetail'}, //product-data="cupon"
        link: function($scope, $element, $attrs) {
            //$scope.verDetalle = verDetalle;  
        }       
    }    
}