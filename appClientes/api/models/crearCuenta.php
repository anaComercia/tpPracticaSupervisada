<?php
require_once("connection.php");

class CrearCuenta
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }

  
}
