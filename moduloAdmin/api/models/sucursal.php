<?php
require_once("connection.php");

class Sucursal
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * FROM Sucursal";
        $sucursales= array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $sucursales[] = $fila;
            }
            $result->free();
        }
        return $sucursales;
    }
}