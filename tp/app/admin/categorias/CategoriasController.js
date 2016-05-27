var categorias = angular.module("backendEcommerceAdmin.categorias");

categorias.controller("CategoriasController", function($state, CategoriaService,GeneroService){
	
	var self = this;
	this.categorias = [];
    this.editOn = false;
	this.cat_desc = '';
	this.formLabel = "Nueva Categoría";
	this.categoriaSeleccionada = null;
	this.activado = true;
    this.seleccion = "";
    this.filtroCategoria = [];
    this.categoriaNueva = null;
    this.categoriaSeleccionadaEditar = null;
    
    this.getCategorias = function(){
    return CategoriaService.getCategorias().then(function(data){
            self.categorias = data;
        });
    };
    
    
    this.createCategoria = function(){
        CategoriaService.createCategoria(self.categoriaNueva.descripcion).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            $state.go("categorias");
            self.getCategorias();
        })
    };
    
    this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.categoriaSeleccionada = item;
        self.categoriaSeleccionadaEditar = JSON.parse(JSON.stringify(self.categoriaSeleccionada));
    };

    this.updateCategoria = function(){
 CategoriaService.updateCategoria(self.categoriaSeleccionadaEditar.descripcion,self.categoriaSeleccionadaEditar.idCategoria).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            $state.go("categorias");
            self.getCategorias();
			
        })
    };
    
    
     this.deleteCategoria = function(){
         var r = confirm("¿Está seguro que desea borrar?");
         if (r == true) {
        CategoriaService.deleteCategoria(self.categoriaSeleccionada.idCategoria).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            alert("Categoria eliminada");
            self.getCategorias();
			self.activeItem(-1, null);
			$state.go("categorias");
            })
        } 
    };
    
    
    this.putCategoria = function(){
        self.cat_desc = self.categoriaSeleccionadaEditar.descripcion;
		self.formLabel = "Editar Categoria";
		$state.go("categorias.editar",  { id : self.categoriaSeleccionadaEditar.categoria_id});
    };
    
	this.nuevaCategoria = function(){
		self.formLabel = "Nueva Categoria";
		$state.go("categorias.nueva");
	};
	
  this.clearCat = function(){
    $state.go("categorias");
    self.formLabel = '';
    };
    
    this.update = function(){
    self.filtroCategoria = [];
    }
    
	this.init = function(){
		this.getCategorias();
	};
	
	this.init();
	
});