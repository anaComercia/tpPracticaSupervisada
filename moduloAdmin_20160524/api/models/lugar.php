<?php
require_once("connection.php");

class Lugar
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT Lugar.*, Provincia.descripcion as provincia_desc, Localidad.descripcion as localidad_desc FROM Lugar, Provincia, Localidad where Lugar.idProvincia = Provincia.idProvincia and Localidad.idLocalidad = Lugar.idLocalidad";
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