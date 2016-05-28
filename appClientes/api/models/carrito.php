<?php
require_once("connection.php");

class Carrito
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }

    public function getBancos(){
        $query = "SELECT b.idBanco as id, b.descripcion as detail 
                FROM banco b 
                order by b.descripcion desc";
        $productos = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $productos[] = $fila;
            }
            $result->free();
        }
        return $productos;
    }
    
    public function getTarjetas($prodId){
        $id = (int) $this->connection->real_escape_string($prodId);
        $query = "select DISTINCT t.idTarjeta as id, t.descripcion as type
                    from tarjeta_banco tb
                    left join tarjeta t on t.idTarjeta = tb.idTarjeta
                    where tb.idBanco =  $prodId";
         $talle = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $talle[] = $fila;
            }
            $result->free();
        }
        return $talle; 
    }
    
     public function getCuotas($banco,$tarjeta){
        $idBanco = (int) $this->connection->real_escape_string($banco);
        $idTarj = (int) $this->connection->real_escape_string($tarjeta);
        $query = "select cuotas, interes 
                from tarjeta_banco 
                where idTarjeta = $idTarj  
                and idBanco = $idBanco ";
         $talle = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $talle[] = $fila;
            }
            $result->free();
        }
        return $talle; 
    }
    
     public function getSucursales(){
        $query = "SELECT d.direccion as dir, d.cp as cp , l.descripcion as des
                    FROM sucursal s
                    left join direccion d on d.idDireccion = s.idDireccion
                    left join localidad l on l.idLocalidad = d.idLocalidad
                    WHERE s.baja = 0";
        $sucursal = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $sucursal[] = $fila;
            }
            $result->free();
        }
        return $sucursal;
    }
    
      public function getVerifCupon($descCupon,$idUsr){
           $usuario = (int) $this->connection->real_escape_string($idUsr);
        $query = "select c.idCupon as idCup, c.descripcion as desCup, c.montoDescuento as descuento
                    from cupon_cliente cc
                    left join cupon c on c.idCupon = cc.idCupon
                    where cc.idCliente = $usuario
                    and cc.estado = 'SI'
                    and c.descripcion = '$descCupon'";
        $cupon = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $cupon[] = $fila;
            }
            $result->free();
        }
        return $cupon;
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