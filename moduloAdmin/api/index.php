<?php

//Esto va siempre
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

//Acá se traen todos los archivos php que tienen los métodos para operar con la bd
require_once("models/genero.php");
require_once("models/categoria.php");
require_once("models/producto.php");
require_once("models/mp.php");
require_once("models/talle.php");
require_once("models/avisoProducto.php");
require_once("models/stockProducto.php");
require_once("models/sucursal.php");
require_once("models/provincia.php");
require_once("models/localidad.php");
require_once("models/direccion.php");
require_once("models/empleado.php");
require_once("models/admin.php");
require_once("models/cliente.php");
require_once("models/venta.php");
require_once("models/pedido.php");
require_once("models/color.php");

//Esto va siempre
require_once("util/jsonResponse.php");
require 'Slim/Slim/Slim.php';

//Esto va siempre
Slim\Slim::registerAutoloader();
$app = new Slim\Slim();

//Acá están operaciones de la bd a las que se llega desde el ProductoService al pegarle a index.php

//Se llega a cada una si coincide la operacion get, put, delete o post con la ruta solicitada y los parámetros
$app->get('/productos', function(){
    $producto = new Producto();
	$data = $producto->getAll();
	sendResult($data);
});

$app->get('/productosDetalles', function(){
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

$app->get('/color', function(){
	$object = new Color();
	$data = $object->getAll();
	sendResult($data);
});

$app->get('/mp', function(){
	$mp = new Mp();
	$data = $mp->getAll();
	sendResult($data);
});

$app->get('/mpDetalles', function(){
	$mp = new Mp();
	$data = $mp->getAllDetalles();
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

$app->get('/avisoProd', function(){
	$avisoProd = new AvisoProd();
	$data = $avisoProd->getAll();
	sendResult($data);
});

$app->get('/avisoProdDetalles', function(){
	$avisoProd = new AvisoProd();
	$data = $avisoProd->getAllDetalles();
	sendResult($data);
});

$app->get('/avisoMpDetalles', function(){
	$avisoProd = new AvisoProd();
	$data = $avisoProd->getAllDetallesMp();
	sendResult($data);
});

$app->get('/stock', function(){
	$stock = new StockProducto();
	$data = $stock->getAll();
	sendResult($data);
});

$app->get('/stockDetalles', function(){
	$stock = new StockProducto();
	$data = $stock->getAllDetalles();
	sendResult($data);
});

$app->get('/sucursal', function(){
	$sucursal = new Sucursal();
	$data = $sucursal->getAll();
	sendResult($data);
});

$app->get('/provincia', function(){
	$provincia = new Provincia();
	$data = $provincia->getAll();
	sendResult($data);
});

$app->get('/localidad', function(){
	$localidad = new Localidad();
	$data = $localidad->getAll();
	sendResult($data);
});

$app->get('/direccion', function(){
	$direccion = new Direccion();
	$data = $direccion->getAll();
	sendResult($data);
});

$app->get('/empleado', function(){
	$objeto = new Empleado();
	$data = $objeto->getAll();
	sendResult($data);
});

$app->get('/empleado/:id', function($id){
	$objeto = new Empleado();
	$data = $objeto->getAllPorId($id);
    sendResult($data);
                            
});

$app->get('/empleadoDetalle', function(){
	$objeto = new Empleado();
	$data = $objeto->getAllDetalles();
	sendResult($data);
});

$app->get('/admin/:id', function($id){
	$objeto = new Admin();
	$data = $objeto->getAll($id);
    sendResult($data);
                            
});

$app->get('/cliente', function(){
	$objeto = new Cliente();
	$data = $objeto->getAll();
	sendResult($data);
});

$app->get('/cliente/:id', function($id){
	$objeto = new Cliente();
	$data = $objeto->getAllPorId($id);
    sendResult($data);
                            
});

$app->get('/clienteDetalle', function(){
	$objeto = new Cliente();
	$data = $objeto->getAllDetalles();
	sendResult($data);
});

$app->get('/venta', function(){
	$objeto = new Venta();
	$data = $objeto->getAll();
	sendResult($data);
});

$app->get('/ventaDetalle', function(){
	$objeto = new Venta();
	$data = $objeto->getAllDetalles();
	sendResult($data);
});

$app->get('/pedido', function(){
	$objeto = new Pedido();
	$data = $objeto->getAll();
	sendResult($data);
});

$app->get('/pedidoDetalle', function(){
	$objeto = new Pedido();
	$data = $objeto->getAllDetalles();
	sendResult($data);
});

$app->run();