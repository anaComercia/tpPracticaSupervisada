<?php
require_once("connection.php");

class Provincia
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * FROM provincia";
        $provincias = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $provincias[] = $fila;
            }
            $result->free();
        }
        return $provincias;
    }
    
    public function getAllByID($id){
        $query = "SELECT * FROM provincia where idProvincia = '$id'";
        $provincias = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $provincias[] = $fila;
            }
            $result->free();
        }
        return $provincias;
    }
}