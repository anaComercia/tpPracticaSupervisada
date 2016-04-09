<?php

//Esto va siempre
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

//Acá se traen todos los archivos php que tienen los métodos para operar con la bd
//require_once= Son los includes
//Hacemos uno por cada controller
require_once("models/genero.php");
require_once("models/categoria.php");
require_once("models/producto.php");
require_once("models/mp.php");
require_once("models/talle.php");

//Esto va siempre
require_once("util/jsonResponse.php");
require 'Slim/Slim/Slim.php';//Slim frawork que usamos para conectamos a la DB 

//Esto va siempre
Slim\Slim::registerAutoloader();
$app = new Slim\Slim();//$app  se instancia el objeto Slim

//Acá están operaciones de la bd a las que se llega desde el ProductoService al pegarle a index.php

//Se llega a cada una si coincide la operacion get, put, delete o post con la ruta solicitada y los parámetros
$app->get('/productos', function(){ //-> accedemos a un atributo o metodo
	//Se instancia un objeto producto
    $producto = new Producto(); //$producto es un objeto, todos los ojetos empiezan con $
    //Se llama al metodo getall, en php se usa -> en lugar del . para ejecutar un metodo
	$data = $producto->getAll();
    //Se devuelve la informacion
	sendResult($data); // = que return
});

$app->delete('/productos/:id', function($id){
	$producto = new Producto();
	$result = $producto->remove($id);
	if($result){
		sendResult("producto eliminado");
	}else{
		sendError("Error al eliminar el producto");
	}
});

$app->put('/productos', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); 

	$producto = new Producto();
    $result = $producto->update($data);
	
	if($result){
		sendResult("Producto actualizado");
	}else{
		sendError("Error al actualizar el producto");
	}
});

$app->post('/productos', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	
	$producto = new Producto();
    $result = $producto->create($data);
	
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear el producto");
	}
});




$app->get('/categorias', function(){
	$categoria = new Categoria();
	$data = $categoria->getAll();
	sendResult($data);
});

$app->get('/categorias/:id', function($id){
	$categoria = new Categoria();
	$data = $categoria->get($id);
	sendResult($data);
});

$app->post('/categorias', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	$categoria = new Categoria();
    $result = $categoria->create($data);
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear la categoría");
	}
});

$app->put('/categorias', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); 

	$categoria = new Categoria();
    $result = $categoria->update($data);
	
	if($result){
		sendResult("categoria actualizada");
	}else{
		sendError("Error al actualizar la categoría");
	}
});

$app->delete('/categorias/:id', function($id){
	$categoria = new Categoria();
	$result = $categoria->remove($id);
	if($result){
		sendResult("categoria eliminada");
	}else{
		sendError("Error al eliminar la categoría");
	}
});



$app->get('/genero', function(){
	$genero = new Genero();
	$data = $genero->getAll();
	sendResult($data);
});

$app->get('/mp', function(){
	$mp = new Mp();
	$data = $mp->getAll();
	sendResult($data);
});

$app->get('/preciomp', function(){
	$mp = new Mp();
	$data = $mp->getAllPrecios();
	sendResult($data);
});

$app->get('/talle', function(){
	$talle = new Talle();
	$data = $talle->getAll();
	sendResult($data);
});

$app->run();