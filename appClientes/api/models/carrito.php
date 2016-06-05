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
                WHERE b.baja = 0
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
                    where tb.idBanco =  $prodId
                    and t.baja = 0";
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
    
      public function getDomicilios($idUsuario){
        $id = (int) $this->connection->real_escape_string($idUsuario);
        
        $query = "SELECT d.direccion as dire, d.cp as cp, d.idDireccion as id 
                    FROM persona_direccion pd
                    left join usuario u on u.idPersona = pd.idPersona
                    left join direccion d on d.idDireccion = pd.idDireccion
                    WHERE u.idUsuario = $idUsuario ";
         $talle = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $talle[] = $fila;
            }
            $result->free();
        }
        return $talle; 
    }
    
    public function getLocalidades($idProv){
        $id = (int) $this->connection->real_escape_string($idProv);
        
        $query = "SELECT l.idLocalidad as idLoc, l.descripcion as descri 
                FROM localidad l
                WHERE l.idProvincia = $idProv
                and l.baja = 0
                order by l.descripcion asc ";
         $talle = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $talle[] = $fila;
            }
            $result->free();
        }
        return $talle; 
    }
    
    public function getProvincias(){
        $query = "select p.idProvincia as idProv, p.descripcion as descr
                    from provincia p
                    where p.baja = 0
                    order by p.descripcion asc";
        $sucursal = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $sucursal[] = $fila;
            }
            $result->free();
        }
        return $sucursal;
    }
    
     public function getSucursales(){
        $query = "SELECT d.idDireccion as id, d.direccion as dir, d.cp as cp , l.descripcion as des
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
                    and cc.estado = 'NO'
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
    public function consultarStock(){
        $query = "select sp.idStock 
                from stock_producto SP 
                left join presentacion_producto pp on pp.codSku = sp.codSku 
                left join producto p on p.idProducto = pp.idProducto 
                where p.puntoReposicion < sp.cantidad";
        $cupon = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $cupon[] = $fila;
            }
            $result->free();
        }
        return $cupon;
    }
    
    public function getIdPersona($idUsr){
           $usuario = (int) $this->connection->real_escape_string($idUsr);
        $query = "select idPersona as id from usuario where idUsuario= $usuario";
        $cupon = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $cupon[] = $fila;
            }
            $result->free();
        }
        return $cupon;
    }
     public function getTarjetaBcoId($idBco,$idTarj,$cuotas){
           $bco = (int) $this->connection->real_escape_string($idBco);
           $tarj = (int) $this->connection->real_escape_string($idTarj);
         $c = $this->connection->real_escape_string($cuotas);
        $query = "select idTarjetaBanco as id 
                    from tarjeta_banco
                    WHERE idTarjeta = $tarj
                    and idBanco = $bco
                    and cuotas = '$c'";
        $cupon = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $cupon[] = $fila;
            }
            $result->free();
        }
        return $cupon;
    }
    public function actualizarCupon($data){
       
        $idCupon=       $this->connection->real_escape_string($data['idCupon']);
        $idUsuario =        $this->connection->real_escape_string($data['idUsuario']);

       //Insert en tabla: cupon_cliente
       $queryPersona =
        "UPDATE cupon_cliente
            set estado = 'SI'
            WHERE idCupon = '$idCupon'
            AND idCliente = '$idUsuario'";

        return $this->connection->query($queryPersona);
    }
    
    public function actualizarStock($data){
       
        $sku=  $this->connection->real_escape_string($data['sku']);
        $cantidad = 1;

       //Insert en tabla: stock_producto
       $queryPersona =
        "UPDATE stock_producto
            set cantidad = cantidad - $cantidad
            WHERE codSku = $sku";

     
         $querySP =
        "SELECT idStock as id
            FROM stock_producto
            WHERE codSku = $sku";
        var_dump($querySP);
        /*
        $query = "select sp.idStock 
                from stock_producto SP 
                left join presentacion_producto pp on pp.codSku = sp.codSku 
                left join producto p on p.idProducto = pp.idProducto 
                where p.puntoReposicion > sp.cantidad
                and sp.idStock = $stock
                and sp.codSku = $sku";
        var_dump($query);
        $alerta = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $alerta[] = $fila;
            }
            $result->free();
        }
        return $alerta;*/
        return $this->connection->query($querySP);
    }
    
    public function create($data){
       
        $dire=       $this->connection->real_escape_string($data['direccion']);
        $cp =        $this->connection->real_escape_string($data['cp']);
        $provId =    $this->connection->real_escape_string($data['provincia']);
        $locId =     $this->connection->real_escape_string($data['localidad']);
        $persId =    $this->connection->real_escape_string($data['usuario']);
        
       //Insert en tabla: direccion
        $queryDireccion =
         "INSERT INTO direccion
        (idDireccion, idLocalidad, direccion, cp) 
            VALUES
        (DEFAULT,
        '$locId',
        '$dire',
        '$cp')";   
        
       //var_dump($queryDireccion);

       if($this->connection->query($queryDireccion)){
            $data['idDireccion'] = $this->connection->insert_id;
            $idDireccion=$data['idDireccion'] ;
        }else{
            return false;
        }
       
   
       //Insert en tabla: persona_direccion
       $queryPersona =
        "INSERT INTO persona_direccion
        (idPersona, idDireccion) 
           VALUES
        ('$persId'
         ,'$idDireccion')";

       //print($queryPersona);
       
        if($this->connection->query($queryPersona)){
            $data['idPersona'] = $this->connection->insert_id;
            $idPersona=$data['idPersona'];
            return $data;
        }else{
            return false;
        }
       
        
    }
     public function createAlerta($data){
       
        $id=       $this->connection->real_escape_string($data['idStock']);
        date_default_timezone_set('America/Argentina/Buenos_Aires');
         $date= date('Y-m-d') ;
        $queryDireccion =
         "INSERT INTO aviso_producto
        (	idAvisoProducto, idStock, fecha, estado) 
            VALUES
        (DEFAULT,
        '$id',
        '$date',
        'PENDIENTE')";   
        
         
        if($this->connection->query($queryDireccion)){
            $data['idPersona'] = $this->connection->insert_id;
            $queryDireccion=$data['idPersona'];
            return $data;
        }else{
            return false;
        }
       
        
    }
     public function createCompraEfectivo($data){

            $clienteId=       $this->connection->real_escape_string($data['idUsuario']);
            $cuponId =        $this->connection->real_escape_string($data['idCupon']);
            $sucuId =     $this->connection->real_escape_string($data['idSucursal']);
            $total=       $this->connection->real_escape_string($data['totalPagar']);
            $estadoCompra=       $this->connection->real_escape_string($data['estado']);
            $formaPago=       $this->connection->real_escape_string($data['tipoPago']);
         $fechaCompra=       $this->connection->real_escape_string($data['fechaCompra']);
            //$lista=       $this->connection->real_escape_string($entryArray[$data['detalle']]);
          //var_dump($fechaPago);
         date_default_timezone_set('America/Argentina/Buenos_Aires');
         $date= date('Y-m-d') ;
         
             if(($cuponId == "0") || ($cuponId == 0)){
                 $queryCompra =
                 "INSERT INTO compra
                (idCompra, idCliente, idCupon, idTarjetaBanco, idSucursal, idDireccion, monto, fechaCompra,
                fechaTarjeta,fechaPago, estado,numeroTarjeta,tipoPago) 
                    VALUES
                (DEFAULT,
                '$clienteId',
                NULL,
                NULL,
                '$sucuId',
                NULL,
                '$total',
                '$date',
                NULL,
                NULL,
                '$estadoCompra',
                NULL,
                '$formaPago')";
             }else{
                 $queryCompra =
                 "INSERT INTO compra
                (idCompra, idCliente, idCupon, idTarjetaBanco, idSucursal, idDireccion, monto, fechaCompra,
                fechaTarjeta, fechaPago,estado,numeroTarjeta,tipoPago) 
                    VALUES
                (DEFAULT,
                '$clienteId',
                '$cuponId',
                NULL,
                '$sucuId',
                NULL,
                '$total',
                '$date',
                NULL,
                NULL,
                '$estadoCompra',
                NULL,
                '$formaPago')";
             }

             if($this->connection->query($queryCompra)){
                    $data['idCompra'] = $this->connection->insert_id;
                    $idCompra=$data['idCompra'] ;
                    return $data;
                }else{
                    return false;
                }


        }
    
     public function createCompraTarjeta($data){

            $idDireccion=       $this->connection->real_escape_string($data['idDireccion']);
            $fechaTarjeta=       $this->connection->real_escape_string($data['fechaTarjeta']);
            $fechaPago=       $this->connection->real_escape_string($data['fechaPago']);
            $nroTarjeta=       $this->connection->real_escape_string($data['nroTarjeta']);

            $clienteId=       $this->connection->real_escape_string($data['idUsuario']);
            $cuponId =        $this->connection->real_escape_string($data['idCupon']);
            $sucuId =     $this->connection->real_escape_string($data['idSucursal']);
            $total=       $this->connection->real_escape_string($data['totalPagar']);
            $estadoCompra=       $this->connection->real_escape_string($data['estado']);
            $formaPago=       $this->connection->real_escape_string($data['tipoPago']);
            $fechaCompra=       $this->connection->real_escape_string($data['fechaCompra']);
 $idTarjetaBanco=       $this->connection->real_escape_string($data['idTarjetaBanco']);
         // $lista=       $this->connection->real_escape_string($data['detalle']);
         
         date_default_timezone_set('America/Argentina/Buenos_Aires');
         $date= date('Y-m-d') ;

             if(($cuponId == "0") || ($cuponId == 0)){
                 $queryCompra =
                 "INSERT INTO compra
                (idCompra, idCliente, idCupon, idTarjetaBanco, idSucursal, idDireccion, monto, fechaCompra,
                fechaTarjeta,fechaPago, estado,numeroTarjeta,tipoPago) 
                    VALUES
                (DEFAULT,
                '$clienteId',
                NULL,
                '$idTarjetaBanco',
                NULL,
                '$idDireccion',
                '$total',
                '$date',
                '$fechaTarjeta',
                '$date',
                '$estadoCompra',
                '$nroTarjeta',
                '$formaPago')";
             }else{
                 $queryCompra =
                 "INSERT INTO compra
                (idCompra, idCliente, idCupon, idTarjetaBanco, idSucursal, idDireccion, monto, fechaCompra,
                fechaTarjeta,fechaPago, estado,numeroTarjeta,tipoPago) 
                    VALUES
                (DEFAULT,
                '$clienteId',
                '$cuponId',
                '$idTarjetaBanco',
                NULL,
                '$idDireccion',
                '$total',
                '$date',
                '$fechaTarjeta',
                '$date',
                '$estadoCompra',
                '$nroTarjeta',
                '$formaPago')";
             }

             if($this->connection->query($queryCompra)){
                    $data['idCompra'] = $this->connection->insert_id;
                    $idCompra=$this->connection->real_escape_string($data['idCompra']);
                    return $data;
                }else{
                    return false;
                }


        }
    
     public function insertDetalleCompra($data){

            $compraId=       $this->connection->real_escape_string($data['idCompra']);
            $codSku =        $this->connection->real_escape_string($data['sku']);
            $cant =     $this->connection->real_escape_string($data['cantidad']);
            $precio=       $this->connection->real_escape_string($data['precioUnitario']);

                 $queryCompra =
                 "INSERT INTO detalle_compra
                (idCompra, codSku, cantidad, precio) 
                    VALUES
                ('$compraId',
                '$codSku',
                '$cant',
                '$precio')";
 /*     var_dump($data);
         var_dump($compraId);
         var_dump($codSku);
         var_dump($cant);
         var_dump($precio);
         var_dump($queryCompra);
*/
             if($this->connection->query($queryCompra)){
                    $data['idCompra'] = $this->connection->insert_id;
                    $idCompra=$data['idCompra'] ;
                    return $data;
                }else{
                    return false;
                }


        }
    
           public function getCompras($idUsuario){
      //  $idProd = (int) $this->connection->real_escape_string($producto['productoSeleccionado']);
       // $idTalle = (int) $this->connection->real_escape_string($producto['talleSeleccionado']);
        $idPro = (int) $this->connection->real_escape_string($idUsuario);
        $query = "SELECT idCompra as compra, idCupon as cupon, idTarjetaBanco as tarjetaBco, idSucursal as sucu, idDireccion as dir,
                    monto as precio,fechaCompra as fechaC, fechaPago as fechaP, estado as e, tipoPago as formaPago
                    from compra
                    where idCliente = $idPro";
         $color = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $color[] = $fila;
            }
            $result->free();
        }
        return $color; 
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