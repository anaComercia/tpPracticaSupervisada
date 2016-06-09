angular
    .module("backendEcommerceClientes.contacto")
    .controller("ContactoController", ContactoCtrl);

ContactoCtrl.$injector = ["$state","MailService"];




function ContactoCtrl($state,MailService,$rootScope) {
    this.nombre="";
    this.apellido="";
    this.email="";
    this.telefono="";
    this.asunto="";
    this.mensaje="";
    this.email="";
    this.mailEmpresa="modashowventaropa@gmail.com";
    
    /*
    MailService.mandarMail( this.mailEmprsa                 //mailRemitente
                            , "ModaShow-Contacto"            //nombreRemitente
                            , this.mailEmpresa              //mailDestinatario
                            , "Comentarios y Sugerencias"   //asunto
                            , "<h2>Todo ok 2</h2>"          //contenido
                          );
    
    */
        
        this.enviarMail = function (){
            //debugger; 
            MailService.mandarMail("modashowventaropa@gmail.com" //mailRemitente
                                    , "ModaShow"                       //nombreRemitente
                                    , this.email//"adriana.castillo2025@gmail.com"//mailDestinatario
                                    , "Mail OK"                       //asunto
                                    , "<h2>Todo ok 2</h2>"              //contenido
                                   );
                  
                            
                console.log('------------');
    };
};