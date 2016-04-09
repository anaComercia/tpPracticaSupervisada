<?php
//Esto va siempre
require_once("connection.php");//"connection.php" = configuracon para conectarnos a la DB

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
        $query = "SELECT idProducto, idCategoria, idReceta, titulo,precio,descripcion,idTalle,puntoReposicion FROM Producto";
        //Se declara un array productos
        $productos = array();
        //Se realiza la query y si result no es vacio
        if( $result = $this->connection->query($query) ){
            //Se introduce en fila cada una de las filas traidas
            while($fila = $result->fetch_assoc()){ //fetch_assoc= es un iterador 
                $productos[] = $fila;
            }
            //Se liberan los recursos, esto es muy importante
            $result->free(); //Cerramos la conexion 
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