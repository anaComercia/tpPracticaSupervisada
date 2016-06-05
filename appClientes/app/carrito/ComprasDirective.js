angular
    .module("backendEcommerceClientes.carrito")
    .directive("comprasDirective", ComprasDirective);

function ComprasDirective() {
    
    return {
        restrict: "E",
        //replace: true,
        templateUrl:'app/carrito/ComprasDirective.html',
        scope: { buyData: '=buyData',
                 openDetail: '&onClickDetail'
               }, //product-data="cupon"
        controller: function($scope, $element, $attrs) {
            //$scope.verDetalle = verDetalle;
debugger;
           $scope.buyData.formaPago = $scope.buyData.formaPago == 'E'? 'EFECTIVO' : 'TARJETA';

        }       
    }    
}