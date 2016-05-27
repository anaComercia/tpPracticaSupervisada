<?php
require_once("connection.php");

class Pedido
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from pedido_proveedor";
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
        $query = "SELECT * from pedido_proveedor, mp, pedido_mp where pedido_proveedor.idPedidoProveedor = pedido_mp.idPedidoProveedor and pedido_mp.idMp = mp.idMP";
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