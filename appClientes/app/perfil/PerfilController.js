angular
    .module("backendEcommerceClientes.perfil")
    .controller("PerfilController", PerfilCtrl);

PerfilCtrl.$injector = ["$state"];

function PerfilCtrl($state) {
    vm = this;
    
    /* reputacion */
    vm.reputacionCliente = 75;
    vm.mensajeReputacion = "Tu reputación es de ";
    
    vm.mensajeInformativo= "La reputación es un acumulador de puntos que comenzará con un valor de 100 al crearse la cuenta."
                         + "Ésta disminuirá en 25 cada vez que usted realice una compra y no la concrete. Cuando la reputación llegue a 0 (cero), su cuenta será inhabilitada y deberá comunicarse con una sucursal para aclarar su situación; Del mismo modo, cada vez que usted realice una compra satisfactoria la reputación incrementará en 25 hasta un máximo de 100. ";
    
    /* lista cupones */
    vm.cuponUsadosLista = [
        {
            id: 1,
            code: '987dmslk43',
            date: '14/03/2016',
            price: 50
        },
        {
            id: 2,
            code: '87fdswrlkj',
            date: '14/11/2015',
            price: 150
        },
        {
            id: 3,
            code: 'fdsdfh6wet',
            date: '10/03/2016',
            price: 350
        }];
    
      vm.cuponNuevosLista = [
        {
            id: 1,
            code: '45fdhy57w54',
            price: 150
        },
        {
            id: 2,
            code: 'fhs437use4',
            price: 250
        }];
}