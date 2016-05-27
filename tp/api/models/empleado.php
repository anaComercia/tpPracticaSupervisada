<?php
require_once("connection.php");

class Empleado
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from empleado where baja = 0";
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
        $query = "SELECT emp.*, usu.*, per.* from empleado emp, usuario usu, persona per where emp.idUsuario = usu.idUsuario and usu.idPersona = per.idPersona and emp.baja = 0";
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
    
     public function getTipoDoc(){
        $query = "SELECT * from tipo_dni";
        $array = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $array[] = $fila;
            }
            $result->free();
        }
        return $array;
    }
    
     public function create($empleado){
        $idUsuario = $this->connection->real_escape_string($empleado['idUsuario']);
        $puesto = $this->connection->real_escape_string($empleado['puesto']);
        $query = "INSERT INTO empleado VALUES (
                    DEFAULT,
                    '$idUsuario','$puesto',0)";
        if($this->connection->query($query)){
            $empleado['idEmpleado'] = $this->connection->insert_id;
            return $empleado;
        }else{
            return false;
        }
    }
    
     public function update($empleado){
        $idEmpleado = $this->connection->real_escape_string($empleado['idEmpleado']);
        $puesto = $this->connection->real_escape_string($empleado['puesto']);
        $query = "update empleado set puesto = '$puesto' where idEmpleado = '$idEmpleado'";
        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }
    
      public function remove($idEmpleado){
        $id = $this->connection->real_escape_string($idEmpleado);
        $query = "update empleado set baja = 1 where idEmpleado = '$id'";
        if($this->connection->query($query)){
            return true;
        }else{
            return false;
        }
    }
}