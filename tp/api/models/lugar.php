<?php
require_once("connection.php");

class Lugar
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT lugar.*, provincia.descripcion as provincia_desc, localidad.descripcion as localidad_desc FROM lugar, provincia, localidad where localidad.idProvincia = provincia.idProvincia and localidad.idLocalidad = lugar.idLocalidad";
        $lugar = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $lugar[] = $fila;
            }
            $result->free();
        }
        return $lugar;
    }
    
           public function inicializarLugares($idLocalidad){
        $id = $this->connection->real_escape_string($idLocalidad);
        $query = "INSERT INTO lugar VALUES (
                    DEFAULT,
                    '$id', '1', 1,0)";
        if($this->connection->query($query)){
            return $idLocalidad;
        }else{
            return false;
        }
    }
    
          public function update($lugares){
        $idLugar = $this->connection->real_escape_string($lugares['idLugar']);
        $tardanza = $this->connection->real_escape_string($lugares['tardanza']);
        $costo = $this->connection->real_escape_string($lugares['costo']);
        $query = "UPDATE lugar SET
                         tardanzaDias = '$tardanza', costo = '$costo'
                  WHERE  idLugar = '$idLugar'";
        return $this->connection->query($query);
    }
}