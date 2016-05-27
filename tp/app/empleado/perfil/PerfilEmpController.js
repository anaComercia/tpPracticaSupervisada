var perfil = angular.module("backendEcommerceEmp.perfilEmp");

perfil.controller("PerfilEmpController", function($state, EmpleadoService, $scope){
	
this.title = "Perfil";
	var self = this;
    this.perfil;
    this.passActual='';
    this.passNueva ='';
    this.passNueva2='';
    
     this.getPerfilEmpleado = function(user){
    return EmpleadoService.getPerfilEmpleado(user).then(function(data){
            if(data){
            self.perfil = data[0];
            }
        });
    };
	
    this.cambiarPass = function(){
    $state.go("perfilEmp.nuevapass");
    }
    
    this.clear = function(){
    $state.go("perfilEmp");
    }
    
    this.init = function(){
		this.getPerfilEmpleado($scope.main.user);
	};
    
    this.init();
   
});