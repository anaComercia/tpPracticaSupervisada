<?php
require_once("connection.php");

class Categoria
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * FROM categoria where baja = 0";
        $categorias = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $categorias[] = $fila;
            }
            $result->free();
        }
        return $categorias;
    }

    public function get($categoriaId){
        $id = (int) $this->connection->real_escape_string($categoriaId);
        $query = "SELECT categoria_id, categoria_desc FROM categorias WHERE categoria_id = $categoriaId and baja = 0";
        $r = $this->connection->query($query);
        return $r->fetch_assoc();
    }
    
    public function create($categoria){
        $descripcion = $this->connection->real_escape_string($categoria['categoria_desc']);
        $query = "INSERT INTO categoria VALUES (
                    DEFAULT,
                    '$descripcion',0)";
        if($this->connection->query($query)){
            $categoria['categoria_id'] = $this->connection->insert_id;
            return $categoria;
        }else{
            return false;
        }
    }

    public function update($categoria){
        $id = (int) $this->connection->real_escape_string($categoria['categoria_id']);
        $descripcion = $this->connection->real_escape_string($categoria['categoria_desc']);
        $query = "UPDATE categoria SET
                         descripcion = '$descripcion'
                  WHERE  idCategoria = '$id'";
        return $this->connection->query($query);
    }

    public function remove($categoriaId){
        $id = (int) $this->connection->real_escape_string($categoriaId);
        $query = "update categoria set baja = 1
                  WHERE idCategoria = $categoriaId";
        return $this->connection->query($query);
    }
}