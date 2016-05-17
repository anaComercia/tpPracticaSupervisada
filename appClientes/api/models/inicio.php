<?php
require_once("connection.php");

class Inicio
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getTelefonos(){
        $query = "SELECT telefono FROM sucursal";
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
                     and g.descripcion = 'HOMBRE'
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
                     and g.descripcion = 'MUJER'
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
    

}
