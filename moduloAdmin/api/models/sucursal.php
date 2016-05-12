<?php
require_once("connection.php");

class Sucursal
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT suc.*, loc.descripcion as localidad_desc, prov.descripcion as provincia_desc, dir.* FROM Sucursal suc, Localidad loc, Provincia prov,Direccion dir where suc.idDireccion = dir.idDireccion and dir.idLocalidad = loc.idLocalidad and loc.idProvincia = prov.idProvincia";
        $sucursales= array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $sucursales[] = $fila;
            }
            $result->free();
        }
        return $sucursales;
    }
}