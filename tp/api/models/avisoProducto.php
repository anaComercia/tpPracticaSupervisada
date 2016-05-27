<?php
require_once("connection.php");

class AvisoProd
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
     public function getAll(){
        $query = "SELECT * FROM aviso_producto";
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
        $query = "SELECT * FROM aviso_producto, stock_producto, producto, sucursal, presentacion_producto where aviso_producto.idStock = stock_producto.idStock and stock_producto.idSucursal = sucursal.idSucursal and producto.idProducto = presentacion_producto.idProducto and presentacion_producto.codSku = stock_producto.codSku";
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
        $query = "SELECT * FROM aviso_mp, mp where aviso_mp.idMp = mp.idMP";
        $avisos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $avisos[] = $fila;
            }
            $result->free();
        }
        return $avisos;
    }
    
      public function getProdDeposito(){
        $query = "SELECT * FROM producto prod, stock_producto sp, sucursal suc where suc.nroSucursal = 0 and sp.idSucursal = suc.idSucursal and sp.idProducto = prod.idProducto";
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