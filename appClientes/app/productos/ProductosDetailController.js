angular
    .module("backendEcommerceClientes.producto")
    .controller("ProductosDetailController", ProductosCtrl);

ProductosCtrl.$injector = ["$state"];

function ProductosCtrl($state) {
    vm = this;
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

    //vm.roductID= $state.params.prodId; //param para el productosDetail.html
    vm.prod = getProductDetail($state.params.prodId);
   
    vm.precioXcuota = vm.prod.price / 3;
    vm.mySelect = {};//seleccion de los combos
    
    vm.source = vm.prod.image[0];
    vm.changeImage = _changeImage;
    
        
    function _changeImage($event){
        vm.source = $event.target.src;
    }

    function getProductDetail(id) {
         for (index = 0; index <  vm.productList.length; ++index) {
             if(vm.productList[index].id == id){
                 return vm.productList[index];
             }
         }
       
    } 
    
}