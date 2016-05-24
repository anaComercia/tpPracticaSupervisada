angular
    .module("backendEcommerceClientes.crearCuenta")
    .controller("CrearCuentaController", CrearCtaCtrl);


CrearCtaCtrl.$injector = ["$state","CrearCuentaService"];

function CrearCtaCtrl($state, CrearCuentaService) {
    
    var self = this;
    
    self.clienteNuevo = {};
    self.generos = [];
    self.generoSeleccionado = "";
    self.provincias = [];
    self.localidades = [];


    
    self.getGeneros = function(){
          return CrearCuentaService.getGeneros().then(function(data){
            //console.log(data);
            self.generos = data;
        });
    };
    
// acastillo 24/05/2016-------------------------------------------------------------    
    self.getProvincias = function(){
          return CrearCuentaService.getProvincias().then(function(data){
            //console.log(data);
            self.provincias = data;
        });
    };
    
// acastillo 24/05/2016-------------------------------------------------------------    
    self.getLocalidadesById = function(id){
    return CrearCuentaService.getLocalidadesById(id).then(function(data){
            self.localidades = data;
        });
    };


    
    self.altaDeCuenta = function(){
        //console.log(self.clienteNuevo);
        CrearCuentaService.crearNuevaCuenta(
           self.clienteNuevo.nombre
         , self.clienteNuevo.apellido
         , self.clienteNuevo.email
         , self.clienteNuevo.repetirEmail
         , self.clienteNuevo.numDni
         , self.clienteNuevo.tipoDni
         , self.clienteNuevo.fechaNacimiento
         , self.clienteNuevo.telefono
         //, self.clienteNuevo.pais
         , self.clienteNuevo.idProvincia   
         , self.clienteNuevo.direccion
         , self.clienteNuevo.idLocalidad
         , self.clienteNuevo.codigoPostal
         , self.clienteNuevo.clave
         , self.clienteNuevo.repetirClave
         , self.clienteNuevo.idGenero
         , self.clienteNuevo.idDireccion
        )
        .then(function(response){
            debugger;
                if(response.data.error){
                    alert("Ha ocurrido un error");
                    return;
                }
                //self.getProductosDetalles();
                //$state.go("productos");
            })
    };
    
    
    //Traer todos los datos que necesito al mostrar el formulario por primera vez
    this.init = function(){
        this.getGeneros();
        this.getProvincias();
        
	};
    
	//Inicializar el formulario, esto es lo primero que se ejecuta siempre
	this.init();
}
                   