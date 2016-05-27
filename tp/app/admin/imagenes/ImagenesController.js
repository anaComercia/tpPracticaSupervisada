var imagen = angular.module("backendEcommerceAdmin.imagenes");

imagen.controller("ImagenesController", function($state, ImagenService){
	
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
    this.urls;
    
    this.volver = function(){
    $state.go("admGeneral");
    }
    
    this.getImagenes = function(){
    return ImagenService.getImagenes().then(function(data){
            if(data){
            self.urls = data;
                setTimeout(function(){jQuery("#myCarousel").carousel();}, 1500);
            }
    });
    }
    
    this.guardarImagenes = function(){
    ImagenService.updateImagenes(self.carrusel1, self.carrusel2, self.carrusel3, self.carrusel4, self.carrusel5, self.carrusel6, self.bannerIzq, self.bannerDer, self.modulo);
    }
    
    this.init = function(){
        self.getImagenes();
	};
    
    this.init();
   
});