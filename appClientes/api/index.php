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
/*$app->get('/carrito', function(){
    $producto = new Producto();
	$data = $producto->getAll();
	sendResult($data);
});

$app->get('/contacto', function(){
    $producto = new Producto();
	$data = $producto->getAllDetalles();
	sendResult($data);
});

$app->delete('/productos/:id', function($id){
	$producto = new Producto();
	$result = $producto->remove($id);
	if($result){
		sendResult("producto eliminado");
	}else{
		sendError("Error al eliminar el producto");
	}
});*/


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

/*
$app->get('/producto/:id', function($id){
	$categoria = new Categoria();
	$data = $categoria->get($id);
	sendResult($data);
});



$app->get('/crearCuenta', function(){
	$genero = new Genero();
	$data = $genero->getAll();
	sendResult($data);
});

$app->get('/footer', function(){
	$object = new Color();
	$data = $object->getAll();
	sendResult($data);
});

$app->get('/formaPago', function(){
	$mp = new Mp();
	$data = $mp->getAll();
	sendResult($data);
});

$app->get('/IniciarSesion', function(){
	$mp = new Mp();
	$data = $mp->getAllDetalles();
	sendResult($data);
});

$app->get('/perfil', function(){
	$mp = new Mp();
	$data = $mp->getAllPrecios();
	sendResult($data);
});


*/
$app->run();