<?php
require_once("connection.php");

class Lugar
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT lugar.*, provincia.descripcion as provincia_desc, localidad.descripcion as localidad_desc FROM lugar, provincia, localidad where lugar.idProvincia = provincia.idProvincia and localidad.idLocalidad = lugar.idLocalidad";
        $lugar = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $lugar[] = $fila;
            }
            $result->free();
        }
        return $lugar;
    }
}