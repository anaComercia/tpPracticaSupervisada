<?php
require_once("connection.php");

class Footer
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getTelefonos(){
        $query = "SELECT telefono FROM sucursal";
        $telSucursal = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $telSucursal[] = $fila;
            }
            $result->free();
        }
        return $telSucursal;
    }
}

