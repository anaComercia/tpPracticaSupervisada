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
        $query = "SELECT distinct talle.idTalle, talle.descripcion from presentacion_producto, talle where presentacion_producto.idProducto = '$id' and presentacion_producto.idTalle = talle.idTalle and presentacion_producto.baja = 0";
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
        $query = "SELECT distinct color.idColor, color.descripcion from presentacion_producto, color where presentacion_producto.idProducto = '$id' and presentacion_producto.idColor = color.idColor and presentacion_producto.baja = 0";
        $mp = array();
        if($result = $this->connection->query($query) ){
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
        $query = "INSERT INTO presentacion_producto VALUES (DEFAULT,'$idProducto','$idTalle','$idColor',0)";
        if($this->connection->query($query)){
            $producto['codSku'] = $this->connection->insert_id;
            return $producto;
        }else{
            return false;
        }
    }
    
       public function update($producto){
        $idProducto = $this->connection->real_escape_string($producto['idProducto']);
        $idColor = $this->connection->real_escape_string($producto['idColor']);
        $idTalle = $this->connection->real_escape_string($producto['idTalle']);
        $query = "select codSku from presentacion_producto where idProducto = '$idProducto' and idTalle = '$idTalle' and idColor = '$idColor'";
        $result = $this->connection->query($query);
        if($result->num_rows > 0){
            $query2 = "update presentacion_producto set baja = 0 where idProducto = '$idProducto' and idTalle = '$idTalle' and idColor = '$idColor'";
            return $this->connection->query($query2);
        }else{
            return $this->create($producto);
        }
        }
    
      public function deleteAll($producto){
        $idProducto = $this->connection->real_escape_string($producto);
        $query = "update presentacion_producto set baja = 1 where idProducto = '$idProducto'";
        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }
    
}