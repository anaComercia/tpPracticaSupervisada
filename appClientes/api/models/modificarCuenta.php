<?php
require_once("connection.php");

class ModificarCuenta
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }



   public function update($data){
       
       // var_dump($data);

        $nombre=            $this->connection->real_escape_string($data['nombre']);
        $apellido =         $this->connection->real_escape_string($data['apellido']);
        $email =            $this->connection->real_escape_string($data['email']);
        //$repetirEmail =     $this->connection->real_escape_string($data['repetirEmail']);
        $numDni =           $this->connection->real_escape_string($data['numDni']);
        $tipoDni =          $this->connection->real_escape_string($data['idTipoDni']);
        $fechaNacimiento =  $this->connection->real_escape_string($data['fechaNacimiento']);
        $telefono =         $this->connection->real_escape_string($data['telefono']);
        //$pais=              $this->connection->real_escape_string($data['pais']);
        $idProvincia=       $this->connection->real_escape_string($data['idProvincia']);
        $direccion =        $this->connection->real_escape_string($data['direccion']);
        $idLocalidad =      $this->connection->real_escape_string($data['idLocalidad']);
        $codigoPostal =     $this->connection->real_escape_string($data['codigoPostal']);
        //$clave =            $this->connection->real_escape_string($data['clave']);
        //$repetirClave=      $this->connection->real_escape_string($data['repetirClave']);
        $idGenero =         $this->connection->real_escape_string($data['idGenero']);
       
        $idDireccion=   0;
        $idPersona=     0;
        //$reputacion=    100;
        $Fila=          array();
        //$IdCupon=       0;
        //$EstadoCupon=   1;
        $idCliente=     0;


       //Update en tabla: persona
       $queryPersona =
        "UPDATE persona 
        SET
        nombre='$nombre'
        ,apellido='$apellido'
        ,tipoDni='$tipoDni'
        ,numDni='$numDni'
        ,telefono='$telefono'
        ,idGenero='$idGenero'
        WHERE email='$email'";

       print($queryPersona);
       
        if($this->connection->query($queryPersona)){
            return true;
        }else{
            return false;
        }
       
  
     
       
    }
   
}
