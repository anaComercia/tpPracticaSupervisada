<?php
require_once("connection.php");

class Talle
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * FROM talle";
        $talles = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $talles[] = $fila;
            }
            $result->free();
        }
        return $talles;
    }
}