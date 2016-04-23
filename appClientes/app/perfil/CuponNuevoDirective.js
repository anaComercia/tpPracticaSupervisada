angular
    .module("backendEcommerceClientes.perfil")
    .directive("cuponNuevoDirective", CuponNuevoDirective);

function CuponNuevoDirective() {
    
    return {
        restrict: "E",
        replace: true,
        templateUrl:'app/perfil/CuponNuevoDirective.html',
        scope: { cuponNuevo: '=cuponData' }, //product-data="cupon"
        controller: function($scope, $element, $attrs) {
            //$scope.verDetalle = verDetalle;            
        }       
    }    
}