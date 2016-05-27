//Se declara el módulo productos
var productos = angular.module("backendEcommerceAdmin.productos");

//Se le setea un controller, todo lo que siga debajo solo aplican a los html de productos
//Todas las rutas llevan $state como dependencia y todos los services que van a usar para operar con la BD


productos.controller("ProductosController", function($state, ProductoService, CategoriaService, GeneroService,MpService, ColorService, TalleService,$scope, $http){
	
	this.title = "Modulo de Productos";
	var self = this;
	this.productos = [];
    this.productosFiltrados = [];
    this.categorias = [];
    this.mps =[];
    this.generos = [];
    this.formLabel = "Nuevo Producto";
    this.productoSeleccionado = null;
    this.productoSeleccionadoEditar = null;
    this.selectCategoria = '';
    this.indice ='';
    this.productoNuevo="";
    this.generoSeleccionado = "";
    this.cantidad = "";
    this.nombresMps = [];
    this.mpsAgregadas = [];
    this.tallesAgregados = [];
    this.coloresAgregados = [];
    this.seleccion = "";
    this.filtroProducto = [];
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.talles = null;
    this.colores = null;
    this.talleElegido = null;
    this.colorElegido = null;
    
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
             if(self.nombresMps.indexOf(elemento.titulo) == -1){
         self.nombresMps.push(elemento.titulo);
             }
         });
        });
    };
    
     this.getGeneros = function(){
          return GeneroService.getGeneros().then(function(data){
            self.generos = data;
        });
    };
    
    this.getTalles = function(){
        return TalleService.getTalles().then(function(data){
            self.talles = data;
        });
    };
    
      this.getColores = function(){
          return ColorService.getColores().then(function(data){
            self.colores = data;
        });
    };
    
       this.getPresentacionTalle = function(id){
          return ProductoService.getPresentacionTalle(id).then(function(data){
            self.tallesAgregados = data;
        });
    };
    
      this.getPresentacionColor = function(id){
          return ProductoService.getPresentacionColor(id).then(function(data){
            self.coloresAgregados = data;
        });
    };
    
          this.getProdMp = function(id){
          return ProductoService.getProdMp(id).then(function(data){
            self.mpsAgregadas = data;
        });
    };
//Fin - Traer datos de Bd
    
//Borrar, insertar y actualizar BD
    this.deleteProducto= function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        ProductoService.deleteProducto(self.productoSeleccionado.idProducto).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            self.productoSeleccionado = null;
            self.getProductosDetalles();
            self.activeItem(-1, null);
			$state.go("productos");
            })
        } 
    };
    
     this.updateProducto = function(){
        ProductoService.updateProducto(self.productoSeleccionadoEditar.idProducto, self.productoSeleccionadoEditar.idCategoria, self.productoSeleccionadoEditar.idGenero, self.productoSeleccionadoEditar.titulo,self.productoSeleccionadoEditar.descripcion, self.productoSeleccionadoEditar.precio, self.productoSeleccionadoEditar.puntoReposicion,self.mpsAgregadas, self.tallesAgregados, self.coloresAgregados,self.productoSeleccionadoEditar.picFile1, self.productoSeleccionadoEditar.picFile2, self.productoSeleccionadoEditar.picFile3, self.productoSeleccionadoEditar.picFile4).then(function(response){
            if(response.data.error)
            {
                alert("Ocurrio un error");
                return;
            }
            self.coloresAgregados = [];
            self.tallesAgregados = [];
            self.mpsAgregadas = [];
            self.productoSeleccionadoEditar = null;
            self.init();
			self.activeItem(-1, null);
			$state.go("productos");
        })
    };
     
    this.createProducto = function(){
 ProductoService.createProducto(self.productoNuevo.titulo,self.productoNuevo.descripcion,self.productoNuevo.idGenero, self.productoNuevo.idCategoria, self.productoNuevo.precio, self.productoNuevo.puntoReposicion, self.mpsAgregadas, self.tallesAgregados, self.coloresAgregados, self.productoNuevo.picFile1, self.productoNuevo.picFile2, self.productoNuevo.picFile3, self.productoNuevo.picFile4).then(function(response){
            if(response.data.error){
                alert("Ha ocurrido un error");
                return;
            }
            self.coloresAgregados = [];
            self.tallesAgregados = [];
            self.mpsAgregadas = [];
            self.productoNuevo = null;
            self.init();
            self.activeItem(-1, null);
            $state.go("productos");
        })
    };
