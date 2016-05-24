<?php
require_once("connection.php");

class PresentacionProducto
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from presentacion_producto where baja = 0";
        $mp = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $mp[] = $fila;
            }
            $result->free();
        }
        return $mp;
    }
    
     public function getPresentacionTalle($productoId){
        $id = $this->connection->real_escape_string($productoId);
        $query = "SELECT distinct talle.idTalle, talle.descripcion from presentacion_producto, talle where presentacion_producto.idProducto = '$id' and presentacion_producto.idTalle = talle.idTalle";
        $mp = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $mp[] = $fila;
            }
            $result->free();
        }
        return $mp;
    }
    
     public function getPresentacionColor($productoId){
        $id = $this->connection->real_escape_string($productoId);
        $query = "SELECT distinct color.idColor, color.descripcion from presentacion_producto, color where presentacion_producto.idProducto = '$id' and presentacion_producto.idColor = color.idColor";
        $mp = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $mp[] = $fila;
            }
            $result->free();
        }
        return $mp;
    }
    
       public function create($producto){
        $idProducto = $this->connection->real_escape_string($producto['idProducto']);
        $idColor = $this->connection->real_escape_string($producto['idColor']);
        $idTalle = $this->connection->real_escape_string($producto['idTalle']);
        $query = "INSERT INTO presentacion_producto VALUES (DEFAULT,'$idProducto','$idTalle','$idColor')";
        if($this->connection->query($query)){
            $producto['codSku'] = $this->connection->insert_id;
            return $producto;
        }else{
            return false;
        }
    }
    
}