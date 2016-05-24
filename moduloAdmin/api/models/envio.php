<?php
require_once("connection.php");

class Envio
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT distinct suc1.nroSucursal as nroSucursal1, suc2.nroSucursal as nroSucursal2, envio_sucursal.tardanza FROM envio_sucursal, Sucursal, (SELECT sucursal.nroSucursal from sucursal, envio_sucursal where sucursal.idSucursal = envio_sucursal.idSucursal1) suc1, (SELECT sucursal.nroSucursal from sucursal, envio_sucursal where sucursal.idSucursal = envio_sucursal.idSucursal2) suc2  where envio_sucursal.idSucursal1 in (SELECT idSucursal from sucursal) and envio_sucursal.idSucursal2 in (SELECT idSucursal from sucursal) group by sucursal.nroSucursal";
        $envios = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $envios[] = $fila;
            }
            $result->free();
        }
        return $envios;
    }
}