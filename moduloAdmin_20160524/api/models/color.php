<?php
require_once("connection.php");

class Color
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * FROM Color";
        $color = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $color[] = $fila;
            }
            $result->free();
        }
        return $color;
    }
}