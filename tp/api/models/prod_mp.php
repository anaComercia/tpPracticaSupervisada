<?php
require_once("connection.php");

class ProdMp
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from prod_mp";
        $mp = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $mp[] = $fila;
            }
            $result->free();
        }
        return $mp;
    }
    
    public function getProductosMp($productoId){
        $id = $this->connection->real_escape_string($productoId);
        $query = "SELECT distinct mp.idMP, mp.titulo, prod_mp.cantidad, mp.medida from prod_mp, mp where prod_mp.idProducto= '$id' and prod_mp.idMP = mp.idMP";
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
        $idMp = $this->connection->real_escape_string($producto['idMp']);
        $cantidad = $this->connection->real_escape_string($producto['cantidad']);
        $query = "INSERT INTO prod_mp VALUES ('$idProducto','$idMp', '$cantidad')";
        if($this->connection->query($query)){
            return $producto;
        }else{
            return false;
        }
    }
    
     public function remove($productoId){
        $id = $this->connection->real_escape_string($productoId);
        $query = "DELETE from prod_mp WHERE idProducto = '$id'";
        return $this->connection->query($query);
    }
    
}