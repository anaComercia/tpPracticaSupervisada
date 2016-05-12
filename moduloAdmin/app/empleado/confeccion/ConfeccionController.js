var confeccion = angular.module("backendEcommerceEmp.confeccion");

confeccion.controller("ConfeccionController", function($state, RecetaService){
	
	this.title = "Modulo de Confeccion";
	var self = this;
    this.seleccion = '';
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.confeccionar = false;
    this.prodSeleccionado = null;
    this.recetas = [];
    this.recetasProductos = [];
    this.receta = [];
    this.cantidad = 1;
    
     this.getRecetas = function(){
    return RecetaService.getRecetas().then(function(data){
            self.recetas = data;
        });
    };
    
    this.getRecetasSoloProductos = function(){
    return RecetaService.getRecetasSoloProductos().then(function(data){
            self.recetasProductos = data;
        });
    };
    
     this.getReceta = function(id){
    return RecetaService.getReceta(id).then(function(data){
            if(data.length > 0){
            self.receta = data;
            }
        });
    };
    
    this.traerConfeccion = function(){
    self.getReceta(self.prodSeleccionado.idReceta);
    }
    
    this.ordenarConfeccion = function(){
    var sePuede = true;
        self.receta.forEach(function(elemento){
        if(elemento.stock*self.cantidad > elemento.stock){
            alert("No hay stock suficiente de: " + elemento.titulo);
        sePuede = false;    
        }
            if(sePuede){
            elemento.stock = elemento.stock - (elemento.stock*self.cantidad);
            }
        });
    if(sePuede){
    var num = parseInt(self.prodSeleccionado.cantidad);
    self.prodSeleccionado.cantidad = (num + self.cantidad);
    }
    }
    
    this.agregarParametro = function(){
     var texto = jQuery('#cbParametro').val();
    if(self.parametrosBusqueda.indexOf(texto) == -1){
     self.parametrosBusqueda.push(texto);
    }}
        
    this.quitarParametro = function(index){
     self.parametrosBusqueda.splice(index,1);
    }
    
     this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.prodSeleccionado = item;
        self.traerConfeccion();
     };
    
    this.update = function(){
    self.filtroStock = [];
    }
    
    this.init = function(){
        this.getRecetas();
        this.getRecetasSoloProductos();
	};
    
    
    
    this.init();
   
});