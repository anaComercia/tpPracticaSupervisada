<?php
require_once("connection.php");

class Sucursal
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT suc.*, loc.descripcion as localidad_desc, loc.idProvincia, prov.descripcion as provincia_desc, dir.*, dir.idDireccion FROM sucursal suc, localidad loc, provincia prov,direccion dir where suc.idDireccion = dir.idDireccion and dir.idLocalidad = loc.idLocalidad and loc.idProvincia = prov.idProvincia and suc.baja = 0";
        $sucursales= array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $sucursales[] = $fila;
            }
            $result->free();
        }
        return $sucursales;
    }
    
    
        public function create($sucursal){
        $nro = $this->connection->real_escape_string($sucursal['nro']);
        $telefono = $this->connection->real_escape_string($sucursal['telefono']);
        $horario = $this->connection->real_escape_string($sucursal['horario']);
        $idLocalidad = $this->connection->real_escape_string($sucursal['idLocalidad']);
        $direccion = $this->connection->real_escape_string($sucursal['direccion']);
        $cp = $this->connection->real_escape_string($sucursal['cp']);
            
        $query = "INSERT INTO direccion VALUES (
                    DEFAULT,
                    '$idLocalidad', '$direccion', '$cp')";
        if($this->connection->query($query)){
            $idDireccion = $this->connection->insert_id;
        }else{
            return false;
        }
            
        $query2 = "INSERT INTO sucursal VALUES (
                    DEFAULT,
                    '$idDireccion','$nro', '$telefono', '$horario')";
        if($this->connection->query($query2)){
            $sucursal['idSucursal'] = $this->connection->insert_id;
            return $sucursal;
        }else{
            return false;
        }
        }
    
    
        public function update($sucursal){
        $id = $this->connection->real_escape_string($sucursal['id']);
        $nro = $this->connection->real_escape_string($sucursal['nro']);
        $telefono = $this->connection->real_escape_string($sucursal['telefono']);
        $horario = $this->connection->real_escape_string($sucursal['horario']);
        $idLocalidad = $this->connection->real_escape_string($sucursal['idLocalidad']);
        $direccion = $this->connection->real_escape_string($sucursal['direccion']);
        $cp = $this->connection->real_escape_string($sucursal['cp']);
        $idDireccion = $this->connection->real_escape_string($sucursal['idDireccion']);
            
        $query = "update direccion set idLocalidad = '$idLocalidad', direccion = '$direccion', cp='$cp' where idDireccion = '$idDireccion'";
            
        $query2 = "update sucursal set idDireccion = '$idDireccion',nroSucursal = '$nro', telefono = '$telefono', horarioAtencion = '$horario' where idSucursal = '$id'";
        if($this->connection->query($query2)){
            $sucursal['idSucursal'] = $this->connection->insert_id;
            return $sucursal;
        }else{
            return false;
        }
        }
    
     public function delete($sucursal){
        $id = $this->connection->real_escape_string($sucursal);
         
        $query2 = "update sucursal set baja = 1 where idSucursal = '$id'";
        if($this->connection->query($query2)){
            return $sucursal;
        }else{
            return false;
        }
        }
    
}