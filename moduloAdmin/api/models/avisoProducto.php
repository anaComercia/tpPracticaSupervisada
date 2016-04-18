<?php
require_once("connection.php");

class AvisoProd
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
     public function getAll(){
        $query = "SELECT * FROM AvisoProducto";
        $avisos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $avisos[] = $fila;
            }
            $result->free();
        }
        return $avisos;
    }
    
    public function getAllDetalles(){
        $query = "SELECT * FROM AvisoProducto, Stock_Producto, Producto, Sucursal where AvisoProducto.idStock = Stock_Producto.idStock and Stock_Producto.idProducto = Producto.idProducto and Stock_Producto.idSucursal = Sucursal.idSucursal";
        $avisos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $avisos[] = $fila;
            }
            $result->free();
        }
        return $avisos;
    }
    
      public function getAllDetallesMp(){
        $query = "SELECT * FROM AvisoMp, MP where AvisoMp.idMp = MP.idMP";
        $avisos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $avisos[] = $fila;
            }
            $result->free();
        }
        return $avisos;
    }
}