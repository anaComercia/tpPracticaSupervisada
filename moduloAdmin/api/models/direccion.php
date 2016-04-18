<?php
require_once("connection.php");

class Direccion
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * FROM Direccion";
        $direcciones = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $direcciones[] = $fila;
            }
            $result->free();
        }
        return $direcciones;
    }
}