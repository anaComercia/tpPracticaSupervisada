<?php
require_once("connection.php");

class Imagen
{
    private $connection;
    
    public function __construct(){
        $this->connection = Connection::getInstance();
    }
    
    public function getAll(){
        $query = "SELECT * FROM imagenes";
        $array = array();
        if( $result = $this->connection->query($query) ){
            while($fila = $result->fetch_assoc()){
                $array[] = $fila;
            }
            $result->free();
        }
        return $array;
    }
    
      public function update($fotos){
         $urls = $fotos['urls'];
         $carrusel1 = null;
         $carrusel2 = null;
         $carrusel3 = null;
         $carrusel4 = null;
         $carrusel5 = null;
         $carrusel6 = null;
         $bannerIzq = null;
         $bannerDer = null;
         $modulo = null;
          
         $len = count($urls);
            for($i = 0; $i < $len; $i++) {
                switch ($i) {
                case 0:
                    $carrusel1 = $urls[$i];
                    break;
                case 1:
                    $carrusel2 = $urls[$i];
                    break;
                case 2:
                    $carrusel3 = $urls[$i];
                    break;
                case 3:
                    $carrusel4 = $urls[$i];
                    break;
                case 4:
                    $carrusel5 = $urls[$i];
                    break;
                case 5:
                    $carrusel6 = $urls[$i];
                    break;
                case 6:
                    $bannerIzq = $urls[$i];
                    break;
                case 7:
                    $bannerDer = $urls[$i];
                    break;
                case 8:
                    $modulo = $urls[$i];
                    break;
                }
            }
         
        $query = "UPDATE imagenes SET carrusel1 = '$carrusel1', carrusel2 = '$carrusel2', carrusel3 = '$carrusel3', carrusel4 = '$carrusel4', carrusel5 = '$carrusel5', carrusel6 = '$carrusel6', bannerIzq = '$bannerIzq', bannerDer = '$bannerDer', modulo = '$modulo' WHERE  idImagenes = 1";
        return $this->connection->query($query);
    }
}