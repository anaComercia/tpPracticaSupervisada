<?php
require_once("connection.php");

class Empleado
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from Empleado";
        $array = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $array[] = $fila;
            }
            $result->free();
        }
        return $array;
    }
    
     public function getAllDetalles(){
        $query = "SELECT emp.*, usu.*, per.* from Empleado emp, Usuario usu, Persona per where emp.idUsuario = usu.idUsuario and usu.idPersona = per.idPersona";
        $array = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $array[] = $fila;
            }
            $result->free();
        }
        return $array;
    }
    
     public function getAllPorId($id){
        $query = "SELECT * from Empleado, Usuario, Persona, Direccion where Empleado.idUsuario = Usuario.idUsuario and Usuario.idPersona = Persona.idPersona and Usuario.usuario = '$id' and Persona.idDireccion = Direccion.idDireccion";
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