<?php
require_once("connection.php");

class Tarjeta
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from Tarjeta";
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
        $query = "Select TarjetaBanco.*, Tarjeta.idTarjeta, Tarjeta.descripcion as tarjeta_desc, Banco.idBanco, Banco.descripcion as banco_desc from TarjetaBanco, Tarjeta, Banco where Tarjeta.idTarjeta = '$id' and TarjetaBanco.idTarjeta = Tarjeta.idTarjeta and TarjetaBanco.idBanco = Banco.idBanco";
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
    
}