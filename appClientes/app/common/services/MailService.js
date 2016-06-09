var backendEcommerce = angular.module("backendEcommerceClientes");

backendEcommerce.service("MailService", function($http){

    this.mandarMail = function(mailRemitente, nombreRemitente, mailDestinatario, asunto, contenido){
        data = 
        {
            'mailRemitente' : mailRemitente,
            'nombreRemitente' : nombreRemitente,
            'mailDestinatario' : mailDestinatario,
            'asunto' : asunto,
            'contenido' : contenido
        };
        console.log(data);
        
        var promise = $http.post('api/index.php/mail', data);
        return promise.then(function(response){
            debugger; 
            return response;
        });
    };
   
});
