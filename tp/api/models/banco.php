<?php
require_once("connection.php");

class Banco
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from banco where baja = 0";
        $array = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $array[] = $fila;
            }
            $result->free();
        }
        return $array;
    }
    
      public function createBanco($banco){
        $descripcion = $this->connection->real_escape_string($banco['descripcion']);
        $query = "INSERT INTO banco VALUES (
                    DEFAULT,
                    '$descripcion',0)";
        if($this->connection->query($query)){
            $banco['idBanco'] = $this->connection->insert_id;
            return $banco;
        }else{
            return false;
        }
    }

    public function updateBanco($banco){
        $id = $this->connection->real_escape_string($banco['idBanco']);
        $descripcion = $this->connection->real_escape_string($banco['descripcion']);
        $query = "UPDATE banco SET
                         descripcion = '$descripcion'
                  WHERE  idBanco = '$id'";
        return $this->connection->query($query);
    }
    
    public function deleteBanco($idBanco){
        $id = $this->connection->real_escape_string($idBanco);
        $query = "UPDATE banco SET baja = 1
                  WHERE  idBanco = '$id'";
        return $this->connection->query($query);
    }
    
}