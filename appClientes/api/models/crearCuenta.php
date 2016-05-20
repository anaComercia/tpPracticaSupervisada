<?php
require_once("connection.php");

class CrearCuenta
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }



   public function create($data){
       
        //var_dump($data);

        $nombre= $this->connection->real_escape_string($data['nombre']);
        $apellido = $this->connection->real_escape_string($data['apellido']);
        $email = $this->connection->real_escape_string($data['email']);
        $repetirEmail =$this->connection->real_escape_string($data['repetirEmail']);
        $numDni = 32479609;//$this->connection->real_escape_string($data['numDni']);
        $tipoDni = 'dni';//$this->connection->real_escape_string($data['tipoDni']);
        $fechaNacimiento =$this->connection->real_escape_string($data['fechaNacimiento']);
        $telefono = $this->connection->real_escape_string($data['telefono']);
        $pais= $this->connection->real_escape_string($data['pais']);
        $direccion =$this->connection->real_escape_string($data['direccion']);
        $idLocalidad =1;// $this->connection->real_escape_string($data['idLocalidad']);
        $codigoPostal = $this->connection->real_escape_string($data['codigoPostal']);
        $clave = $this->connection->real_escape_string($data['clave']);
        $repetirClave= $this->connection->real_escape_string($data['repetirClave']);
        $idGenero =$this->connection->real_escape_string($data['idGenero']);
       
        $idDireccion=0;
        $idPersona=0;
        $reputacion=100;

       
       //Insert en tabla: direccion
        $queryDireccion =
         "INSERT INTO direccion
        (idDireccion, idLocalidad, direccion, cp) 
            VALUES
        (DEFAULT,
        '$idLocalidad',
        '$direccion',
        '$codigoPostal')";   
        
       //var_dump($queryDireccion);

       if($this->connection->query($queryDireccion)){
            $data['idDireccion'] = $this->connection->insert_id;
            $idDireccion=$data['idDireccion'] ;
        }else{
            return false;
        }
       
   
       //Insert en tabla: persona
       $queryPersona =
        "INSERT INTO persona
        (idPersona, nombre, apellido, numDni, tipoDni, telefono, email, idGenero, fechaNacimiento,idDireccion) 
           VALUES
        (DEFAULT
         ,'$nombre'
         ,'$apellido'
         ,'$numDni'
         ,'$tipoDni'
         ,'$telefono'
         ,'$email'
         ,'$idGenero'
         ,'$fechaNacimiento'
         ,'$idDireccion')";

       //print($queryPersona);
       
        if($this->connection->query($queryPersona)){
            $data['idPersona'] = $this->connection->insert_id;
            $idPersona=$data['idPersona'];
        }else{
            return false;
        }
       
   
       //Insert en tabla: usuario
       $queryUsuario=
        "INSERT INTO usuario
        (idUsuario, usuario, contraseña, idPersona, habilitado) 
        VALUES 
        (DEFAULT,'$email','$clave','$idPersona','s')";
       
       //print($queryPersona);
       
       //print($reputacion);
       
        if($this->connection->query($queryUsuario)){
            $data['idUsuario'] = $this->connection->insert_id;
            $idUsuario=$data['idUsuario'];
            
            //print($idUsuario);

        }else{
            return false;
        }
       
       
       //Insert en tabla: cliente
       
       
       $queryCliente=
        "INSERT INTO cliente
        (idCliente, idUsuario, reputacion)
        VALUES
        (DEFAULT,'$idUsuario','$reputacion')";
       
        //print($queryCliente);
       
       
        if($this->connection->query($queryCliente)){
            $data['idCliente'] = $this->connection->insert_id;
            
            return $data;
        }else{
            return false;
        }
       
    }
    

  
}
