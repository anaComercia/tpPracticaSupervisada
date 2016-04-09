var usuarios = angular.module("backendEcommerce.usuarios");

usuarios.controller("UsuariosController", function($state, ProductoService, CategoriaService){
	
	this.title = "Modulo de Usuarios";
	var self = this;
	this.productos = [];
    this.editOn = false;
	this.prod_desc = '';
	this.productoSeleccionada = null;
	this.activado = true;
    this.categorias = [];
    
    this.getProductos = function(){
    return ProductoService.getProductos().then(function(data){
            self.productos = data;
        });
    };
    
    this.getCategorias = function(){
    return CategoriaService.getCategorias().then(function(data){
            self.categorias = data;
        });
    };
    
     this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.productoSeleccionada = item;
        self.activado = false; 
        self.cat_desc = self.productoSeleccionada.producto_desc;
    };
    
    this.getProductos();
    this.getCategorias();
});