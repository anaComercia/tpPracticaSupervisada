<?php
require_once("connection.php");

class Usuario
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
    
    public function create($user){
        $usuario = $this->connection->real_escape_string($user['usuario']);
        $password = $this->connection->real_escape_string($user['pass']);
        $idPersona = $this->connection->real_escape_string($user['idPersona']);
        $query = "INSERT INTO usuario VALUES (
                    DEFAULT,
                    '$usuario','$password','$idPersona', 1)";
        if($this->connection->query($query)){
            $user['idUsuario'] = $this->connection->insert_id;
            return $user;
        }else{
            return false;
        }
    }

    public function update($user){
        $usuario = $this->connection->real_escape_string($user['usuario']);
        $password = $this->connection->real_escape_string($user['pass']);
        $idUsuario = $this->connection->real_escape_string($user['idUsuario']);
        $query = "UPDATE usuario SET
                         usuario = '$usuario', password = '$password'
                  WHERE  idUsuario = '$idUsuario'";
        return $this->connection->query($query);
    }

     public function updateHabilitacion($user){
        $habilitado = $this->connection->real_escape_string($user['habilitado']);
        $idUsuario = $this->connection->real_escape_string($user['idUsuario']);
        $query = "UPDATE usuario SET
                         habilitado = '$habilitado'
                  WHERE  idUsuario = '$idUsuario'";
        return $this->connection->query($query);
    }
    
}