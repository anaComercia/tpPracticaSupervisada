var perfil = angular.module("backendEcommerceClientes.perfil", [
	"ui.router"
]);

$('#myTab a').click(function (e) {
    debugger;
  e.preventDefault()
  $(this).tab('show')
})