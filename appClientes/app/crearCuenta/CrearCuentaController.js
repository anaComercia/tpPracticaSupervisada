angular
    .module("backendEcommerceClientes.crearCuenta")
    .controller("CrearCuentaController", CrearCtaCtrl);


CrearCtaCtrl.$injector = ["$state","CrearCuentaService"];

function CrearCtaCtrl($state, CrearCuentaService) {
    var self = this;
    
    self.clienteNuevo = {};

    self.altaDeCuenta = function(){
        console.log(self.clienteNuevo);
        CrearCuentaService.crearNuevaCuenta(
           self.clienteNuevo.nombre
         , self.clienteNuevo.apellido
         , self.clienteNuevo.email
         , self.clienteNuevo.repetirEmail
         , self.clienteNuevo.numDni
         , self.clienteNuevo.tipoDni
         , self.clienteNuevo.fechaNacimiento
         , self.clienteNuevo.telefono
         , self.clienteNuevo.pais
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
    
	
	//this.init();
}