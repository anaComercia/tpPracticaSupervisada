<?php
require_once("connection.php");

class Mp
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT idMp, titulo, medida,color,idPrecio,puntoReposicion FROM MP";
        $mp = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $mp[] = $fila;
            }
            $result->free();
        }
        return $mp;
    }
    
    public function getAllPrecios(){
        $query = "SELECT idPrecio, precio, unidad FROM Precio_Mp";
        $precios = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $precios[] = $fila;
            }
            $result->free();
        }
        return $precios;
    }
}