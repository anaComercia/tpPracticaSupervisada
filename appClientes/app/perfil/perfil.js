var perfil = angular.module("backendEcommerceClientes.perfil", [
	"ui.router"
]);

$('#perfilTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});
