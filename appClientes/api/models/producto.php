<?php
require_once("connection.php");

class Producto
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }

    public function getAllProductos(){
        $query = "SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,
            p.descripcion as prodDesc, p.idProducto as idProd,
            p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4
            FROM categoria c, genero g, producto p
            WHERE p.idCategoria = c.idCategoria 
            and p.baja = 0 
            AND p.idGenero = g.idGenero
            and (select sum(sp.cantidad)
                 from stock_producto sp 
                 left join presentacion_producto pp on pp.codSku = sp.codSku 
                 where p.idProducto =  pp.idProducto
                 GROUP by pp.idProducto)  != 0
            ORDER BY gendDesc  DESC";
        $productos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productos[] = $fila;
            }
            $result->free();
        }
        return $productos;
    }
    public function getAllBancos(){
        $query = "select b.descripcion as banco, t.descripcion as tarjeta, tb.cuotas as cuotas, tb.interes as interes 
                    from  banco b 
                    left join tarjeta_banco tb on b.idBanco = tb.idBanco 
                    left join tarjeta t on t.idTarjeta = tb.idTarjeta 
                    WHERE t.baja = 0
                    AND b.baja = 0
                    order by b.descripcion desc, t.descripcion DESC";
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
        $query = "SELECT t.descripcion as talle,c.descripcion as color, pres.codSku as sku
                    FROM talle t, presentacion_producto pres ,color c, producto p
                    WHERE p.idProducto = pres.idProducto 
                    AND pres.idTalle = t.idTalle
                    AND pres.idColor = c.idColor
                    and p.baja = 0 
                    and pres.baja = 0
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
                    and p.baja = 0 
                    AND p.idGenero = g.idGenero
                     and (select sum(sp.cantidad)
                 from stock_producto sp 
                 left join presentacion_producto pp on pp.codSku = sp.codSku 
                 where p.idProducto =  pp.idProducto
                 GROUP by pp.idProducto)  != 0
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
                    and p.baja = 0 
                    AND p.idGenero = g.idGenero
                     and (select sum(sp.cantidad)
                 from stock_producto sp 
                 left join presentacion_producto pp on pp.codSku = sp.codSku 
                 where p.idProducto =  pp.idProducto
                 GROUP by pp.idProducto)  != 0
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
                     FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    and p.baja = 0 
                    AND p.idGenero = g.idGenero
                     and (select sum(sp.cantidad)
                 from stock_producto sp 
                 left join presentacion_producto pp on pp.codSku = sp.codSku 
                 where p.idProducto =  pp.idProducto
                 GROUP by pp.idProducto)  != 0
                    AND UPPER(c.descripcion) LIKE 'CAMISA%'";
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
                    and p.baja = 0 
                    AND p.idGenero = g.idGenero
                     and (select sum(sp.cantidad)
                 from stock_producto sp 
                 left join presentacion_producto pp on pp.codSku = sp.codSku 
                 where p.idProducto =  pp.idProducto
                 GROUP by pp.idProducto)  != 0
                    AND UPPER(c.descripcion) LIKE 'JEAN%'";
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
                    and p.baja = 0 
                    AND p.idGenero = g.idGenero
                     and (select sum(sp.cantidad)
                 from stock_producto sp 
                 left join presentacion_producto pp on pp.codSku = sp.codSku 
                 where p.idProducto =  pp.idProducto
                 GROUP by pp.idProducto)  != 0
                    AND UPPER(c.descripcion) LIKE 'CAMPERA%'";
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
                    and p.baja = 0 
                    AND p.idGenero = g.idGenero
                     and (select sum(sp.cantidad)
                 from stock_producto sp 
                 left join presentacion_producto pp on pp.codSku = sp.codSku 
                 where p.idProducto =  pp.idProducto
                 GROUP by pp.idProducto)  != 0
                    AND UPPER(c.descripcion) LIKE 'REMERA%'";
        $productosRemera = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosRemera[] = $fila;
            }
            $result->free();
        }
        return $productosRemera; 
    }
    
    public function getImgModulo(){
        $query = "SELECT modulo from imagenes ";
        $imagen = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $imagen[] = $fila;
            }
            $result->free();
        }
        return $imagen; 
    }
    
      public function getTalles($prodId){
        $id = (int) $this->connection->real_escape_string($prodId);
        $query = "SELECT DISTINCT t.descripcion as descripcion, t.idTalle as idTalle
                    FROM presentacion_producto pp
                    left join talle t on t.idTalle = pp.idTalle
                    where pp.idProducto = $prodId
                    and pp.baja = 0 ";
         $talle = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $talle[] = $fila;
            }
            $result->free();
        }
        return $talle; 
    }
    
    public function getColores($idTalle,$idProd){
      //  $idProd = (int) $this->connection->real_escape_string($producto['productoSeleccionado']);
       // $idTalle = (int) $this->connection->real_escape_string($producto['talleSeleccionado']);
        $idPro = (int) $this->connection->real_escape_string($idProd);
        $idTall = (int)  $this->connection->real_escape_string($idTalle);
        $query = "SELECT t.descripcion as descripcion, t.idColor as idColor
                    FROM presentacion_producto pp
                    left join color t on t.idColor = pp.idColor
                    where pp.idTalle = $idTall 
                    and pp.idProducto = $idPro
                    and pp.baja = 0";
         $color = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $color[] = $fila;
            }
            $result->free();
        }
        return $color; 
    }

    
     public function getSKU($idTalle,$idColor,$idProd){
      //  $idProd = (int) $this->connection->real_escape_string($producto['productoSeleccionado']);
       // $idTalle = (int) $this->connection->real_escape_string($producto['talleSeleccionado']);
        $idPro = (int) $this->connection->real_escape_string($idProd);
        $idTall = (int)  $this->connection->real_escape_string($idTalle);
        $idColo = (int)  $this->connection->real_escape_string($idColor);
        $query = "select pp.codSku
                    from presentacion_producto pp
                    where pp.idProducto = $idPro 
                    and pp.idTalle = $idTall 
                    and pp.idColor = $idColo
                    and pp.baja = 0";
         $sku = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $sku[] = $fila;
            }
            $result->free();
        }
        return $sku; 
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
           			 GROUP by pp.idProducto)  as stock,  pp.codSku
 FROM categoria c, genero g
 left join producto p on  p.idGenero = g.idGenero
left join presentacion_producto pp on p.idProducto =  pp.idProducto
 where p.idCategoria = c.idCategoria*/