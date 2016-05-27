<?php
require_once("connection.php");

class Persona
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * FROM persona";
        $categorias = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $categorias[] = $fila;
            }
            $result->free();
        }
        return $categorias;
    }

    public function get($idPersona){
        $id = (int) $this->connection->real_escape_string($idPersona);
        $query = "SELECT * FROM persona WHERE idPersona = $id";
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }
    
    public function create($persona){
        $nombre = $this->connection->real_escape_string($persona['nombre']);
        $apellido = $this->connection->real_escape_string($persona['apellido']);
        $tipoDni = $this->connection->real_escape_string($persona['tipoDni']);
        $numDni = $this->connection->real_escape_string($persona['numDni']);
        $telefono = $this->connection->real_escape_string($persona['telefono']);
        $email = $this->connection->real_escape_string($persona['email']);
        $idGenero = $this->connection->real_escape_string($persona['idGenero']);
        $fechaNacimiento = $this->connection->real_escape_string($persona['fechaNacimiento']);
        $direccion = $this->connection->real_escape_string($persona['direccion']);
        $idProvincia = $this->connection->real_escape_string($persona['idProvincia']);
        $idLocalidad = $this->connection->real_escape_string($persona['idLocalidad']);
        $cp = $this->connection->real_escape_string($persona['cp']);
        
         $query2 = "INSERT INTO direccion VALUES (
                    DEFAULT,
                    '$idLocalidad', '$direccion', '$cp')";
        if($this->connection->query($query2)){
            $idDireccion = $this->connection->insert_id;
        }else{
            $idDireccion = null;
        }
        
        
        $query = "INSERT INTO persona VALUES (
                    DEFAULT,
                    '$nombre','$apellido', '$tipoDni', '$numDni', '$telefono', '$email', '$idGenero', '$fechaNacimiento', '$idDireccion')";
        if($this->connection->query($query)){
            $persona['idPersona'] = $this->connection->insert_id;
            return $persona;
        }else{
            return false;
        }
    }

    public function update($persona){
        $id = $this->connection->real_escape_string($persona['idPersona']);
        $nombre = $this->connection->real_escape_string($persona['nombre']);
        $apellido = $this->connection->real_escape_string($persona['apellido']);
        $tipoDni = $this->connection->real_escape_string($persona['tipoDni']);
        $numDni = $this->connection->real_escape_string($persona['numDni']);
        $telefono = $this->connection->real_escape_string($persona['telefono']);
        $email = $this->connection->real_escape_string($persona['email']);
        $idGenero = $this->connection->real_escape_string($persona['idGenero']);
        $fechaNacimiento = $this->connection->real_escape_string($persona['fechaNacimiento']);
        $direccion = $this->connection->real_escape_string($persona['direccion']);
        $idProvincia = $this->connection->real_escape_string($persona['idProvincia']);
        $idLocalidad = $this->connection->real_escape_string($persona['idLocalidad']);
        $cp = $this->connection->real_escape_string($persona['cp']);
        $idDireccion = $this->connection->real_escape_string($persona['idDireccion']);
        
        $query = "update direccion set idLocalidad = '$idLocalidad', direccion = '$direccion', cp='$cp' where idDireccion = '$idDireccion'";
        $this->connection->query($query);
        
        $query = "UPDATE persona SET
                         nombre = '$nombre', apellido = '$apellido', tipoDni = '$tipoDni', numDni = '$numDni', telefono = '$telefono', email = '$email', idGenero = '$idGenero', fechaNacimiento = '$fechaNacimiento'
                  WHERE  idPersona = '$id'";
        return $this->connection->query($query);
    }

}