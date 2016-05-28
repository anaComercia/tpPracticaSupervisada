<?php
require_once("connection.php");

class Perfil
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }

    public function getReputacion($idUser){
        $id = (int) $this->connection->real_escape_string($idUser);
        $query = "select  c.reputacion as rep
                    from cliente c
                    where c.idUsuario = $id";
        
        $reputacion = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $reputacion[] = $fila;
            }
            $result->free();
        }
        return $reputacion; 
    }
    
    public function getCuponesUsados($prodId){
        $id = (int) $this->connection->real_escape_string($prodId);
        $query = "select c.descripcion,c.montoDescuento, cc.estado
                    from cupon c
                    left join cupon_cliente cc on cc.idCupon = c.idCupon
                    where cc.idCliente = $id 
                    and cc.estado = 'SI'";
         $cuponNuevo = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $cuponNuevo[] = $fila;
            }
            $result->free();
        }
        return $cuponNuevo; 
    }
    
    public function getCuponesNuevos($prodId){
        $id = (int) $this->connection->real_escape_string($prodId);
        $query = "select c.descripcion,c.montoDescuento, cc.estado
                    from cupon c
                    left join cupon_cliente cc on cc.idCupon = c.idCupon
                    where cc.idCliente = $id 
                    and c.baja = 0
                    and cc.estado = 'NO'";
         $cuponUsado = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $cuponUsado[] = $fila;
            }
            $result->free();
        }
        return $cuponUsado; 
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