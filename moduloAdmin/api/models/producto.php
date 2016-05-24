<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

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
        $query = "SELECT * FROM producto";
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
        $query = "SELECT prod.*, cat.idCategoria, cat.descripcion as categoria_desc, gen.idGenero, gen.descripcion as genero_desc FROM producto prod, categoria cat, genero gen where prod.idCategoria = cat.idCategoria and prod.idGenero = gen.idGenero and prod.baja = 0";
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
        $titulo = $this->connection->real_escape_string($producto['titulo']);
        try{
        $descripcion = $this->connection->real_escape_string($producto['descripcion']);
        }catch(\Exception $e){$descripcion = null;}
        $idGenero = $this->connection->real_escape_string($producto['idGenero']);
        $idCategoria =$this->connection->real_escape_string($producto['idCategoria']);
         try{
        $precio = $this->connection->real_escape_string($producto['precio']);
        }catch(\Exception $e){$precio = null;}
        try{
        $puntoReposicion = $this->connection->real_escape_string($producto['puntoReposicion']);
        }catch(\Exception $e){$puntoReposicion = null;}
        $query = "INSERT INTO producto(idProducto,idCategoria, idGenero, titulo, precio, descripcion, puntoReposicion, urlImagen, urlImagenAlt1, urlImagenAlt2, urlImagenAlt3, baja) VALUES (DEFAULT,'$idCategoria','$idGenero','$titulo','$precio','$descripcion','$puntoReposicion',null,null,null,null,0)";
        if($this->connection->query($query)){
            $producto['idProducto'] = $this->connection->insert_id;
            return $producto;
        }else{
            return false;
        }
    }

    public function update($producto){
        $idProducto = $this->connection->real_escape_string($producto['idProducto']);
        $titulo = $this->connection->real_escape_string($producto['titulo']);
        try{
        $descripcion = $this->connection->real_escape_string($producto['descripcion']);
        }catch(\Exception $e){$descripcion = null;}
        $idGenero = $this->connection->real_escape_string($producto['idGenero']);
        $idCategoria =$this->connection->real_escape_string($producto['idCategoria']);
        try{
        $precio = $this->connection->real_escape_string($producto['precio']);
        }catch(\Exception $e){$precio = null;}
        try{
        $puntoReposicion = $this->connection->real_escape_string($producto['puntoReposicion']);
        }catch(\Exception $e){$puntoReposicion = null;}
        $query = "UPDATE producto SET titulo = '$titulo', descripcion = '$descripcion', idGenero = '$idGenero', idCategoria = '$idCategoria', precio = '$precio', puntoReposicion = '$puntoReposicion' WHERE  idProducto = '$idProducto'";
        return $this->connection->query($query);
    }
    
     public function updateImagen($producto){
         $idProducto = $this->connection->real_escape_string($producto['idProducto']);
         $urls = $producto['urls'];
         $urlImagen = null;
         $urlImagen1 = null;
         $urlImagen2 = null;
         $urlImagen3 = null;
         
         $len = count($urls);
            for($i = 0; $i < $len; $i++) {
                switch ($i) {
                case 0:
                    $urlImagen = $urls[$i];
                    break;
                case 1:
                    $urlImagen1 = $urls[$i];
                    break;
                case 2:
                    $urlImagen2 = $urls[$i];
                    break;
                case 3:
                    $urlImagen3 = $urls[$i];
                    break;
                }
            }
         
        $query = "UPDATE producto SET urlImagen = '$urlImagen', urlImagenAlt1 = '$urlImagen1', urlImagenAlt2 = '$urlImagen2', urlImagenAlt3 = '$urlImagen3' WHERE  idProducto = '$idProducto'";
        return $this->connection->query($query);
    }

    public function remove($productoId){
        $id = $this->connection->real_escape_string($productoId);
        $query = "UPDATE producto SET baja='1'
                  WHERE idProducto = $id";
        return $this->connection->query($query);
    }
}