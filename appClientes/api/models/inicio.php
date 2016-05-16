<?php
require_once("connection.php");

class Inicio
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getTelefonos(){
        $query = "SELECT telefono FROM sucursal";
        $telefonos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $telefonos[] = $fila;
            }
            $result->free();
        }
        return $telefonos;
    }
    

}
