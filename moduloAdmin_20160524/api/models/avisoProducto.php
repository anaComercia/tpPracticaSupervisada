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
        $query = "SELECT * FROM AvisoProducto, Stock_Producto, Producto, Sucursal, PresentacionProducto where AvisoProducto.idStock = Stock_Producto.idStock and Stock_Producto.idSucursal = Sucursal.idSucursal and Producto.idProducto = PresentacionProducto.idProducto and PresentacionProducto.codSku = Stock_Producto.codSku";
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
    
      public function getProdDeposito(){
        $query = "SELECT * FROM Producto prod, Stock_Producto sp, Sucursal suc where suc.nroSucursal = 0 and sp.idSucursal = suc.idSucursal and sp.idProducto = prod.idProducto";
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