<?php
require_once("connection.php");

class Mp
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from MP";
        $mp = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $mp[] = $fila;
            }
            $result->free();
        }
        return $mp;
    }
    
     public function getAllDetalles(){
        $query = "SELECT mp.*, pm.* FROM MP mp inner join Precio_Mp pm on mp.idPrecio = pm.idPrecio";
        $mp = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $mp[] = $fila;
            }
            $result->free();
        }
        return $mp;
    }
    
    
    
}