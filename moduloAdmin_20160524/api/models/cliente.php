<?php
require_once("connection.php");

class Cliente
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from Cliente";
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
        $query = "SELECT cli.*, usu.*, per.* from Cliente cli, Usuario usu, Persona per where cli.idUsuario = usu.idUsuario and usu.idPersona = per.idPersona";
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
        $query = "SELECT * from Cliente, Usuario, Persona, Direccion where Cliente.idUsuario = Usuario.idUsuario and Usuario.idPersona = Persona.idPersona and Usuario.usuario = '$id' and Persona.idDireccion = Direccion.idDireccion";
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