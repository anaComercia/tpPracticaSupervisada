var admGeneral = angular.module("backendEcommerceAdmin.admGeneral");

admGeneral.controller("AdmGeneralController", function($state,PerfilAdmService, $scope){
	
	var self = this;
    this.perfil;
    this.passActual='';
    this.passNueva ='';
    this.passNueva2='';
    this.busqAv = false;
    this.parametrosBusqueda= [];
    this.mostrarPass = false;
    
    this.getPerfil = function(user){
    return PerfilAdmService.getPerfil(user).then(function(data){
            if(data){    
                self.perfil = data[0];
            }
        });
    };
    
    this.init = function(){
		this.getPerfil($scope.main.user);
	};
    
    this.init();
   
});