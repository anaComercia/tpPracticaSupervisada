<?php
require_once("connection.php");

class Localidad
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT localidad.*, provincia.idProvincia, provincia.descripcion as provincia_desc FROM localidad, provincia where localidad.idProvincia = provincia.idProvincia";
        $localidades = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $localidades[] = $fila;
            }
            $result->free();
        }
        return $localidades;
    }
    
       public function getAllByIdProvincia($LocalidadId){
        $id = $this->connection->real_escape_string($LocalidadId);
        $query = "SELECT localidad.* FROM localidad where idProvincia = '$id'";
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