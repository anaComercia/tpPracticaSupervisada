<?php
require_once("connection.php");

class Receta
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "select * from Receta, Prod_MP, Producto, MP, PresentacionProducto where Receta.idReceta = Prod_MP.idReceta and Prod_MP.idProducto = Producto.idProducto and Prod_MP.idMP = MP.idMP and PresentacionProducto.idProducto = Producto.idProducto";
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
       $query = "select distinct Producto.*, PresentacionProducto.*, Talle.descripcion as talle_desc, Color.descripcion as color_desc, Receta.idReceta, Stock_Producto.cantidad from Prod_MP, Producto, MP, PresentacionProducto, Color, Talle, Receta, Stock_Producto
where Prod_MP.idProducto = Producto.idProducto and PresentacionProducto.idProducto = Producto.idProducto and PresentacionProducto.idTalle = Talle.idTalle and PresentacionProducto.idColor = Color.idColor and Receta.idReceta = Prod_MP.idReceta and Prod_MP.idProducto = Producto.idProducto and PresentacionProducto.codSku = Stock_Producto.codSku";
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
        $query = "select distinct MP.* from Receta, Prod_MP, Producto, MP, PresentacionProducto where Receta.idReceta = '$id' and Receta.idReceta = Prod_MP.idReceta and Prod_MP.idProducto = Producto.idProducto and Prod_MP.idMP = MP.idMP and PresentacionProducto.idProducto = Producto.idProducto";
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