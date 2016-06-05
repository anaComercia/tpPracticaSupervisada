<?php
require_once("connection.php");

class Inicio
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getTelefonos(){
        $query = "SELECT telefono FROM sucursal where nroSucursal != 0";
        $telefonos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $telefonos[] = $fila;
            }
            $result->free();
        }
        return $telefonos;
    }
    
        
      public function getInicioHombre(){
        $query = "SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,
                    p.descripcion as prodDesc, p.idProducto as idProd,
                    p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4,
                                        (select sum(sp.cantidad)
                                         from stock_producto sp 
                                         left join presentacion_producto pp on pp.codSku = sp.codSku 
                                         where p.idProducto =  pp.idProducto
                                         GROUP by pp.idProducto)  as stock
                     FROM categoria c, genero g
                     left join producto p on  p.idGenero = g.idGenero
                     where p.idCategoria = c.idCategoria
                     and upper(g.descripcion) = 'HOMBRE'
                     and (select sum(sp.cantidad)
                                         from stock_producto sp 
                                         left join presentacion_producto pp on pp.codSku = sp.codSku 
                                         where p.idProducto =  pp.idProducto
                                         and sp.cantidad != 0
                                         and sp.cantidad is not null
                                         GROUP by pp.idProducto) != 0
                     ORDER BY stock DESC
                     LIMIT 0,5";
        $productosIniHombre = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosIniHombre[] = $fila;
            }
            $result->free();
        }
        return $productosIniHombre;
    }
    public function getInicioMujer(){
        $query = "SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,
                    p.descripcion as prodDesc, p.idProducto as idProd,
                    p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4,
                                        (select sum(sp.cantidad)
                                         from stock_producto sp 
                                         left join presentacion_producto pp on pp.codSku = sp.codSku 
                                         where p.idProducto =  pp.idProducto
                                         GROUP by pp.idProducto)  as stock
                     FROM categoria c, genero g
                     left join producto p on  p.idGenero = g.idGenero
                     where p.idCategoria = c.idCategoria
                     and upper(g.descripcion) = 'MUJER'
                     and (select sum(sp.cantidad)
                                         from stock_producto sp 
                                         left join presentacion_producto pp on pp.codSku = sp.codSku 
                                         where p.idProducto =  pp.idProducto
                                         and sp.cantidad != 0
                                         and sp.cantidad is not null
                                         GROUP by pp.idProducto) != 0
                     ORDER BY stock DESC
                     LIMIT 0,5";
        $productosIniMujer = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productosIniMujer[] = $fila;
            }
            $result->free();
        }
        return $productosIniMujer;
    }
    
    public function getImgFijas(){
        $query = "select carrusel1 as c1, carrusel2 as c2, carrusel3 as c3,
                    carrusel4 as c4, carrusel5 as c5, carrusel6 as c6, bannerIzq as izq, bannerDer as der
                    from imagenes";
        $imgFijas = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $imgFijas[] = $fila;
            }
            $result->free();
        }
        return $imgFijas;
    }
    
     public function getProductoCliente($dato){
    
        $query = "SELECT c.descripcion as catDesc, g.descripcion as gendDesc, p.titulo as prodTit, p.precio as prodPrecio,
                    p.descripcion as prodDesc, p.idProducto as idProd,
                    p.urlImagen as img1, p.urlImagenAlt1 as img2, p.urlImagenAlt2 as img3, p.urlImagenAlt3 as img4
                    FROM categoria c, genero g, producto p
                    WHERE p.idCategoria = c.idCategoria 
                    and p.baja = 0
                    AND p.idGenero = g.idGenero
                    and upper(p.titulo) like upper('%$dato%')";
         $buscado = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $buscado[] = $fila;
            }
            $result->free();
        }
        return $buscado; 
    }
}
