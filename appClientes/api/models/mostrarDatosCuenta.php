<?php
require_once("connection.php");

class MostrarCuenta
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
   public function getAll(){
       
        //var_dump($data);
  
        $EmailUSuario= 'francoDataIQ@gmail.com';//adriana.programacion@gmail.com';   
        $DatosUsuario=array();
        $Fila=array();
       
        $query =
        "SELECT p.nombre, p.apellido 
        , p.numDni, p.tipoDni 
        , p.telefono, p.email ,p.fechaNacimiento 
        ,d.direccion, d.cp,d.idDireccion 
        ,l.idLocalidad,l.descripcion as descripcion_localidad 
        ,pr.idProvincia, pr.descripcion as descripcion_provincia 
        ,g.idGenero, g.descripcion as descripcion_genero 
        FROM persona p ,direccion d,localidad l,provincia pr,genero g 
        WHERE p.idDireccion=d.idDireccion 
        and d.idLocalidad=l.idLocalidad
        and l.idProvincia=pr.idProvincia
        and p.idGenero=g.idGenero 
        and p.email='$EmailUSuario'";
       
       // print($query);
       
        if( $result = $this->connection->query($query) ){
           $Fila= $result->fetch_assoc();
           $DatosUsuario[] = $Fila;
           $result->free();
        }
       
        //var_dump($DatosUsuario);
       
        return $DatosUsuario;
    }
}
