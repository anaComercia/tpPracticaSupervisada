<?php
require_once("connection.php");

class Pedido
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from PedidoProveedor";
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
        $query = "SELECT * from PedidoProveedor, MP, Pedido_Mp where PedidoProveedor.idPedidoProveedor = Pedido_Mp.idPedidoProveedor and Pedido_Mp.idMp = MP.idMP";
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