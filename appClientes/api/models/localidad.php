<?php
require_once("connection.php");

class Localidad
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = 
            "SELECT localidad.idLocalidad,localidad.idProvincia,localidad.descripcion,localidad.baja
            , provincia.idProvincia, provincia.descripcion as provincia_desc , provincia.baja
            FROM localidad, provincia 
            where localidad.idProvincia = provincia.idProvincia
            and provincia.baja=0
            and localidad.baja=0";
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
               $query = 
            "SELECT localidad.idLocalidad,localidad.idProvincia,localidad.descripcion,localidad.baja 
             FROM localidad 
             where idProvincia = '$id'
             and localidad.baja=0";
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