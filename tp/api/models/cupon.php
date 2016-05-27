<?php
require_once("connection.php");

class Cupon
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from cupon where baja = 0";
        $array = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $array[] = $fila;
            }
            $result->free();
        }
        return $array;
    }
    
     public function create($cupon){
        $descripcion = $this->connection->real_escape_string($cupon['descripcion']);
        $monto = $this->connection->real_escape_string($cupon['montoDescuento']);
        $query = "INSERT INTO cupon VALUES (
                    DEFAULT,
                    '$descripcion','$monto',0)";
        if($this->connection->query($query)){
            $cupon['idCupon'] = $this->connection->insert_id;
            return $cupon;
        }else{
            return false;
        }
    }

    public function update($cupon){
        $id = $this->connection->real_escape_string($cupon['id']);
        $descripcion = $this->connection->real_escape_string($cupon['descripcion']);
        $monto = $this->connection->real_escape_string($cupon['montoDescuento']);
        $query = "UPDATE cupon SET
                         descripcion = '$descripcion', montoDescuento = '$monto'
                  WHERE  idCupon = '$id'";
        return $this->connection->query($query);
    }

    public function remove($idCupon){
        $id = (int) $this->connection->real_escape_string($idCupon);
        $query = "update cupon set baja = 1
                  WHERE idCupon = '$id'";
        return $this->connection->query($query);
    }
    
    
}