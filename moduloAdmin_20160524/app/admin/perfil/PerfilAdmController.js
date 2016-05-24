var perfilAdm = angular.module("backendEcommerceAdmin.perfilAdm");

perfilAdm.controller("PerfilAdmController", function($state, PerfilAdmService, $scope){
	
	this.title = "Perfil";
	var self = this;
    this.perfil;
    this.passActual='';
    this.passNueva ='';
    this.passNueva2='';
    
     this.getPerfil = function(user){
    return PerfilAdmService.getPerfil(user).then(function(data){
            if(data){    
                self.perfil = data[0];
            }
        });
    };
	
    this.cambiarPass = function(){
    $state.go("perfilAdm.nuevapass");
    }
    
    this.clear = function(){
    $state.go("perfilAdm");
    }
    
    this.init = function(){
		this.getPerfil($scope.main.user);
	};
    
    this.init();
});