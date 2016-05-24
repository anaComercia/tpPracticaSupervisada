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
require_once("models/receta.php");
require_once("models/envio.php");
require_once("models/lugar.php");
require_once("models/banco.php");
require_once("models/tarjeta.php");
require_once("models/presentacionProducto.php");
require_once("models/prod_mp.php");

require_once("util/jsonResponse.php");
require 'Slim/Slim/Slim.php';

Slim\Slim::registerAutoloader();
$app = new Slim\Slim();

$app->post('/upload_fotos', function(){
    if(isset($_FILES['image'])){
    $len = count($_FILES['image']['name']);
    for($i = 0; $i < $len; $i++) {
    //The error validation could be done on the javascript client side.
    $errors= array();        
    $file_name = $_FILES['image']['name'][$i];
    $file_size =$_FILES['image']['size'][$i];
    $file_tmp =$_FILES['image']['tmp_name'][$i];
    $file_type=$_FILES['image']['type'][$i];   
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $extensions = array("jpeg","jpg","png");        
    if(in_array($file_ext,$extensions )=== false){
     $errors[]="image extension not allowed, please choose a JPEG or PNG file.";
    }
    if($file_size > 2097152){
    $errors[]='File size cannot exceed 2 MB';
    }               
    if(empty($errors)==true){
        move_uploaded_file($file_tmp,"../img/".$file_name);
    }else{
        print_r($errors);
    }
        echo "img/".$file_name.",";
    }
    }else{
        echo count($_FILES);
    }
});

$app->post('/load_fotos/', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); 
    $url = $data['url'];
    $im = file_get_contents($url);
    header('Content-Type: image/jpeg');
    
});

// Productos

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

$app->post('/productos_fotos', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	
	$producto = new Producto();
    $result = $producto->updateImagen($data);
	
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear el producto");
	}
});

$app->post('/presentacion_producto', function(){
   
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	
	$objeto = new PresentacionProducto();
    $result = $objeto->create($data);
	
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear el producto");
	}
    
});

$app->post('/prod_mp', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	
	$objeto = new ProdMp();
    $result = $objeto->create($data);
	
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear el producto");
	}
});

$app->delete('/prod_mp/:id', function($id){
	$objeto = new ProdMp();
	$result = $objeto->remove($id);
	if($result){
		sendResult("producto eliminado");
	}else{
		sendError("Error al eliminar el producto");
	}
});

$app->get('/productosPresentacionTalle/:id', function($id){
    $objeto = new PresentacionProducto();
	$data = $objeto->getPresentacionTalle($id);
	sendResult($data);
});

$app->get('/productosPresentacionColor/:id', function($id){
    $objeto = new PresentacionProducto();
	$data = $objeto->getPresentacionColor($id);
	sendResult($data);
});

$app->get('/productosMp/:id', function($id){
    $objeto = new ProdMp();
	$data = $objeto->getProductosMp($id);
	sendResult($data);
});
// Fin Productos


//Categorias

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

//Fin Categorias

//Colores

$app->get('/color', function(){
	$object = new Color();
	$data = $object->getAll();
	sendResult($data);
});

$app->post('/colores', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	$object = new Color();
    $result = $object->create($data);
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear la categoría");
	}
});

$app->put('/colores', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); 
	$object = new Color();
    $result = $object->update($data);
	
	if($result){
		sendResult("categoria actualizada");
	}else{
		sendError("Error al actualizar la categoría");
	}
});

$app->delete('/colores/:id', function($id){
	$object = new Color();
	$result = $object->remove($id);
	if($result){
		sendResult("categoria eliminada");
	}else{
		sendError("Error al eliminar la categoría");
	}
});

//Fin Colores

$app->get('/genero', function(){
	$genero = new Genero();
	$data = $genero->getAll();
	sendResult($data);
});

//Materia Prima

$app->get('/mp', function(){
	$mp = new Mp();
	$data = $mp->getAll();
	sendResult($data);
});

$app->get('/mpPrecios/:id', function($id){
    $objeto = new Mp();
	$data = $objeto->getPrecios($id);
	sendResult($data);
});

$app->get('/mpDetalles', function(){
	$mp = new Mp();
	$data = $mp->getAllDetalles();
	sendResult($data);
});

$app->post('/mp', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	$objeto = new Mp();
    $result = $objeto->create($data);
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear mp");
	}
});

$app->post('/precio_mp', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	
	$objeto = new Mp();
    $result = $objeto->createPrecio($data);
	
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear el precio mp");
	}
});

$app->delete('/precio_mp/:id', function($id){
	$objeto = new Mp();
	$result = $objeto->removePrecio($id);
	if($result){
		sendResult($result);
	}else{
		sendError("Error al eliminar la materia prima");
	}
});

$app->put('/mp', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); 

	$objeto = new Mp();
    $result = $objeto->update($data);
	
	if($result){
		sendResult("Materia Prima actualizada");
	}else{
		sendError("Error al actualizar la materia prima");
	}
});

