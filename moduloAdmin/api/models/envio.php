<?php
require_once("connection.php");

class Envio
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT distinct suc1.nroSucursal as nroSucursal1, suc2.nroSucursal as nroSucursal2, EnvioSucursal.tardanza FROM EnvioSucursal, Sucursal, (SELECT Sucursal.nroSucursal from Sucursal, EnvioSucursal where Sucursal.idSucursal = EnvioSucursal.idSucursal1) suc1, (SELECT Sucursal.nroSucursal from Sucursal, EnvioSucursal where Sucursal.idSucursal = EnvioSucursal.idSucursal2) suc2  where EnvioSucursal.idSucursal1 in (SELECT idSucursal from Sucursal) and EnvioSucursal.idSucursal2 in (SELECT idSucursal from Sucursal) group by Sucursal.nroSucursal";
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