<?php
require_once("connection.php");

class Color
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * FROM color";
        $color = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $color[] = $fila;
            }
            $result->free();
        }
        return $color;
    }
    
     public function create($color){
        $descripcion = $this->connection->real_escape_string($color['color_desc']);
        $query = "INSERT INTO color VALUES (
                    DEFAULT,
                    '$descripcion')";
        if($this->connection->query($query)){
            $color['idColor'] = $this->connection->insert_id;
            return $color;
        }else{
            return false;
        }
    }

    public function update($color){
        $id = $this->connection->real_escape_string($color['color_id']);
        $descripcion = $this->connection->real_escape_string($color['color_desc']);
        $query = "UPDATE color SET
                         descripcion = '$descripcion'
                  WHERE  idColor = '$id'";
        return $this->connection->query($query);
    }

    public function remove($color){
        $id = $this->connection->real_escape_string($color);
        $query = "DELETE FROM color
                  WHERE idColor = '$id'";
        return $this->connection->query($query);
    }
}