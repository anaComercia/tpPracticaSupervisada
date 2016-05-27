var talles = angular.module("backendEcommerceAdmin.productos");

talles.controller("TallesController", function($state, TalleService, GeneroService){
	
	this.title = "Modulo de Talles";
	var self = this;
	this.talles = [];
	this.talleSeleccionado = null;
	this.activado = true;
    this.generos = [];
    this.formLabel = "";
    
    this.getTalles = function(){
    return TalleService.getTalles().then(function(data){
            self.talles = data;
            self.talles.forEach(function(elemento){
            elemento.genero = self.generoPorId(elemento.idGenero);
            });
        });
    };
    
    this.getGeneros = function(){
    return GeneroService.getGeneros().then(function(data){
            self.generos = data;
        });
    };
    
     this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.talleSeleccionado = item;
        self.activado = false;
         if (self.formLabel == "Editar Talle")
         {
         self.prodSeleccionadoEditar = item;
         };
        
    };
    
    this.generoPorId = function(genId)
    {
        var genero = "";
        self.generos.forEach(function(elemento){
        if (elemento.idGenero == genId)
        {genero = elemento.descripcion;};
        });
        return genero;
    }
    
    this.filtrarProductos = function(catId){
        if (catId == "indice"){
        self.productosFiltrados = self.productos.filter(function(elemento){
        if (elemento.categoria_id == self.indice)
        {return elemento;};
        });};
        if (catId == "all")
        {self.productosFiltrados = self.productos;
        self.indice = '';};
    };
    
    this.deleteProducto= function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        ProductoService.deleteProducto(self.productoSeleccionado.producto_id).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            alert("Producto eliminado");
            self.productoSeleccionado = null;
            self.getProductos();
            self.activeItem(-1, null);
			$state.go("productos");
            self.activado = true;
            })
        } 
    };
    
    this.editarProducto = function(){
		self.formLabel = "Editar Producto";
        self.prodSeleccionadoEditar = self.productoSeleccionado;
		$state.go("productos.editar",  { id : self.productoSeleccionado.producto_id});
    };
   
    this.nuevoProducto = function(){
    self.formLabel = "Nuevo Producto";
    self.prodSeleccionadoEditar = null;
    self.prodSeleccionadoEditar = {};
    self.prodSeleccionadoEditar.categoria_id = self.categorias[0].categoria_id;
    $state.go("productos.nuevo");
    };
    
     this.updateProducto = function(){
        ProductoService.updateProducto(self.prodSeleccionadoEditar.producto_id,     self.prodSeleccionadoEditar.producto_desc,self.prodSeleccionadoEditar.producto_precio,self.prodSeleccionadoEditar.categoria_id).then(function(response){
            if(response.data.error)
            {
                alert("Ocurrio un error");
                return;
            }
            alert("Producto actualizado");
            self.getProductos();
			self.activeItem(-1, null);
			$state.go("productos");
            self.activado = true;
        })
    };
    
    this.clearProd = function(){
    $state.go("productos");
    };
    
    this.createProducto = function(){
 ProductoService.createProducto(self.prodSeleccionadoEditar.producto_desc,self.prodSeleccionadoEditar.producto_precio,self.prodSeleccionadoEditar.categoria_id).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            alert("Producto creada con el id: " + response.data.data.producto_id);
            self.getProductos();
            self.prodSeleccionadoEditar = null;
            $state.go("productos");
        })
    };
    
    
    this.init = function(){
        this.getGeneros();
		this.getTalles();
	};
    
    this.init();
    
});