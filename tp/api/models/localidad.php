<?php
require_once("connection.php");

class Localidad
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT localidad.*, provincia.idProvincia, provincia.descripcion as provincia_desc FROM localidad, provincia where localidad.idProvincia = provincia.idProvincia and localidad.baja = 0";
        $localidades = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $localidades[] = $fila;
            }
            $result->free();
        }
        return $localidades;
    }
    
       public function getAllByIdProvincia($LocalidadId){
        $id = $this->connection->real_escape_string($LocalidadId);
        $query = "SELECT localidad.* FROM localidad where idProvincia = '$id' and localidad.baja = 0";
        $localidades = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $localidades[] = $fila;
            }
            $result->free();
        }
        return $localidades;
    }
    
        public function getDireccionById($direccionId){
        $id = $this->connection->real_escape_string($direccionId);
        $query = "SELECT * FROM direccion, localidad,provincia where direccion.idDireccion = '$id' and localidad.idLocalidad = direccion.idLocalidad and localidad.idProvincia = provincia.idProvincia";
        $localidades = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $localidades[] = $fila;
            }
            $result->free();
        }
        return $localidades;
    }
    
         public function create($localidad){
        $descripcion = $this->connection->real_escape_string($localidad['descripcion']);
        $idProvincia = $this->connection->real_escape_string($localidad['idProvincia']);
        $query = "INSERT INTO localidad VALUES (
                    DEFAULT,$idProvincia,
                    '$descripcion', 0)";
        if($this->connection->query($query)){
            $localidad['idLocalidad'] = $this->connection->insert_id;
            return $localidad;
        }else{
            return false;
        }
    }
    
      public function update($localidad){
        $id = $this->connection->real_escape_string($localidad['idLocalidad']);
        $descripcion = $this->connection->real_escape_string($localidad['descripcion']);
        $idProvincia = $this->connection->real_escape_string($localidad['idProvincia']);
        $query = "UPDATE localidad SET idProvincia = '$idProvincia',
                         descripcion = '$descripcion'
                  WHERE  idLocalidad = '$id'";
        return $this->connection->query($query);
    }
    
     public function delete($localidad){
        $id = $this->connection->real_escape_string($localidad);
        $query = "update localidad set baja = 1 where idLocalidad = '$id'";
        if($this->connection->query($query)){
            return $localidad;
        }else{
            return false;
        }
        }
}