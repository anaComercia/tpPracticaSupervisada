<?php
require_once("connection.php");

class Provincia
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * FROM provincia where baja = 0";
        $provincias = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $provincias[] = $fila;
            }
            $result->free();
        }
        return $provincias;
    }
    
    public function getAllByID($id){
        $query = "SELECT * FROM provincia where idProvincia = '$id' and baja = 0";
        $provincias = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $provincias[] = $fila;
            }
            $result->free();
        }
        return $provincias;
    }
    
       public function create($provincia){
        $descripcion = $this->connection->real_escape_string($provincia['descripcion']);
        $query = "INSERT INTO provincia VALUES (
                    DEFAULT,
                    '$descripcion', 0)";
        if($this->connection->query($query)){
            $provincia['idProvincia'] = $this->connection->insert_id;
            return $provincia;
        }else{
            return false;
        }
    }
    
      public function update($provincia){
        $id = $this->connection->real_escape_string($provincia['idProvincia']);
        $descripcion = $this->connection->real_escape_string($provincia['descripcion']);
        $query = "UPDATE provincia SET
                         descripcion = '$descripcion'
                  WHERE  idProvincia = '$id'";
        return $this->connection->query($query);
    }
    
     public function delete($provincia){
        $id = $this->connection->real_escape_string($provincia);
        $query = "update provincia set baja = 1 where idProvincia = '$id'";
        if($this->connection->query($query)){
            return $provincia;
        }else{
            return false;
        }
        }
    
}