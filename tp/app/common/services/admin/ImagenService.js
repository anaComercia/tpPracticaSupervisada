var backendEcommerceAdmin = angular.module("backendEcommerceAdmin");

backendEcommerceAdmin.service("ImagenService", function($http, Upload){

	this.getImagenes = function(){
		var promise = $http.get('api/index.php/imagen');
		return promise.then(function(response){
			return response.data.data;
		})
	};
    
    
    this.updateImagenes = function(carrusel1, carrusel2, carrusel3, carrusel4, carrusel5, carrusel6, bannerIzq, bannerDer, modulo){
        data = 
        {
            'carrusel1' : carrusel1,
            'carrusel2' : carrusel2,
            'carrusel3' : carrusel3,
            'carrusel4' : carrusel4,
            'carrusel5' : carrusel5,
            'carrusel6' : carrusel6,
            'bannerIzq' : bannerIzq,
            'bannerDer' : bannerDer,
            'modulo' : modulo
        };
            Upload.upload({
                  url: 'api/index.php/upload_fotos',
                  data: {image: [carrusel1, carrusel2, carrusel3, carrusel4,carrusel5,carrusel6,bannerIzq,bannerDer,modulo], username: "usuario"}})
                .then(function(resp) {
                        var urls = [];
                        urls = resp.data.split(",").slice();
                        var indice = urls.indexOf("");
                        if(indice > -1){
                        urls.splice(indice,1);
                        }
                        fotos = {
                        'urls' : urls
                        }
                    $http.put('api/index.php/imagen', fotos).then(function(response){
            return response;
                    });
        });
    };
});