angular
    .module("backendEcommerceClientes.perfil")
    .directive("cuponUsadoDirective", CuponUsadoDirective);

function CuponUsadoDirective() {
    
    return {
        restrict: "E",
        replace: true,
        templateUrl:'app/perfil/CuponUsadoDirective.html',
        scope: { product: '=productData' }, //product-data="cupon"
        controller: function($scope, $element, $attrs) {
            //$scope.verDetalle = verDetalle;            
        }       
    }    
}