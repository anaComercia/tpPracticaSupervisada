<?php
require_once("connection.php");

class Usuario
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }



   public function loginByEmail($data){
      $email=$this->connection->real_escape_string($data['email']);
       
       $queryUsuario =
        "SELECT 
        idUsuario
        , usuario
        , password
        , idPersona
        , habilitado
        FROM usuario 
        WHERE 
        usuario='$email'
        AND habilitado=0";

        //print($queryUsuario);

        $DatosUsuario = array();
        if( $result = $this->connection->query($queryUsuario) ){
            $fila = $result->fetch_assoc();
            $DatosUsuario[] = $fila;
            $result->free();
        }
        return $DatosUsuario;
    }
    
    public function loginByEmailPassword($data){
       $email=$this->connection->real_escape_string($data['email']);
       $password=$this->connection->real_escape_string($data['password']);
       $queryUsuario =
        "SELECT 
          idUsuario
        , usuario
        , password
        , idPersona
        , habilitado
        FROM usuario
         WHERE
         usuario='$email'
         and password='$password'";
        
        $datosUsuario = array();
        $fila=array();
        
        if( $result = $this->connection->query($queryUsuario) ){
           $fila= $result->fetch_assoc();

            setcookie("idUsuario", $fila['idUsuario'], time() + 360000);
            setcookie("emailUsuario", $fila['usuario'], time() + 360000);
           
           $datosUsuario[] = $fila;
           $result->free();
        }
        
        return $datosUsuario;
    }
    
    public function loginByEmailFechaNacimiento($data){
       $email=$this->connection->real_escape_string($data['email']);
       $date=$this->connection->real_escape_string($data['fechaNacimiento']);
        
        //var_dump($email);
        //var_dump($password);
        //Compruebo que los datos existan
   
        $date= date('Y/m/d',$fechaNacimiento) ;
        
       //Select en tabla: usuario
       $queryUsuario =
        "SELECT p.nombre, p.apellido 
        , p.numDni, p.tipoDni as idTipoDni
        , p.telefono, p.email ,date_format(p.fechaNacimiento,'%d/%m/%Y') as fechaNacimiento
        ,d.direccion, d.cp,d.idDireccion 
        ,l.idLocalidad,l.descripcion as descripcion_localidad 
        ,pr.idProvincia, pr.descripcion as descripcion_provincia 
        ,g.idGenero, g.descripcion as descripcion_genero 
		,u.password
        FROM persona p ,direccion d,localidad l,provincia pr,genero g,usuario u 
        WHERE p.idDireccion=d.idDireccion 
        and d.idLocalidad=l.idLocalidad
        and l.idProvincia=pr.idProvincia
        and p.idGenero=g.idGenero 
		AND p.email=u.usuario
        and p.email='$email'
		AND DATE_FORMAT( fechaNacimiento, '%Y/%m/%d') = DATE_FORMAT('$date','%Y/%m/%d')";   
        
        $datosUsuario = array();
        $fila=array();
        
        if( $result = $this->connection->query($queryUsuario) ){
           $fila= $result->fetch_assoc();
           $datosUsuario[] = $fila;
           $result->free();
        }
        
        return $datosUsuario;
    }
    
    public function getLogin(){
        
        
        $objeto = null;
        
            if(isset($_COOKIE["emailUsuario"]) && isset($_COOKIE["idUsuario"]))
        {
            $idUsuario = $_COOKIE["idUsuario"];
            $emailUsuario = $_COOKIE["emailUsuario"];
            $objeto = [
            'idUsuario' => $idUsuario,
            'emailUsuario' => $emailUsuario];
        }
        
        return $objeto;
    }
    
     public function deleteSesion(){
         if (isset($_COOKIE['idUsuario'])) {
                        unset($_COOKIE['idUsuario']);
                        setcookie('idUsuario', '', time() - 3600); 
                    }
                    if (isset($_COOKIE['emailUsuario'])) {
                        unset($_COOKIE['emailUsuario']);
                        setcookie('emailUsuario', '', time() - 3600); 
                    }
        return true;
    }
    
       public function updatePassword($data){ 
        $passwordNueva=   $this->connection->real_escape_string($data['passwordNueva']);       
        $email =          $this->connection->real_escape_string($data['email']);

        $queryUsuario =
        "UPDATE usuario
        SET 
        password='$passwordNueva'
        WHERE 
        usuario='$email'
        AND habilitado=0";
       
        if($this->connection->query($queryUsuario)){
            return true;
        }else{
            return false;
        }
    }
   
}
