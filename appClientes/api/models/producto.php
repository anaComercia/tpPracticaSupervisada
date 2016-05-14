<?php
require_once("connection.php");

class Producto
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAllProducts(){
        $query = "SELECT c.descripcion, g.descripcion, p.titulo, p.precio, p.descripcion
                    p.urlImagen, p.urlImagenAlt1, p.urlImagenAlt2, p.urlImagenAlt3
                    FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero";
        $generos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productos[] = $fila;
            }
            $result->free();
        }
        return $productos;
    }
    
    public function getDetalleProducto($id){
        $query = "SELECT t.descripcion,c.descripcion, pres.stock
                    FROM talle t, presentacionproducto pres ,color c, producto p
                    WHERE p.idProducto = pres.idProducto 
                    AND pres.idTalle = t.idTalle
                    AND pres.idColor = c.idColor
                    AND p.idProducto = '$id'";
        $generos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $detalle[] = $fila;
            }
            $result->free();
        }
        return $detalle;
    }
}

    
    public function getProductosHombre(){
        $query = "SELECT c.descripcion, g.descripcion, p.titulo, p.precio, p.descripcion
                    p.urlImagen, p.urlImagenAlt1, p.urlImagenAlt2, p.urlImagenAlt3
                    FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(g.descripcion) = 'H' ";
        $generos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosHombre[] = $fila;
            }
            $result->free();
        }
        return $productosHombre; 
    }
    
     public function getProductosMujer(){
        $query = "SELECT c.descripcion, g.descripcion, p.titulo, p.precio, p.descripcion
                    p.urlImagen, p.urlImagenAlt1, p.urlImagenAlt2, p.urlImagenAlt3
                    FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(g.descripcion) = 'M' ";
        $generos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosMujer[] = $fila;
            }
            $result->free();
        }
        return $productosMujer; 
    }
    
    public function getProductosCamisa(){
        $query = "SELECT c.descripcion, g.descripcion, p.titulo, p.precio, p.descripcion
                    p.urlImagen, p.urlImagenAlt1, p.urlImagenAlt2, p.urlImagenAlt3
                    FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(c.descripcion) = 'CAMISA' ";
        $generos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosCamisa[] = $fila;
            }
            $result->free();
        }
        return $productosCamisa; 
    }
    public function getProductosJean(){
        $query = "SELECT c.descripcion, g.descripcion, p.titulo, p.precio, p.descripcion
                    p.urlImagen, p.urlImagenAlt1, p.urlImagenAlt2, p.urlImagenAlt3
                    FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(c.descripcion) = 'JEAN' ";
        $generos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosJean[] = $fila;
            }
            $result->free();
        }
        return $productosJean; 
    }
    
      public function getProductosCampera(){
        $query = "SELECT c.descripcion, g.descripcion, p.titulo, p.precio, p.descripcion
                    p.urlImagen, p.urlImagenAlt1, p.urlImagenAlt2, p.urlImagenAlt3
                    FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(c.descripcion) = 'CAMPERA' ";
        $generos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosCampera[] = $fila;
            }
            $result->free();
        }
        return $productosCampera; 
    }
      public function getProductosRemera(){
        $query = "SELECT c.descripcion, g.descripcion, p.titulo, p.precio, p.descripcion
                    p.urlImagen, p.urlImagenAlt1, p.urlImagenAlt2, p.urlImagenAlt3
                    FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(c.descripcion) = 'REMERA' ";
        $generos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosRemera[] = $fila;
            }
            $result->free();
        }
        return $productosRemera; 
    }
}
