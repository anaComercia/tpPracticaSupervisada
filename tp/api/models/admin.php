<?php
require_once("connection.php");

class Admin
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll($id){
        $query = "SELECT * from empleado, usuario, persona, direccion where empleado.idUsuario = usuario.idUsuario and usuario.idPersona = persona.idPersona and empleado.puesto = 'Administrador' and usuario.usuario = '$id' and persona.idDireccion = direccion.idDireccion";
        $array = array();
        try {
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $array[] = $fila;
            }
            $result->free();
        }
        }catch (Exception $e) {
        throw $e;
        }
        return $array;
    }

    
    
    
    
    
}