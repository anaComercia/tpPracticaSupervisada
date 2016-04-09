var categorias = angular.module("backendEcommerce.categorias");

categorias.controller("CategoriasController", function($state, CategoriaService,GeneroService){
	
	var self = this;
	this.categorias = [];
    this.editOn = false;
	this.cat_desc = '';
	this.formLabel = "Nueva Categoría";
	this.categoriaSeleccionada = null;
	this.activado = true;
	this.generos=[];
    this.generoSeleccionado="";
    
    this.getCategorias = function(){
    return CategoriaService.getCategorias().then(function(data){
            self.categorias = data;
            self.categorias.forEach(function(elemento){
            elemento.generoDescripcion = self.descGenPorId(elemento.idGenero);
            });
        });
    };
    
      this.getGeneros = function(){
          return GeneroService.getGeneros().then(function(data){
            self.generos = data;
        });
    };
    
      this.descGenPorId = function(genId)
    {
        var genero = "";
        self.generos.forEach(function(elemento){
        if (elemento.idGenero == genId)
        {genero = elemento.descripcion;};
        });
        return genero;
    }
    
    this.createCategoria = function(){
        CategoriaService.createCategoria(self.cat_desc).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            alert("Categoria creada con el id: " + response.data.data.categoria_id);
            self.getCategorias();
            self.cat_desc = '';
        })
    };
    
    this.activeItem = function($index, item){
        self.selectedIndex = $index;
        self.categoriaSeleccionada = item;
        self.activado = false;  
        if (self.editOn) {
        self.cat_desc = self.categoriaSeleccionada.categoria_desc;}
    };

    this.updateCategoria = function(){
        CategoriaService.updateCategoria(self.cat_desc,         self.categoriaSeleccionada.categoria_id).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            alert("Categoria actualizada");
            self.getCategorias();
			self.activeItem(-1, null);
            self.cat_desc = '';
            self.editOn = false;
			$state.go("categorias");
        })
    };
    
    
     this.deleteCategoria = function(){
         var r = confirm("¿Está seguro que desea borrar?");

         
         if (r == true) {
        CategoriaService.deleteCategoria(self.categoriaSeleccionada.categoria_id).then(function(response){
            if(response.data.error){
                alert("Ocurrio un error");
                return;
            }
            alert("Categoria eliminada");
            self.getCategorias();
			self.activeItem(-1, null);
            self.cat_desc = '';
            self.editOn = false;
			$state.go("categorias");
            })
        } 
    };
    
    
    this.putCategoria = function(){
        self.cat_desc = self.categoriaSeleccionada.categoria_desc;
		self.formLabel = "Editar Categoria";
        self.editOn = true;
		$state.go("categorias.editar",  { id : self.categoriaSeleccionada.categoria_id});
    };
    
	this.nuevaCategoria = function(){
		self.formLabel = "Nueva Categoria";
		self.editOn = false;
		$state.go("categorias.nueva");
        self.cat_desc = '';
	};
	
  this.clearCat = function(){
    $state.go("categorias");
    };
    
	this.init = function(){
        this.getGeneros();
		this.getCategorias().then(function(){
			if($state.is("categorias.editar")){
				var indice = null;
				var selected = 
					self.categorias.filter(function(item, index){
						var equal = item.categoria_id == $state.params.id;
						if(equal) indice = index;
						return equal;
					})[0];
				self.activeItem(indice, selected);
				self.cat_desc = self.categoriaSeleccionada.categoria_desc;
				self.formLabel = "Editar Categoria";
				self.editOn = true;
			}else if($state.is("categorias.nueva")){
				self.activeItem(-1, null);
				self.cat_desc = '';
				self.editOn = false
			}
		});
	};
	
	this.init();
	
});