//Fin - Borrar, insertar y actualizar BD

    this.agregarMp = function(){
        var texto = jQuery('#buscarMp').val();
        self.mps.forEach(function(elemento){
            if(texto.toUpperCase()== elemento.titulo.toUpperCase()){
                if((jQuery.inArray(elemento, self.mpsAgregadas)) < 0){
                self.mpsAgregadas.push(elemento);
                jQuery('#buscarMp').val("")
                }
            }});
    }

 this.quitarMp = function(index){
     self.mpsAgregadas.splice(index,1);
    }
    
 this.agregarTalle = function(){
    self.talles.forEach(function(elemento){
    if(elemento.idTalle == self.talleElegido && self.tallesAgregados.indexOf(elemento) == -1){
        self.tallesAgregados.push(elemento);
        }
    });
 }
 
  this.quitarTalle = function(index){
     self.tallesAgregados.splice(index,1);
    }
 
  this.agregarColor = function(){
    var colorElect;
    self.colores.forEach(function(elemento){
    if(elemento.idColor == self.colorElegido && self.coloresAgregados.indexOf(elemento) == -1){
        self.coloresAgregados.push(elemento);
        }
    });
 }
  
   this.quitarColor = function(index){
     self.coloresAgregados.splice(index,1);
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
        
    };
      
     this.activeItemMp = function($index, item){
        self.selectedIndexMp = $index;
    };
//Fin - Seleccionar objeto clickeado
   
//Disparar cambio de rutas dentro de productos
    this.editarProducto = function(){
		self.formLabel = "Editar Producto";
        self.productoSeleccionadoEditar = JSON.parse(JSON.stringify(self.productoSeleccionado));
        self.getPresentacionTalle(self.productoSeleccionadoEditar.idProducto);
        self.getPresentacionColor(self.productoSeleccionadoEditar.idProducto);
        self.getProdMp(self.productoSeleccionadoEditar.idProducto);
		$state.go("productos.editar",  { id : self.productoSeleccionadoEditar.idProducto});
    };
   
    this.nuevoProducto = function(){
    $state.go("productos.nuevo");
    };
    
    this.clearProd = function(){
    $state.go("productos");
        self.formLabel = "";
        self.coloresAgregados = [];
        self.tallesAgregados = [];
        self.mpsAgregadas = [];
        self.productoNuevo = null;
    };
//Fin - Disparar cambio de rutas dentro de productos
    
    this.update = function(){
    self.filtroProducto = [];
    }
    
//Mostrar imagen de formulario
    this.mostrarImagen = function(file)
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
});}

this.agregarParametro = function(){
     var texto = jQuery('#cbParametro').val();
    if(self.parametrosBusqueda.indexOf(texto) == -1){
     self.parametrosBusqueda.push(texto);
    }
    }
        
this.quitarParametro = function(index){
     self.parametrosBusqueda.splice(index,1);
}

this.isNullOrEmpty = function(item){
if(item){
return false;
}
return true;
}

//Traer todos los datos que necesito al mostrar el formulario por primera vez
    this.init = function(){
        this.getGeneros();
        this.getCategorias();
        this.getMps();
		this.getProductosDetalles();
        this.getTalles();
        this.getColores();
	};
//Fin - Traer datos
    
    //Inicializar el formulario, esto es lo primero que se ejecuta siempre
    this.init();
    
});