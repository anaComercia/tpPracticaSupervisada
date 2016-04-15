var inicio = angular.module("backendEcommerceClientes.inicio", [
	"ui.router"
]);

$(document).ready(function(){
    $('#myCarousel').carousel({
        interval: 1450 
    });
});



var categoriesList = $("#idPnlCategorias li");

if (categoriesList.length > 4) {
    $("#idPnlCategorias #show-more-cats").show(); 
    for (i = 4; i < categoriesList.length; i++) { 
        $(categoriesList[i]).hide();
    }
}

$("#idPnlCategorias #show-more-cats").click(function(e){
    e.preventDefault();
    for (i = 4; i < categoriesList.length; i++) { 
        $(categoriesList[i]).toggle();
    }
    $(this).find("i").toggleClass("fa-angle-up fa-angle-down");
});