var imagen = angular.module("backendEcommerceAdmin.imagenes");

imagen.controller("ImagenesController", function($state, MpService, ColorService){
	
	var self = this;
	this.carrusel1;
    this.carrusel2;
    this.carrusel3;
    this.carrusel4;
    this.carrusel5;
    this.carrusel6;
    this.bannerIzq;
    this.bannerDer;
    this.modulo;
    
    this.volver = function(){
    $state.go("admGeneral");
    }
    
    
    this.init = function(){

	};
    
    this.init();
   
});