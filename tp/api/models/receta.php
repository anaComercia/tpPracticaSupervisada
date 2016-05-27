<?php
require_once("connection.php");

class Receta
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "select * from prod_mp, producto, mp, presentacion_producto where prod_mp.idProducto = producto.idProducto and prod_mp.idMP = mp.idMP and presentacion_producto.idProducto = producto.idProducto";
        $receta= array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $receta[] = $fila;
            }
            $result->free();
        }
        return $receta;
    }
    
    public function getSoloProductos(){
       $query = "select distinct producto.*, presentacion_producto.*, talle.descripcion as talle_desc, color.descripcion as color_desc, stock_producto.cantidad from prod_mp, producto, MP, presentacion_producto, color, talle, stock_producto
where prod_mp.idProducto = producto.idProducto and presentacion_producto.idProducto = producto.idProducto and presentacion_producto.idTalle = talle.idTalle and presentacion_producto.idColor = color.idColor and prod_mp.idProducto = producto.idProducto and presentacion_producto.codSku = stock_producto.codSku";
        $receta= array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $receta[] = $fila;
            }
            $result->free();
        }
        return $receta;
    }
    
     public function getAllPorId($id){
        $query = "select distinct mp.* from prod_mp, producto, mp, presentacion_producto where producto.idProducto = '$id' and producto.idProducto = prod_mp.idProducto and prod_mp.idMP = mp.idMP and presentacion_producto.idProducto = producto.idProducto";
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