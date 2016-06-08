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
        $query = "SELECT s.idSucursal as id, d.direccion as dir, d.cp as cp , l.descripcion as des
                    FROM sucursal s
                    left join direccion d on d.idDireccion = s.idDireccion
                    left join localidad l on l.idLocalidad = d.idLocalidad
                    WHERE s.baja = 0
                    and s.nroSucursal != 0";
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
    public function getDetalleCompra($idCompra,$idSucu){
        $compra = (int) $this->connection->real_escape_string($idCompra);
        $sucu= (int) $this->connection->real_escape_string($idSucu);

        $query = "select s.nroSucursal as nroSuc, d.direccion as dir, d.cp as cp, dc.cantidad as cant,
                    l.descripcion as loc, p.descripcion as prov, t.descripcion as descTalle,
                    c.descripcion as descColor, prod.titulo as tit, prod.precio as precio,
                    prod.descripcion as prodDesc, prod.urlImagen as img, g.descripcion as sexo,
                    cat.descripcion as descCat
                    from detalle_compra dc
                    left join compra com on com.idCompra = dc.idCompra
                    left join stock_producto sp on sp.codSku = dc.codSku
                    left join sucursal s on s.idSucursal=sp.idSucursal
                    left join direccion d on d.idDireccion = s.idDireccion
                    left join localidad l on d.idLocalidad = l.idLocalidad
                    left join provincia p on p.idProvincia = l.idProvincia
                    left join presentacion_producto pp on pp.codSku = sp.codSku
                    left join talle t on t.idTalle = pp.idTalle
                    left join color c on c.idColor = pp.idColor
                    left join producto prod on prod.idProducto = pp.idProducto
                    left join genero g on g.idGenero = prod.idGenero
                    left join categoria cat on cat.idCategoria = prod.idCategoria
                    where com.idCompra = $compra
                    and com.idSucursal = $sucu ";

        $detalle = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $detalle[] = $fila;
            }
            $result->free();
        }
        return $detalle;
    }
    public function getDetalleTarjeta($idCompra){
        $compra = (int) $this->connection->real_escape_string($idCompra);
       

        $query = "select t.descripcion as tarjeta, b.descripcion as banco, tb.cuotas as cuotas, d.direccion as dire,
                    l.descripcion as localidad, p.descripcion as provincia,d.cp as cp,lug.tardanzaDias as dias,
                    prod.titulo as tit, prod.precio as precio, dc.cantidad as cant, prod.urlImagen as img, ta.descripcion as descTalle,
                    col.descripcion as descColor, lug.costo as costo
                    from detalle_compra dc
                    left join compra c on c.idCompra = dc.idCompra
                    left join tarjeta_banco tb on tb.idTarjetaBanco = c.idTarjetaBanco
                    left join tarjeta t on t.idTarjeta = tb.idTarjeta
                    left join banco b on b.idBanco = tb.idBanco
                    left join direccion d on d.idDireccion = c.idDireccion
                    left join localidad l on l.idLocalidad = d.idLocalidad
                    left join provincia p on p.idProvincia = l.idProvincia
                    left join presentacion_producto st on st.codSku = dc.codSku
                    left join producto prod on prod.idProducto = st.idProducto
                    left join talle ta on ta.idTalle = st.idTalle
                    left join color as col on col.idColor = st.idColor
                    left join envio_lugar lug on lug.idLocalidad = l.idLocalidad
                    where dc.idCompra = $compra ";

        $detalle = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $detalle[] = $fila;
            }
            $result->free();
        }
        return $detalle;
    }
    public function consultarStock(){
        $query = "select sp.idStock
                    from stock_producto sp
                    left join presentacion_producto pp on pp.codSku = sp.codSku
                    left join producto p on p.idProducto = pp.idProducto
                    where sp.cantidad < p.puntoReposicion
                    and sp.idStock not in (select ap.idStock
                                            FROM aviso_producto ap)";
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
        public function traerMaxCupon($idUsuario){
           $usuario = (int) $this->connection->real_escape_string($idUsuario);
        $query = "select c.montoDescuento, c.idCupon
                    from cupon  c
                    where c.baja = 0 
                    and c.montoDescuento = (SELECT max(montoDescuento)
                                        from cupon
                                         where baja = 0 )
                    and c.idCupon not in (Select idCupon
                                         from cupon_cliente
                                         where idCliente = $usuario) ";
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
    public function getLocalidadEnvio($idLocalidad){
           $bco = (int) $this->connection->real_escape_string($idLocalidad);
        $query = "select lug.tardanzaDias as dias, lug.costo as precio
                    from direccion d
                    left join envio_lugar lug on lug.idLocalidad = d.idLocalidad
                    where d.idDireccion = $bco 
                    and lug.baja = 0";
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

     
         /*$querySP =
        "SELECT idStock as id
            FROM stock_producto
            WHERE codSku = $sku";
        
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
        return $this->connection->query($queryPersona);
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
     public function asignarCupCliente($data){
        $id=      (int) $this->connection->real_escape_string($data['idUsuario']);
        $cupon=   (int) $this->connection->real_escape_string($data['idCupon']);
   
       //Insert en tabla: cupon_cliente
       $queryPersona =
        "INSERT INTO cupon_cliente
        (idCupon, idCliente, estado) 
           VALUES
        ($cupon,
            $id,
            'NO')";

       //print($queryPersona);
       
        if($this->connection->query($queryPersona)){
            $data['idCliente'] = $this->connection->insert_id;
            $idPersona=$data['idCliente'];
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
        $query = "SELECT idCompra as compra, cc.montoDescuento as cupon, idTarjetaBanco as tarjetaBco, idSucursal as sucu, idDireccion as dir,
                    monto as precio,fechaCompra as fechaC, fechaPago as fechaP, estado as e, tipoPago as formaPago
                    from compra 
                    left join cupon cc on cc.idCupon = compra.idCupon
                    where idCliente = $idPro 
                    order by estado DESC, fechaCompra DESC";
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