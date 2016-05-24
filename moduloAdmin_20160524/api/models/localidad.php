<?php
require_once("connection.php");

class Localidad
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT Localidad.*, Provincia.idProvincia, Provincia.descripcion as provincia_desc FROM Localidad, Provincia where Localidad.idProvincia = Provincia.idProvincia";
        $localidades = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $localidades[] = $fila;
            }
            $result->free();
        }
        return $localidades;
    }
}