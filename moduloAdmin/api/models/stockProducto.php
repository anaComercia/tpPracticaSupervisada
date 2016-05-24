<?php
require_once("connection.php");

class StockProducto
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from stock_producto";
        $stockProducto= array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $stockProducto[] = $fila;
            }
            $result->free();
        }
        return $stockProducto;
    }
    
    public function getAllDetalles(){
        $query = "SELECT sp.*, prod.*, s.*, d.*, prov.idProvincia, prov.descripcion as provincia_desc, loc.idLocalidad, loc.descripcion as localidad_desc  FROM stock_producto sp, producto prod, sucursal s, direccion d, provincia prov, localidad loc, presentacion_producto pp where pp.idProducto = prod.idProducto and sp.codSku = pp.codSku and sp.idSucursal = s.idSucursal and s.idDireccion = d.idDireccion and d.idLocalidad = loc.idLocalidad and d.idProvincia = prov.idProvincia";
        $stockProducto= array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $stockProducto[] = $fila;
            }
            $result->free();
        }
        return $stockProducto;
    }
}