$app->delete('/mp/:id', function($id){
	$objeto = new Mp();
	$result = $objeto->remove($id);
	if($result){
		sendResult("Materia prima eliminada");
	}else{
		sendError("Error al eliminar la materia prima");
	}
});

//Fin Materia Prima

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

$app->get('/prodDeposito', function(){
	$avisoProd = new AvisoProd();
	$data = $avisoProd->getProdDeposito();
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

//Sucursales

$app->get('/sucursal', function(){
	$sucursal = new Sucursal();
	$data = $sucursal->getAll();
	sendResult($data);
});

$app->get('/sucursal/:id', function($id){
	$sucursal = new Sucursal();
	$data = $sucursal->getAllById($id);
	sendResult($data);
});

$app->post('/sucursal', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	
	$objeto = new Sucursal();
    $result = $objeto->create($data);
	
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear el precio mp");
	}
});

$app->put('/sucursal', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	
	$objeto = new Sucursal();
    $result = $objeto->update($data);
	
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear el precio mp");
	}
});

$app->delete('/sucursal/:id', function($id){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	
	$objeto = new Sucursal();
    $result = $objeto->delete($id);
	
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear el precio mp");
	}
});

//Fin sucursales

//Provincias

$app->get('/provincia', function(){
	$provincia = new Provincia();
	$data = $provincia->getAll();
	sendResult($data);
});

$app->get('/provincia/:id', function($id){
	$provincia = new Provincia();
	$data = $provincia->getAllById($id);
	sendResult($data);
});

//Fin provincias

//Localidades
$app->get('/localidad', function(){
	$localidad = new Localidad();
	$data = $localidad->getAll();
	sendResult($data);
});

$app->get('/localidad/:id', function($id){
	$localidad = new Localidad();
	$data = $localidad->getAllByIdProvincia($id);
	sendResult($data);
});
//Fin localidades

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

$app->get('/receta', function(){
	$objeto = new Receta();
	$data = $objeto->getAll();
	sendResult($data);
});

$app->get('/recetaSoloProductos', function(){
	$objeto = new Receta();
	$data = $objeto->getSoloProductos();
	sendResult($data);
});

$app->get('/receta/:id', function($id){
	$objeto = new Receta();
	$data = $objeto->getAllPorId($id);
    sendResult($data);                       
});

$app->get('/envio', function(){
	$objeto = new Envio();
	$data = $objeto->getAll();
	sendResult($data);
});

$app->get('/lugar', function(){
	$objeto = new Lugar();
	$data = $objeto->getAll();
	sendResult($data);
});

//Bancos y tarjetas

$app->get('/banco', function(){
	$object = new Banco();
	$data = $object->getAll();
	sendResult($data);
});

$app->post('/banco', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	$object = new Banco();
    $result = $object->createBanco($data);
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear el banco");
	}
});

$app->put('/banco', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); 
	$object = new Banco();
    $result = $object->updateBanco($data);
	if($result){
		sendResult("Banco actualizado");
	}else{
		sendError("Error al actualizar el banco");
	}
});

$app->delete('/banco/:id', function($id){
	$object = new Banco();
    $result = $object->deleteBanco($id);
	if($result){
		sendResult("Banco eliminado");
	}else{
		sendError("Error al eliminar el banco");
	}
});

$app->get('/tarjeta', function(){
	$object = new Tarjeta();
	$data = $object->getAll();
	sendResult($data);
});

$app->get('/tarjeta/:id', function($id){
	$objeto = new Tarjeta();
	$data = $objeto->getAllPorId($id);
    sendResult($data);                       
});

$app->post('/tarjeta', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	$object = new Tarjeta();
    $result = $object->createTarjeta($data);
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear la tarjeta");
	}
});

$app->put('/tarjeta', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); 
	$object = new Tarjeta();
    $result = $object->updateTarjeta($data);
	if($result){
		sendResult("Tarjeta actualizada");
	}else{
		sendError("Error al actualizar la tarjeta");
	}
});

$app->delete('/tarjeta/:id', function($id){
	$object = new Tarjeta();
    $result = $object->deleteTarjeta($id);
	if($result){
		sendResult("Tarjeta eliminada");
	}else{
		sendError("Error al eliminar la tarjeta");
	}
});

$app->delete('/cuotas/:id', function($id){
	$object = new Tarjeta();
    $result = $object->deleteCuotas($id);
	if($result){
		sendResult("Cuotas eliminadas");
	}else{
		sendError("Error al eliminar las cuotas");
	}
});

$app->post('/cuotas', function(){
    $request = Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody(), true); //true convierte en array asoc, false en objeto php
	$object = new Tarjeta();
    $result = $object->createCuotas($data);
	if($result){
		sendResult($result);
	}else{
		sendError("Error al crear las cuotas");
	}
});
//Fin Bancos y tarjetas

$app->run();