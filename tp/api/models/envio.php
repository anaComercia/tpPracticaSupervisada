<?php
require_once("connection.php");

class Envio
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT distinct suc1.nroSucursal as nroSucursal1, suc2.nroSucursal as nroSucursal2, envio_sucursal.tardanza, envio_sucursal.idEnvioSucursal FROM envio_sucursal inner join (SELECT sucursal.* from sucursal, envio_sucursal where sucursal.idSucursal = envio_sucursal.idSucursal1) suc1 on envio_sucursal.idSucursal1 = suc1.idSucursal inner join (SELECT sucursal.* from sucursal, envio_sucursal where sucursal.idSucursal = envio_sucursal.idSucursal2) suc2 on envio_sucursal.idSucursal2 = suc2.idSucursal order by nroSucursal1, nroSucursal2";
        $envios = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $envios[] = $fila;
            }
            $result->free();
        }
        return $envios;
    }
    
     public function inicializarSucursales($envio){
        $idSuc1 = $this->connection->real_escape_string($envio['idSuc1']);
        $idSuc2 = $this->connection->real_escape_string($envio['idSuc2']);
        $query = "INSERT INTO envio_sucursal VALUES (
                    DEFAULT,
                    '$idSuc1', '$idSuc2', 1)";
        if($this->connection->query($query)){
            $envio['idEnvioSucursal'] = $this->connection->insert_id;
            return $envio;
        }else{
            return false;
        }
    }
    
     public function deleteAll(){
        $query = "Delete from envio_sucursal";
        $envios = array();
        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }

       public function update($envios){
        $idEnvio = $this->connection->real_escape_string($envios['idEnvioSucursal']);
        $tardanza = $this->connection->real_escape_string($envios['tardanza']);
        $query = "UPDATE envio_sucursal SET
                         tardanza = '$tardanza'
                  WHERE  idEnvioSucursal = '$idEnvio'";
        return $this->connection->query($query);
    }
    
}