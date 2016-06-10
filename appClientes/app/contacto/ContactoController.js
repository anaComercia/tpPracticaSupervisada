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
            MailService.mandarMail( this.email                     //mailRemitente
                                    ,this.nombre+' '+this.apellido //nombreRemitente
                                    ,"modashowventaropa@gmail.com" //mailDestinatario
                                    , this.asunto                  //asunto
                                    , "<p>"+this.mensaje+"</p>"//<h2>"+this.mensaje+"</h2>"  //contenido
                                     +"<p>"
                                     +"</br> Datos:</br>"
                                     +"  <br>Nombre:</br>"+"<I>"+this.nombre+"</I>"
                                     +"  <br>Apellido:</br>"+"<I>"+this.apellido+"</I>"
                                     +"  <br>E-mail:</br>"+"<I>"+this.email+"</I>"
                                     +"  <br>Telefono:</br>"+"<I>"+this.telefono+"</I>"
                                     +"</p>"
                                     
                                   );
                  
                            
                console.log('------------');
    };
};