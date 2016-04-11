var inicio = angular.module("backendEcommerceClientes.inicio", [
	"ui.router"
]);

var categoriesList = $("#idPnlFiltros #idPnlCategorias li");

if (categoriesList.length > 3) {
    $("#show-more-cats").show(); 
    for (i = 3; i < categoriesList.length; i++) { 
        $(categoriesList[i]).hide();
    }
}

$("#show-more-cats").click(function(e){
    e.preventDefault();
    for (i = 3; i < categoriesList.length; i++) { 
        $(categoriesList[i]).toggle();
    }
    $(this).find("i").toggleClass("fa-angle-up fa-angle-down");
});

