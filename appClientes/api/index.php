<?php

//Esto va siempre
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

//Acá se traen todos los archivos php que tienen los métodos para operar con la bd
//require_once("models/carrito.php");
//require_once("models/contacto.php");
//require_once("models/crearCuenta.php");
//require_once("models/formaPago.php");
//require_once("models/iniciarSesion.php");
require_once("models/inicio.php");
//require_once("models/perfil.php");
require_once("models/producto.php");
require_once("models/footer.php");
//Esto va siempre
require_once("util/jsonResponse.php");
require 'Slim/Slim/Slim.php';

//Esto va siempre
Slim\Slim::registerAutoloader();
$app = new Slim\Slim();

//Acá están operaciones de la bd a las que se llega desde el ProductoService al pegarle a index.php

//Se llega a cada una si coincide la operacion get, put, delete o post con la ruta solicitada y los parámetros

$app->get('/inicio', function(){

	$telefono = new Producto();
	$data = $telefono->getTelefonos();
	sendResult($data);
});
$app->get('/productos', function(){

	$producto = new Producto();
	$data = $producto->getAllProductos();
	sendResult($data);
});
$app->get('/productosHombre', function(){

	$producto = new Producto();
	$data = $producto->getProductosHombre();
	sendResult($data);
});
$app->get('/productosMujer', function(){

	$producto = new Producto();
	$data = $producto->getProductosMujer();
	sendResult($data);
});
$app->get('/productosCamisa', function(){

	$producto = new Producto();
	$data = $producto->getProductosCamisa();
	sendResult($data);
});
$app->get('/productosJean', function(){

	$producto = new Producto();
	$data = $producto->getProductosJean();
	sendResult($data);
});
$app->get('/productosCampera', function(){

	$producto = new Producto();
	$data = $producto->getProductosCampera();
	sendResult($data);
});
$app->get('/productosRemera', function(){

	$producto = new Producto();
	$data = $producto->getProductosRemera();
	sendResult($data);
});
/*
$app->get('/productos', function(){
	$producto = new Producto();
	$data = $producto->getProductosHombre();
	sendResult($data);
});
$app->get('/productos', function(){
	$producto = new Producto();
	$data = $producto->getProductosMujer();
	sendResult($data);
});
$app->get('/productos', function(){
	$producto = new Producto();
	$data = $producto->getProductosCamisa();
	sendResult($data);
});
$app->get('/productos', function(){
	$producto = new Producto();
	$data = $producto->getProductosJean();
	sendResult($data);
});
$app->get('/productos', function(){
	$producto = new Producto();
	$data = $producto->getProductosCampera();
	sendResult($data);
});
$app->get('/productos', function(){
	$producto = new Producto();
	$data = $producto->getProductosRemera();
	sendResult($data);
});
*/
$app->get('/productosDetail/:id', function($id){
	$producto = new Producto();
	$data = $producto->getDetalleProducto($id);
	sendResult($data);
});

$app->run();