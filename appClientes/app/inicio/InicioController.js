angular
    .module("backendEcommerceClientes.inicio")
    .controller("InicioController", InicioCtrl);

InicioCtrl.$injector = ["$state","InicioService"];

function InicioCtrl($state, InicioService) {
    var vm = this;
    vm.productId= 0;
    vm.telefonos=[];
    
       vm.productList = [
        {
            id: 1,
            title: 'Campera Milano',
            price: 600,
            gender: 'Mujer',
            size: ['1','2'],
            color: ['Azul', 'Rosa', 'Blanca'],
            stock: 3,
            image: ['img/modulos/prueba1.jpg',
            'img/modulos/prueba2.jpg',
            'img/modulos/prueba3.jpg',
            'img/modulos/prueba4.jpg']
        },
        {
            id: 2,
            title: 'Jean Chupin',
            price: 800,
            gender: 'Hombre',
             size: ['1','2'],
            color: ['Azul', 'Rosa', 'Blanca'],
            stock: 3,
            image: ['img/modulos/prueba2.jpg',
            'img/modulos/prueba2.jpg',
            'img/modulos/prueba3.jpg',
            'img/modulos/prueba4.jpg']
        },
        {
            id: 3,
            title: 'Remera Hawai',
            price: 250,
            gender: 'Mujer',
             size: ['1','2'],
            color: ['Azul', 'Rosa', 'Blanca'],
            stock: 3,
            image: ['img/modulos/prueba3.jpg',
            'img/modulos/prueba2.jpg',
            'img/modulos/prueba3.jpg',
            'img/modulos/prueba4.jpg']
        },
        {
            id: 4,
            title: 'Remera NY',
            price: 250,
            gender: 'Hombre',
             size: ['1','2'],
            color: ['Azul', 'Rosa', 'Blanca'],
            stock: 3,
            image: ['img/modulos/prueba1.jpg',
            'img/modulos/prueba2.jpg',
            'img/modulos/prueba3.jpg',
            'img/modulos/prueba4.jpg']
        },
        {
            id: 5,
            title: 'Remera Roxana',
            price: 250,
            gender: 'Mujer',
             size: ['1','2'],
            color: ['Azul', 'Rosa', 'Blanca'],
            stock: 3,
            image: ['img/modulos/prueba4.jpg',
            'img/modulos/prueba2.jpg',
            'img/modulos/prueba3.jpg',
            'img/modulos/prueba4.jpg']
        },
        {
            id: 6,
            title: 'Camisa Polly',
            price: 400,
            gender: 'Mujer',
             size: ['1','2'],
            color: ['Azul', 'Rosa', 'Blanca'],
            stock: 3,
            image: ['img/modulos/prueba2.jpg',
            'img/modulos/prueba2.jpg',
            'img/modulos/prueba3.jpg',
            'img/modulos/prueba4.jpg']
        }];
    
    /*  vm.mostrarTelfonos = function(){
        return InicioService.getTelefonos().then(function(data){
            if(data){
                debugger;
            self.telefonos = data;
                debugger;
            }
        });
    };
    
    vm.init = function(){
        debugger;
        vm.mostrarTelfonos();
        
	};
    
    vm.init();*/
};