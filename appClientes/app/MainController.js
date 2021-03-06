angular
    .module("backendEcommerceClientes")
    .controller("MainController", MainCtrl);


MainCtrl.$injector = ["$state","FooterService","$rootScope", "InicioService"];

function MainCtrl($state, FooterService, $rootScope, InicioService) {

//Siempre que se trabaje con angular en js se tiene que traer el modulo declarado en index.html ng-app
//var backendEcommerce = angular.module("backendEcommerceClientes");

//Así se agrega un controller, el controller se usa para trabajar con un html, en el caso del main controller aplica todos los html
//backendEcommerce.controller("MainController", function(){
	
	this.brand = "Usuario";
    vm = this;
    vm.nombresMps = [];
	vm.telefonos=[];
    vm.totalReservas = localStorage.contador == undefined ? 0 : JSON.parse(localStorage.contador);
    vm.mySelect = localStorage.buscador == undefined ?  new String() :  new String();
    vm.datosUsuario = null;
    
    $rootScope.$on('actualizarTotal', _actualizarTotal);
    
    function _actualizarTotal(event, newTotal){
        vm.totalReservas = newTotal;
    }
    
    jQuery("document").ready(function($){
    
        var nav = $('#mainMenu');

        $(window).scroll(function () {
            if ($(this).scrollTop() > 136) {
                nav.addClass("f-nav");
            } else {
                nav.removeClass("f-nav");
            }
        });

    });
    
     vm.mostrarTelefonos = function(){
             return FooterService.getTelefonos().then(function(data){
                if(data){
                    vm.telefonos = data;
                   
                }
            });
        };
    
    vm.buscarProducto= function(){
        if((typeof vm.mySelect != 'undefined') 
            && (typeof vm.mySelect.buscador != 'undefined')){
            
            localStorage.buscador = JSON.stringify(vm.mySelect.buscador);
            vm.mySelect = undefined;
             $rootScope.$emit('actualizarBuscador');
        }
    };
    
    
    vm.substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;
            matches = [];
            substrRegex = new RegExp(q, 'i');
            jQuery.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });
            cb(matches);
        };
    };
    
    this.iniciar = function(){
        jQuery('#idBuscador').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'mps',
            source: vm.substringMatcher(vm.nombresMps)
        });
    }

    
     
    vm.cerrarSesion = function(){
        return InicioService.cerrarSesion().then(function(data){
          vm.getLogin();
          $state.go("inicio");   
        });
    }
    
    
    vm.getLogin = function(){
        debugger;
      return InicioService.getLogin().then(function(data){
          debugger;
            if(data){    
               vm.datosUsuario = data;
            }else{
            vm.datosUsuario = null;
            }
        });
    }
    
    vm.init = function(){
        vm.mostrarTelefonos();
        vm.getLogin();
 	};
    
    vm.init();
    
    
};