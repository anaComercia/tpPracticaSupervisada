//Se declara el módulo productos
var productos = angular.module("backendEcommerceAdmin.productos");

//Se le setea un controller, todo lo que siga debajo solo aplican a los html de productos
//Todas las rutas llevan $state como dependencia y todos los services que van a usar para operar con la BD


productos.controller("ProductosController", function($state, ProductoService, CategoriaService, GeneroService,MpService){
	
	this.title = "Modulo de Productos";
	var self = this;
	this.productos = [];
	this.prod_desc = '';
	this.productoSeleccionado = null;
	this.activado = true;
    this.categorias = [];
    this.productosFiltrados = [];
    this.formLabel = "";
    this.prodSeleccionadoEditar = null;
    this.selectCategoria = '';
    this.indice ='';
    this.productoNuevo="";
    this.generos = [];
    this.generoSeleccionado = "";
    this.mps =[];
    this.cantidad = "";
    this.nombresMps = [];
    this.mpsAgregadas = [];
    this.seleccion = "";
    this.filtroProducto = [];
    
//Traer datos de Bd
    this.getProductosDetalles = function(){
    return ProductoService.getProductosDetalles().then(function(data){
            self.productos = data;
        self.productosFiltrados = self.productos;
        });
    };
    
    this.getCategorias = function(){
    return CategoriaService.getCategorias().then(function(data){
            self.categorias = data;
        });
    };
    
    this.getMps = function(){
    return MpService.getMps().then(function(data){
            self.mps = data;
         self.mps.forEach(function(elemento){
         self.nombresMps.push(elemento.titulo);
         });
        });
    };
    
     this.getGeneros = function(){
          return GeneroService.getGeneros().then(function(data){
            self.generos = data;
        });
    };
//Fin - Traer datos de Bd
    
//Borrar, insertar y actualizar BD
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
//Fin - Borrar, insertar y actualizar BD

    this.agregarMp = function(){
        var texto = jQuery('#buscarMp').val();
        self.mps.forEach(function(elemento){
            if(texto== elemento.titulo){
                if((jQuery.inArray(elemento, self.mpsAgregadas)) < 0){
                self.mpsAgregadas.push(elemento);
                jQuery('#buscarMp').val("")
                }
            }});
    }


    
//Filtros   
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
//Fin - Filtros
    
//Seleccionar objeto clickeado
     this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.productoSeleccionado = item;
        self.activado = false;
         if (self.formLabel == "Editar Producto")
         {
         self.prodSeleccionadoEditar = item;
         };
        
    };
      
     this.activeItemMp = function($index, item){
        self.selectedIndexMp = $index;
    };
//Fin - Seleccionar objeto clickeado
   
//Disparar cambio de rutas dentro de productos
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
    
    this.clearProd = function(){
    $state.go("productos");
        self.formLabel = "";
    };
//Fin - Disparar cambio de rutas dentro de productos
    
    this.update = function(){
    self.filtroProducto = [];
    }
    
//Mostrar imagen de formulario
    this.mostrarImagen = function()
    {
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
 
        if (/^image/.test( files[0].type)){ // only image file
            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file
 
            reader.onloadend = function(){ // set image data as background of div
                $("#imagePreview").css("background-image", "url("+this.result+")");
            }
        }
    };
//Fin - Mostrar imagen de formulario

this.substringMatcher = function(strs) {
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
 jQuery('#buscarMp').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'mps',
  source: self.substringMatcher(self.nombresMps)
});

}
    
//Traer todos los datos que necesito al mostrar el formulario por primera vez
    this.init = function(){
        this.getGeneros();
        this.getCategorias();
        this.getMps();
		this.getProductosDetalles();
	};
//Fin - Traer datos
    
    //Inicializar el formulario, esto es lo primero que se ejecuta siempre
    this.init();
    
});