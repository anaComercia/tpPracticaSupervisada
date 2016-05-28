<?php

//Esto va siempre
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

//Acá se traen todos los archivos php que tienen los métodos para operar con la bd
require_once("models/carrito.php");
//require_once("models/contacto.php");
require_once("models/crearCuenta.php");
//require_once("models/formaPago.php");
//require_once("models/iniciarSesion.php");
require_once("models/inicio.php");
require_once("models/perfil.php");
require_once("models/producto.php");
require_once("models/footer.php");
require_once("models/genero.php");
require_once("models/mostrarDatosCuenta.php");//acastillo 22/05/2016
require_once("models/provincia.php");//acastillo 24/05/2016
require_once("models/localidad.php");//acastillo 24/05/2016

//Esto va siempre
require_once("util/jsonResponse.php");
require 'slim/Slim/Slim.php';


//Esto va siempre
Slim\Slim::registerAutoloader();
$app = new Slim\Slim();

//Acá están operaciones de la bd a las que se llega desde el ProductoService al pegarle a index.php

//Se llega a cada una si coincide la operacion get, put, delete o post con la ruta solicitada y los parámetros


$app->post('/altaDeCuenta', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	
	$altaCuenta = new CrearCuenta();
    $result = $altaCuenta->create($data);
	
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear la cuenta del cliente");
	}
});

$app->get('/altaDeCuentaGenero', function(){
    $genero = new Genero();
	$data = $genero->getAll();
    
    if($data){
		sendResult($data);
	}else{
		sendError("Error al mostrar el genero");
	}
});

// acastillo 24/05/2016-------------------------------------------------------------
$app->get('/altaDeCuentaProvincia', function(){
    $genero = new Provincia();
	$data = $genero->getAll();
    
    if($data){
		sendResult($data);
	}else{
		sendError("Error al mostrar el genero");
	}
});
// acastillo 24/05/2016-------------------------------------------------------------
$app->get('/altaDeCuentaLocalidad/:id', function($id){
	$localidad = new Localidad();
	$data = $localidad->getAllByIdProvincia($id);
	sendResult($data);
});

// acastillo 22/05/2016-------------------------------------------------------------
$app->get('/mostrarDatosCuenta', function(){
    $datosCliente = new MostrarCuenta();
	$data = $datosCliente->getAll();
    
    if($data){
		sendResult($data);
	}else{
		sendError("Error al obtener datos del cliente");
	}
});

//----------------------------------------------------------------------------------

$app->get('/reputacionPerf/:id', function($idUser){

	$reputacion = new Perfil();
	$data = $reputacion->getReputacion($idUser);
	sendResult($data);
});

$app->get('/cuponNuevo/:id', function($idUser){

	$reputacion = new Perfil();
	$data = $reputacion->getCuponesUsados($idUser);
	sendResult($data);
});
$app->get('/cuponUsado/:id', function($idUser){

	$reputacion = new Perfil();
	$data = $reputacion->getCuponesNuevos($idUser);
	sendResult($data);
});
$app->get('/carritoTarjetas/:id', function($id){

	$reputacion = new Carrito();
	$data = $reputacion->getTarjetas($id);
	sendResult($data);
});
$app->get('/telSucursales', function(){

	$telefono = new Footer();
	$data = $telefono->getTelefonos();
	sendResult($data);
});

$app->get('/inicio', function(){

	$telefono = new Inicio();
	$data = $telefono->getTelefonos();
	sendResult($data);
});
$app->get('/bancos', function(){

	$producto = new Producto();
	$data = $producto->getAllBancos();
	sendResult($data);
});
$app->get('/bancosCarrito', function(){

	$producto = new Carrito();
	$data = $producto->getBancos();
	sendResult($data);
});
$app->get('/traerSucursales', function(){

	$producto = new Carrito();
	$data = $producto->getSucursales();
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
$app->get('/IniHombre', function(){

	$producto = new Inicio();
	$data = $producto->getInicioHombre();
	sendResult($data);
});
$app->get('/IniMujer', function(){

	$inicio= new Inicio();
	$data = $inicio->getInicioMujer();
	sendResult($data);
});
$app->get('/IniImgFijas', function(){

	$inicio = new Inicio();
	$data = $inicio->getImgFijas();
	sendResult($data);
});
$app->get('/ProdImgModulo', function(){

	$inicio = new Producto();
	$data = $inicio->getImgModulo();
	sendResult($data);
});

$app->get('/ProdTalles/:id', function($id){
	$producto = new Producto();
	$data = $producto->getTalles($id);
	sendResult($data);
});
$app->get('/verifCupon/:descCupon&:idUsr', function($descCupon, $idUsr){
	$producto = new Carrito();
	$data = $producto->getVerifCupon($descCupon,$idUsr);
	sendResult($data);
});
$app->get('/IniBuscadorProd/:dato', function($dato){
	$producto = new Inicio();
	$data = $producto->getProductoCliente($dato);
	sendResult($data);
});
$app->get('/ProdColores/:idTalle&:idProd', function($idTalle,$idProd){
	$color = new Producto();
	$data = $color->getColores($idTalle,$idProd);
	sendResult($data);
});
$app->get('/ProdSku/:idTalle&:idColor:idProd', function($idTalle,$idColor,$idProd){
	$color = new Producto();
	$data = $color->getSKU($idTalle,$idColor,$idProd);
	sendResult($data);
});
$app->get('/CuotasCarrito/:banco&:tarjeta', function($banco,$tarjeta){
	$color = new Carrito();
	$data = $color->getCuotas($banco,$tarjeta);
	sendResult($data);
});

$app->run();