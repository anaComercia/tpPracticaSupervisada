<?php
require_once("connection.php");

class CrearCuenta
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }



   public function create($data){

 
        $nombre=            $this->connection->real_escape_string($data['nombre']);
        $apellido =         $this->connection->real_escape_string($data['apellido']);
        $email =            $this->connection->real_escape_string($data['email']);
        $repetirEmail =     $this->connection->real_escape_string($data['repetirEmail']);
        $numDni =           $this->connection->real_escape_string($data['numDni']);
        $tipoDni =          $this->connection->real_escape_string($data['idTipoDni']);
        $fechaNacimiento =  $this->connection->real_escape_string($data['fechaNacimiento']);
        $telefono =         $this->connection->real_escape_string($data['telefono']);
        //$pais=              $this->connection->real_escape_string($data['pais']);
        $idProvincia=       $this->connection->real_escape_string($data['idProvincia']);
        $direccion =        $this->connection->real_escape_string($data['direccion']);
        $idLocalidad =      $this->connection->real_escape_string($data['idLocalidad']);
        $codigoPostal =     $this->connection->real_escape_string($data['codigoPostal']);
        $clave =            $this->connection->real_escape_string($data['clave']);
        $repetirClave=      $this->connection->real_escape_string($data['repetirClave']);
        $idGenero =         $this->connection->real_escape_string($data['idGenero']);
       
        $idDireccion=   0;
        $idPersona=     0;
        $reputacion=    100;
        $Fila=          array();
        $IdCupon=       0;
        $EstadoCupon=   'NO';
        $idCliente=     0;

       
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
        (idUsuario, usuario, password, idPersona, habilitado) 
        VALUES 
        (DEFAULT,'$email','$clave','$idPersona',0)";
       
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
            $idCliente=$data['idCliente'];
            //return $data;
        }else{
            return false;
        }
       
       
        //Obtención IdCupon para descuento por alta
       $queryCuponId=
       "SELECT idCupon
       FROM cupon 
       WHERE montoDescuento=100";
       
       
       if( $result = $this->connection->query($queryCuponId) ){
           $Fila= $result->fetch_assoc();
           $IdCupon=$Fila["idCupon"];
           $result->free();
        }
       //print($IdCupon);
       
       //Insert en tabla:
       $queryCupon_cliente=
       "INSERT INTO cupon_cliente
       (idCupon,idCliente,estado) 
       VALUES 
       ('$IdCupon','$idCliente','$EstadoCupon')";
       
       //print($queryCupon_cliente);
           
      if($this->connection->query($queryCupon_cliente)){
            $data['idCupon'] = $this->connection->insert_id;
            
            return $data;
        }else{
            return false;
        }
       
    }
   
}
