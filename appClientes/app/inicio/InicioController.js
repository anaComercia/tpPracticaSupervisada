var inicio = angular.module("backendEcommerceClientes.inicio");

inicio.controller("InicioController", function($state){
    var vm = this;
    
    
    vm.products = [
        {
            title: 'Campera',
            price: '$600',
            image: 'img/modulos/prueba1.jpg'
        },
        {
            title: 'Jean',
            price: '$800',
            image: 'img/modulos/prueba1.jpg'
        },
        {
            title: 'Remera',
            price: '$250',
            image: 'img/modulos/prueba1.jpg'
        },
          {
            title: 'Remera',
            price: '$250',
            image: 'img/modulos/prueba1.jpg'
        },
        {
            title: 'Remera',
            price: '$250',
            image: 'img/modulos/prueba1.jpg'
        },
        {
            title: 'Camisa',
            price: '$400',
            image: 'img/modulos/prueba1.jpg'
        }];
    

    
});