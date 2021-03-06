<?php
require_once("connection.php");

class TipoDni
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = 
            "SELECT td.idTipoDni, td.descripcion 
             FROM tipo_dni td";
            
        $tiposDni = array();
        
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $tiposDni[] = $fila;
            }
            $result->free();
        }
        return $tiposDni;
    }
}