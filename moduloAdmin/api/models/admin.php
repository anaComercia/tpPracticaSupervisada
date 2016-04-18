<?php
require_once("connection.php");

class Admin
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll($id){
        $query = "SELECT * from Empleado, Usuario, Persona, Direccion where Empleado.idUsuario = Usuario.idUsuario and Usuario.idPersona = Persona.idPersona and Empleado.puesto = 'Administrador' and Usuario.usuario = '$id' and Persona.idDireccion = Direccion.idDireccion";
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