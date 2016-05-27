<?php
require_once("connection.php");

class Venta
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from cliente";
        $array = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $array[] = $fila;
            }
            $result->free();
        }
        return $array;
    }
    
     public function getAllDetalles(){
        $query = "SELECT * from compra, cliente, usuario where compra.idCliente = cliente.idCliente and cliente.idUsuario = usuario.idUsuario";
        $array = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $array[] = $fila;
            }
            $result->free();
        }
        return $array;
    }
}