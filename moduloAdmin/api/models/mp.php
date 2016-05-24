<?php
require_once("connection.php");

class Mp
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * from mp where baja = 0";
        $mp = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $mp[] = $fila;
            }
            $result->free();
        }
        return $mp;
    }
    
     public function getPrecios($idMp){
        $id = $this->connection->real_escape_string($idMp);
        $query = "SELECT * from precio_mp where precio_mp.idMp = '$idMp'";
        $mp = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $mp[] = $fila;
            }
            $result->free();
        }
        return $mp;
    }
    
      public function create($mp){
        $titulo = $this->connection->real_escape_string($mp['titulo']);
        $unidad = $this->connection->real_escape_string($mp['unidad']);
        $puntoReposicion = $this->connection->real_escape_string($mp['puntoReposicion']);
        $query = "INSERT INTO mp VALUES (
                    DEFAULT,
                    '$titulo', '$unidad',null, '$puntoReposicion',0)";
        if($this->connection->query($query)){
            $mp['idMp'] = $this->connection->insert_id;
            return $mp;
        }else{
            return false;
        }
    }
    
      public function createPrecio($mp){
        $idMp = $this->connection->real_escape_string($mp['idMp']);
        $precio = $this->connection->real_escape_string($mp['precio']);
        $cantidad = $this->connection->real_escape_string($mp['cantidad']);
        $query = "INSERT INTO precio_mp VALUES ('$idMp','$precio','$cantidad')";
         if($this->connection->query($query)){
            $mp['idPrecio'] = $this->connection->insert_id;
            return $mp;
        }else{
            return false;
        }     
    }
    
     public function update($mp){
         $puntoReposicion=null;
        $id = $this->connection->real_escape_string($mp['idMp']);
        $titulo = $this->connection->real_escape_string($mp['titulo']);
        $medida =$this->connection->real_escape_string($mp['medida']);
        try{
        $puntoReposicion = $this->connection->real_escape_string($mp['puntoReposicion']);
        }catch(\Exception $e){}
        $query = "UPDATE mp SET titulo = '$titulo', medida = '$medida', puntoReposicion = '$puntoReposicion' WHERE  idMP = '$id'";
        return $this->connection->query($query);
    }
    
      public function removePrecio($mpId){
        $id = $this->connection->real_escape_string($mpId);
        $query = "delete from precio_mp
                  WHERE idMp = '$id'";
        return $this->connection->query($query);
    }
    
      public function remove($mpId){
        $id = $this->connection->real_escape_string($mpId);
        $query = "UPDATE mp SET baja='1'
                  WHERE idMP = $id";
        return $this->connection->query($query);
    }
    
}