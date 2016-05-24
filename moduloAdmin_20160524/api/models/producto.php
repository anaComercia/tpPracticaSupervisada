<?php
//Esto va siempre
require_once("connection.php");

//Se declara la clase producto
class Producto
{
    //Esto va siempre
    private $connection;
    
    //Esto va siempre
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    //El metodo getAll realiza una query
    public function getAll(){
        $query = "SELECT * FROM Producto";
        //Se declara un array productos
        $productos = array();
        //Se realiza la query y si result no es vacio
        if( $result = $this->connection->query($query) ){
            //Se introduce en fila cada una de las filas traidas
            while($fila = $result->fetch_assoc()){
                $productos[] = $fila;
            }
            //Se liberan los recursos, esto es muy importante
            $result->free();
        }
        //Se regresa el array con los datos
        return $productos;
    }
    
     public function getAllDetalles(){
        $query = "SELECT prod.*, cat.idCategoria, cat.descripcion as categoria_desc, gen.idGenero, gen.descripcion as genero_desc FROM Producto prod, Categoria cat, Genero gen where prod.idCategoria = cat.idCategoria and prod.idGenero = gen.idGenero";
        //Se declara un array productos
        $productos = array();
        //Se realiza la query y si result no es vacio
        if( $result = $this->connection->query($query) ){
            //Se introduce en fila cada una de las filas traidas
            while($fila = $result->fetch_assoc()){
                $productos[] = $fila;
            }
            //Se liberan los recursos, esto es muy importante
            $result->free();
        }
        //Se regresa el array con los datos
        return $productos;
    }

   public function create($producto){
        $descripcion = $this->connection->real_escape_string($producto['producto_desc']);
        $precio = (int) $this->connection->real_escape_string($producto['producto_precio']);
        $idCat = $this->connection->real_escape_string($producto['categoria_id']);
        $query = "INSERT INTO productos VALUES (
                    DEFAULT,
                    '$idCat', '$descripcion', '$precio')";
        if($this->connection->query($query)){
            $producto['producto_id'] = $this->connection->insert_id;
            return $producto;
        }else{
            return false;
        }
    }

    public function update($producto){
        $id = (int) $this->connection->real_escape_string($producto['producto_id']);
        $descripcion = $this->connection->real_escape_string($producto['producto_desc']);
         $precio = (int) $this->connection->real_escape_string($producto['producto_precio']);
        $idCat = $this->connection->real_escape_string($producto['categoria_id']);
        $query = "UPDATE productos SET
                         producto_desc = '$descripcion', producto_precio = '$precio', categoria_id = '$idCat'
                  WHERE  producto_id = $id";
        return $this->connection->query($query);
    }

    public function remove($productoId){
        $id = (int) $this->connection->real_escape_string($productoId);
        $query = "DELETE FROM productos
                  WHERE producto_id = $productoId";
        return $this->connection->query($query);
    }
}