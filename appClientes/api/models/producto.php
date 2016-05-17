<?php
require_once("connection.php");

class Producto
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }

    public function getAllProductos(){
        $query = "SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,               p.descripcion as prodDesc, p.idProducto as idProd,
                    p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4
                    FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero";
        $productos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productos[] = $fila;
            }
            $result->free();
        }
        return $productos;
    }
    
    public function getDetalleProducto($id){
        $query = "SELECT t.descripcion as talle,c.descripcion, as color, pres.sku as sku
                    FROM talle t, presentacion_producto pres ,color c, producto p
                    WHERE p.idProducto = pres.idProducto 
                    AND pres.idTalle = t.idTalle
                    AND pres.idColor = c.idColor
                    AND p.idProducto = '$id'";
        $detalle = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $detalle[] = $fila;
            }
            $result->free();
        }
        return $detalle;
    }


    
    public function getProductosHombre(){
        $query = "SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,               p.descripcion as prodDesc, p.idProducto as idProd,
                    p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4
                    FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(g.descripcion) = 'HOMBRE' ";
        $productosHombre = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosHombre[] = $fila;
            }
            $result->free();
        }
        return $productosHombre; 
    }
    
     public function getProductosMujer(){
        $query = "SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,               p.descripcion as prodDesc, p.idProducto as idProd,
                    p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4
                     FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(g.descripcion) = 'MUJER' ";
        $productosMujer = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosMujer[] = $fila;
            }
            $result->free();
        }
        return $productosMujer; 
    }
    
    public function getProductosCamisa(){
        $query = "SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,               p.descripcion as prodDesc, p.idProducto as idProd,
                    p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(c.descripcion) = 'CAMISA' ";
        $productosCamisa = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosCamisa[] = $fila;
            }
            $result->free();
        }
        return $productosCamisa; 
    }
    public function getProductosJean(){
        $query = "SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,               p.descripcion as prodDesc, p.idProducto as idProd,
                    p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4
                    FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(c.descripcion) = 'JEAN' ";
        $productosJean = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosJean[] = $fila;
            }
            $result->free();
        }
        return $productosJean; 
    }
    
      public function getProductosCampera(){
        $query = "SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,               p.descripcion as prodDesc, p.idProducto as idProd,
                    p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4
                     FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(c.descripcion) = 'CAMPERA' ";
        $productosCampera = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosCampera[] = $fila;
            }
            $result->free();
        }
        return $productosCampera; 
    }
      public function getProductosRemera(){
        $query = "SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,               p.descripcion as prodDesc, p.idProducto as idProd,
                    p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4
                     FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    AND p.idGenero = g.idGenero
                    AND UPPER(c.descripcion) = 'REMERA' ";
        $productosRemera = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosRemera[] = $fila;
            }
            $result->free();
        }
        return $productosRemera; 
    }
}
/*
SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,
p.descripcion as prodDesc, p.idProducto as idProd,
p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4,
                    (select sum(sp.cantidad)
       				 from stock_producto sp 
         			 left join presentacion_producto pp on pp.codSku = sp.codSku 
        			 where p.idProducto =  pp.idProducto
           			 GROUP by pp.idProducto)  as stock
 FROM categoria c, genero g
 left join producto p on  p.idGenero = g.idGenero
 where p.idCategoria = c.idCategoria*/