<?php
require_once("connection.php");

class Tarjeta
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from tarjeta where baja = 0";
        $array = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $array[] = $fila;
            }
            $result->free();
        }
        return $array;
    }
    
     public function getAllPorId($id){
        $query = "Select tarjeta_banco.*, tarjeta.idTarjeta, tarjeta.descripcion as tarjeta_desc, banco.idBanco, banco.descripcion as banco_desc from tarjeta_banco, tarjeta, banco where tarjeta.idTarjeta = '$id' and tarjeta_banco.idTarjeta = tarjeta.idTarjeta and tarjeta_banco.idBanco = banco.idBanco";
        $array = array();
        try {
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $array[] = $fila;
            }
            $result->free();
        }
        }catch (Exception $e) {
        throw $e;
        }
        return $array;
    }
    
          public function createTarjeta($tarjeta){
        $descripcion = $this->connection->real_escape_string($tarjeta['descripcion']);
        $query = "INSERT INTO tarjeta VALUES (
                    DEFAULT,
                    '$descripcion',0)";
        if($this->connection->query($query)){
            $tarjeta['idTarjeta'] = $this->connection->insert_id;
            return $tarjeta;
        }else{
            return false;
        }
    }

    public function updateTarjeta($tarjeta){
        $id = $this->connection->real_escape_string($tarjeta['idTarjeta']);
        $descripcion = $this->connection->real_escape_string($tarjeta['descripcion']);
        $query = "UPDATE tarjeta SET
                         descripcion = '$descripcion'
                  WHERE  idTarjeta = '$id'";
        return $this->connection->query($query);
    }
    
    public function deleteTarjeta($idTarjeta){
        $id = $this->connection->real_escape_string($idTarjeta);
        $query = "UPDATE tarjeta SET baja = 1
                  WHERE  idTarjeta = '$id'";
        return $this->connection->query($query);
    }
    
        public function deleteCuotas($idCuota){
        $id = $this->connection->real_escape_string($idCuota);
        $query = "delete from tarjeta_banco
                  WHERE  idTarjeta = '$id'";
        return $this->connection->query($query);
    }
    
        public function createCuotas($cuota){
        $idTarjeta = $this->connection->real_escape_string($cuota['idTarjeta']);
        $idBanco = $this->connection->real_escape_string($cuota['idBanco']);
        $cuotas = $this->connection->real_escape_string($cuota['cuotas']);
        $interes = $this->connection->real_escape_string($cuota['interes']);
        $query = "INSERT INTO tarjeta_banco VALUES (
                    '$idTarjeta','$idBanco', '$cuotas', '$interes')";
        if($this->connection->query($query)){
            $cuota['idTarjeta'] = $this->connection->insert_id;
            return $cuota;
        }else{
            return false;
        }
    }
}