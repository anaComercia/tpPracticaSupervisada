-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2016 a las 03:59:13
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `negocio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aviso_mp`
--

CREATE TABLE `aviso_mp` (
  `idAvisoMp` int(11) NOT NULL,
  `idMp` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aviso_producto`
--

CREATE TABLE `aviso_producto` (
  `idAvisoProducto` int(11) NOT NULL,
  `idStock` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `banco`
--

CREATE TABLE `banco` (
  `idBanco` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `banco`
--

INSERT INTO `banco` (`idBanco`, `descripcion`, `baja`) VALUES
(1, 'BBVA', 0),
(2, 'CITI', 0),
(3, 'BANCO GALICIA', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `descripcion`, `baja`) VALUES
(3, 'JEAN', 0),
(4, 'CAMISA', 0),
(5, 'CAMPERA', 0),
(6, 'REMERA', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `reputacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `idUsuario`, `reputacion`) VALUES
(1, 1, 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `color`
--

CREATE TABLE `color` (
  `idColor` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `color`
--

INSERT INTO `color` (`idColor`, `descripcion`, `baja`) VALUES
(1, 'ROSA', 0),
(2, 'AZUL', 0),
(3, 'NEGRO', 0),
(4, 'VERDE', 0),
(5, 'BLANCO', 0),
(6, 'BORDO', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `idCompra` int(11) NOT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `idCupon` int(11) DEFAULT NULL,
  `idTarjetaBanco` int(11) DEFAULT NULL,
  `idSucursal` int(11) DEFAULT NULL,
  `idDireccion` int(11) DEFAULT NULL,
  `monto` double DEFAULT NULL,
  `fechaCompra` date DEFAULT NULL,
  `fechaTarjeta` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `numeroTarjeta` varchar(100) DEFAULT NULL,
  `tipoPago` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`idCompra`, `idCliente`, `idCupon`, `idTarjetaBanco`, `idSucursal`, `idDireccion`, `monto`, `fechaCompra`, `fechaTarjeta`, `estado`, `numeroTarjeta`, `tipoPago`) VALUES
(8, 1, NULL, NULL, 3, NULL, 540, NULL, NULL, 'PENDIENTE RETIRO', NULL, 'E');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cupon`
--

CREATE TABLE `cupon` (
  `idCupon` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `montoDescuento` float DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cupon`
--

INSERT INTO `cupon` (`idCupon`, `descripcion`, `montoDescuento`, `baja`) VALUES
(1, '45gt67gt', 150, 0),
(2, '234edfr5', 200, 0),
(3, 'sdw345r5', 180, 0),
(4, '3e4r5t6y', 100, 0),
(5, '234567yu', 120, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cupon_cliente`
--

CREATE TABLE `cupon_cliente` (
  `idCupon` int(11) DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cupon_cliente`
--

INSERT INTO `cupon_cliente` (`idCupon`, `idCliente`, `estado`) VALUES
(3, 1, 'SI'),
(1, 1, 'NO'),
(4, 1, 'SI'),
(2, 1, 'NO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compra`
--

CREATE TABLE `detalle_compra` (
  `idCompra` int(11) NOT NULL,
  `codSku` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `idDireccion` int(11) NOT NULL,
  `idLocalidad` int(11) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `cp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`idDireccion`, `idLocalidad`, `direccion`, `cp`) VALUES
(1, 1, 'Bermudez 1765', 1407),
(2, 2, 'Coronel Cetz 346', 1061),
(3, 3, 'Mitre 300', 1346),
(4, 1, 'Bernaldez1876', 1407),
(5, 1, 'Cochenahue 1654', 1165),
(6, 3, 'prueba', 1),
(7, 3, 'prueba1', 1234),
(8, 1, 'hola', 5),
(9, 3, 'mate', 1234),
(10, 3, 'membrillo', 9876),
(11, 3, 'carrefour', 4567),
(12, 1, 'pava', 3432),
(13, 3, 's', 1222),
(14, 3, 'ss', 1122),
(15, 2, 'coronel', 1234),
(16, 3, 'Y', 1234),
(17, 1, 'mouse', 5543),
(18, 3, 'silla', 3456),
(19, 3, 'mantel', 4444),
(20, 2, 'puerta', 3456),
(21, 1, 'florero', 3456),
(22, 3, 'agua caliente', 2323),
(23, 1, 'bombilla', 3245),
(24, 3, 'tutti', 3424),
(25, 3, 'fernando', 3245);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `idEmpleado` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `puesto` varchar(45) DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envio_sucursal`
--

CREATE TABLE `envio_sucursal` (
  `idEnvioSucursal` int(11) NOT NULL,
  `idSucursal1` int(11) NOT NULL,
  `idSucursal2` int(11) NOT NULL,
  `tardanza` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

CREATE TABLE `genero` (
  `idGenero` int(11) NOT NULL,
  `descripcion` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `genero`
--

INSERT INTO `genero` (`idGenero`, `descripcion`) VALUES
(1, 'MUJER'),
(2, 'HOMBRE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `idImagenes` int(11) NOT NULL,
  `carrusel1` varchar(500) DEFAULT NULL,
  `carrusel2` varchar(500) DEFAULT NULL,
  `carrusel3` varchar(500) DEFAULT NULL,
  `carrusel4` varchar(500) DEFAULT NULL,
  `carrusel5` varchar(500) DEFAULT NULL,
  `carrusel6` varchar(500) DEFAULT NULL,
  `bannerIzq` varchar(500) DEFAULT NULL,
  `bannerDer` varchar(500) DEFAULT NULL,
  `modulo` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`idImagenes`, `carrusel1`, `carrusel2`, `carrusel3`, `carrusel4`, `carrusel5`, `carrusel6`, `bannerIzq`, `bannerDer`, `modulo`) VALUES
(1, 'img/carrusel/carrusel1.jpg', 'img/carrusel/carrusel2.jpg', 'img/carrusel/carrusel3.jpg', 'img/carrusel/carrusel4.jpg', 'img/carrusel/carrusel5.jpg', 'img/carrusel/carrusel6.jpg', 'img/carrusel/bannerMujer1.jpg', 'img/carrusel/bannerHombre2.jpg', 'img/modulos/imgModuloProductos.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidad`
--

CREATE TABLE `localidad` (
  `idLocalidad` int(11) NOT NULL,
  `idProvincia` int(11) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `localidad`
--

INSERT INTO `localidad` (`idLocalidad`, `idProvincia`, `descripcion`, `baja`) VALUES
(1, 2, 'Monte Castro', 0),
(2, 1, 'San Isidro', 0),
(3, 1, 'Avellaneda', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugar`
--

CREATE TABLE `lugar` (
  `idLugar` int(11) NOT NULL,
  `idLocalidad` int(11) DEFAULT NULL,
  `tardanzaDias` int(11) DEFAULT NULL,
  `costo` double DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mp`
--

CREATE TABLE `mp` (
  `idMP` int(11) NOT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `medida` varchar(45) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `puntoReposicion` int(11) DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_mp`
--

CREATE TABLE `pedido_mp` (
  `idPedidoProveedor` int(11) DEFAULT NULL,
  `idMp` int(11) DEFAULT NULL,
  `cantidad` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_proveedor`
--

CREATE TABLE `pedido_proveedor` (
  `idPedidoProveedor` int(11) NOT NULL,
  `monto` float DEFAULT NULL,
  `fechaPedido` date DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `idPersona` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `tipoDni` int(11) DEFAULT NULL,
  `numDni` int(11) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `idGenero` int(11) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `idDireccion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idPersona`, `nombre`, `apellido`, `tipoDni`, `numDni`, `telefono`, `email`, `idGenero`, `fechaNacimiento`, `idDireccion`) VALUES
(1, 'ANA', 'VANE', 1, 36636155, '1565277020', 'ana@gmail', 1, '2016-04-06', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona_direccion`
--

CREATE TABLE `persona_direccion` (
  `idPersona` int(11) DEFAULT NULL,
  `idDireccion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `persona_direccion`
--

INSERT INTO `persona_direccion` (`idPersona`, `idDireccion`) VALUES
(1, 1),
(1, 5),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),
(1, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precio_mp`
--

CREATE TABLE `precio_mp` (
  `idMp` int(11) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `cantidad` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentacion_producto`
--

CREATE TABLE `presentacion_producto` (
  `codSku` int(11) NOT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `idTalle` int(11) DEFAULT NULL,
  `idColor` int(11) DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `presentacion_producto`
--

INSERT INTO `presentacion_producto` (`codSku`, `idProducto`, `idTalle`, `idColor`, `baja`) VALUES
(1, 1, 1, 1, 0),
(2, 2, 3, 2, 0),
(3, 2, 3, 4, 0),
(4, 2, 1, 2, 0),
(5, 3, 3, 3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `idCategoria` int(11) DEFAULT NULL,
  `idGenero` int(11) DEFAULT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `puntoReposicion` int(11) DEFAULT NULL,
  `urlImagen` varchar(250) DEFAULT NULL,
  `urlImagenAlt1` varchar(250) DEFAULT NULL,
  `urlImagenAlt2` varchar(250) DEFAULT NULL,
  `urlImagenAlt3` varchar(250) DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `idCategoria`, `idGenero`, `titulo`, `precio`, `descripcion`, `puntoReposicion`, `urlImagen`, `urlImagenAlt1`, `urlImagenAlt2`, `urlImagenAlt3`, `baja`) VALUES
(1, 4, 1, 'Camisa POLLY MIAMI', 600, 'Camisa importada de seda polly miami.', 7, 'img/camisa/m_camisaseda(1).png', 'img/camisa/m_camisaseda(2).png', 'img/camisa/m_camisaseda(3).png', 'img/camisa/m_camisaseda(4).png', 0),
(2, 3, 1, 'Jean achupinado', 540, 'Jean elastizado muy comodo. Calce y calidad excelente.', 4, 'img/jean/m_super_skinny_(1).png', 'img/jean/m_super_skinny_(2).png', 'img/jean/m_super_skinny_(3).png', 'img/jean/m_super_skinny_(4).png', 0),
(3, 5, 2, 'Campera Inflable', 1000, 'Campera inflable, reversible. Rompeviento  y muy abrigada. Con el interior de pluma.', 10, 'img/campera/h_invierno_pluma_(1).png', 'img/campera/h_invierno_pluma_(2).png', 'img/campera/h_invierno_pluma_(3).png', 'img/campera/h_invierno_pluma_(4).png', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prod_mp`
--

CREATE TABLE `prod_mp` (
  `idProducto` int(11) DEFAULT NULL,
  `idMP` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincia`
--

CREATE TABLE `provincia` (
  `idProvincia` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `provincia`
--

INSERT INTO `provincia` (`idProvincia`, `descripcion`, `baja`) VALUES
(1, 'Buenos Aires', 0),
(2, 'Capital Federal', 0),
(3, 'Mendoza', 0),
(4, 'Corrientes', 0),
(5, 'La Pampa', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock_producto`
--

CREATE TABLE `stock_producto` (
  `idStock` int(11) NOT NULL,
  `codSku` int(11) DEFAULT NULL,
  `idSucursal` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `stock_producto`
--

INSERT INTO `stock_producto` (`idStock`, `codSku`, `idSucursal`, `cantidad`) VALUES
(1, 1, 1, 15),
(2, 2, 1, 20),
(3, 3, 2, 12),
(4, 4, 3, 15),
(5, 5, 3, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `idSucursal` int(11) NOT NULL,
  `idDireccion` int(11) DEFAULT NULL,
  `nroSucursal` int(11) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `horarioAtencion` varchar(100) DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sucursal`
--

INSERT INTO `sucursal` (`idSucursal`, `idDireccion`, `nroSucursal`, `telefono`, `horarioAtencion`, `baja`) VALUES
(1, 1, 1, '1565789870', 'Lun a Vier 10-18hs', 0),
(2, 2, 2, '1587653245', 'Lun a Vier 9-18 hs', 0),
(3, 3, 3, '1543267865', 'Lun a Vier 10-17 hs. Sab 9-12 hs', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talle`
--

CREATE TABLE `talle` (
  `idTalle` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `talle`
--

INSERT INTO `talle` (`idTalle`, `descripcion`) VALUES
(1, 'S'),
(2, 'M'),
(3, 'L'),
(4, 'XL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta`
--

CREATE TABLE `tarjeta` (
  `idTarjeta` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tarjeta`
--

INSERT INTO `tarjeta` (`idTarjeta`, `descripcion`, `baja`) VALUES
(1, 'VISA', 0),
(2, 'MASTERCARD', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta_banco`
--

CREATE TABLE `tarjeta_banco` (
  `idTarjeta` int(11) DEFAULT NULL,
  `idTarjetaBanco` int(11) NOT NULL,
  `idBanco` int(11) DEFAULT NULL,
  `cuotas` int(11) DEFAULT NULL,
  `interes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tarjeta_banco`
--

INSERT INTO `tarjeta_banco` (`idTarjeta`, `idTarjetaBanco`, `idBanco`, `cuotas`, `interes`) VALUES
(1, 1, 1, 3, 0),
(1, 2, 1, 6, 10),
(1, 3, 1, 12, 15),
(2, 4, 1, 9, 5),
(1, 5, 2, 5, 0),
(1, 6, 2, 12, 12),
(2, 7, 2, 18, 12),
(1, 8, 3, 12, 0),
(2, 9, 3, 12, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_dni`
--

CREATE TABLE `tipo_dni` (
  `idTipoDni` int(11) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_dni`
--

INSERT INTO `tipo_dni` (`idTipoDni`, `descripcion`) VALUES
(1, 'DNI'),
(2, 'CUIL'),
(3, 'CUIT');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `idPersona` int(11) DEFAULT NULL,
  `habilitado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `usuario`, `password`, `idPersona`, `habilitado`) VALUES
(1, 'userana', 'contraana', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aviso_mp`
--
ALTER TABLE `aviso_mp`
  ADD PRIMARY KEY (`idAvisoMp`),
  ADD KEY `IdMp_idx` (`idMp`);

--
-- Indices de la tabla `aviso_producto`
--
ALTER TABLE `aviso_producto`
  ADD PRIMARY KEY (`idAvisoProducto`),
  ADD KEY `fkStock_idx` (`idStock`);

--
-- Indices de la tabla `banco`
--
ALTER TABLE `banco`
  ADD PRIMARY KEY (`idBanco`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`),
  ADD KEY `idUsuario_idx` (`idUsuario`);

--
-- Indices de la tabla `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`idColor`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`idCompra`),
  ADD KEY `fkCliente2_idx` (`idCliente`),
  ADD KEY `fkCupon4_idx` (`idCupon`),
  ADD KEY `fkTarjetaBanco_idx` (`idTarjetaBanco`),
  ADD KEY `fkSucursal2_idx` (`idSucursal`),
  ADD KEY `fkDireccion5_idx` (`idDireccion`);

--
-- Indices de la tabla `cupon`
--
ALTER TABLE `cupon`
  ADD PRIMARY KEY (`idCupon`);

--
-- Indices de la tabla `cupon_cliente`
--
ALTER TABLE `cupon_cliente`
  ADD KEY `fkCupon2_idx` (`idCupon`),
  ADD KEY `fkCliente3_idx` (`idCliente`);

--
-- Indices de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`idCompra`),
  ADD KEY `fk_DetalleCompra_1_idx` (`codSku`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`idDireccion`),
  ADD KEY `fkLocalidad_idx` (`idLocalidad`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`idEmpleado`),
  ADD KEY `idUsuario_idx` (`idUsuario`);

--
-- Indices de la tabla `envio_sucursal`
--
ALTER TABLE `envio_sucursal`
  ADD PRIMARY KEY (`idEnvioSucursal`),
  ADD KEY `idSucursal1_idx` (`idSucursal1`),
  ADD KEY `idSucursal2_idx` (`idSucursal2`);

--
-- Indices de la tabla `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`idGenero`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`idImagenes`);

--
-- Indices de la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD PRIMARY KEY (`idLocalidad`),
  ADD KEY `fkProvinciaLocalidad_idx` (`idProvincia`);

--
-- Indices de la tabla `lugar`
--
ALTER TABLE `lugar`
  ADD PRIMARY KEY (`idLugar`),
  ADD KEY `fk2Localidad_idx` (`idLocalidad`);

--
-- Indices de la tabla `mp`
--
ALTER TABLE `mp`
  ADD PRIMARY KEY (`idMP`);

--
-- Indices de la tabla `pedido_mp`
--
ALTER TABLE `pedido_mp`
  ADD KEY `fkPedidoProovedor_idx` (`idPedidoProveedor`),
  ADD KEY `fkMp_idx` (`idMp`);

--
-- Indices de la tabla `pedido_proveedor`
--
ALTER TABLE `pedido_proveedor`
  ADD PRIMARY KEY (`idPedidoProveedor`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idPersona`),
  ADD KEY `idGenero_idx` (`idGenero`),
  ADD KEY `fkDireccion_idx` (`idDireccion`),
  ADD KEY `fkTipoDni_idx` (`tipoDni`);

--
-- Indices de la tabla `persona_direccion`
--
ALTER TABLE `persona_direccion`
  ADD KEY `fkPersona5_idx` (`idPersona`),
  ADD KEY `fkDireccion5_idx` (`idDireccion`);

--
-- Indices de la tabla `precio_mp`
--
ALTER TABLE `precio_mp`
  ADD KEY `fkMp5_idx` (`idMp`);

--
-- Indices de la tabla `presentacion_producto`
--
ALTER TABLE `presentacion_producto`
  ADD PRIMARY KEY (`codSku`),
  ADD KEY `fkProducto5_idx` (`idProducto`),
  ADD KEY `fkTalle4_idx` (`idTalle`),
  ADD KEY `fkColor4_idx` (`idColor`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `idCategoria_idx` (`idCategoria`),
  ADD KEY `fkGenero_idx` (`idGenero`);

--
-- Indices de la tabla `prod_mp`
--
ALTER TABLE `prod_mp`
  ADD KEY `idMp_idx` (`idMP`),
  ADD KEY `fkProducto` (`idProducto`);

--
-- Indices de la tabla `provincia`
--
ALTER TABLE `provincia`
  ADD PRIMARY KEY (`idProvincia`);

--
-- Indices de la tabla `stock_producto`
--
ALTER TABLE `stock_producto`
  ADD PRIMARY KEY (`idStock`),
  ADD KEY `idSucursal_idx` (`idSucursal`),
  ADD KEY `fkSku_idx` (`codSku`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`idSucursal`),
  ADD KEY `fkDireccion_idx` (`idDireccion`);

--
-- Indices de la tabla `talle`
--
ALTER TABLE `talle`
  ADD PRIMARY KEY (`idTalle`);

--
-- Indices de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD PRIMARY KEY (`idTarjeta`);

--
-- Indices de la tabla `tarjeta_banco`
--
ALTER TABLE `tarjeta_banco`
  ADD PRIMARY KEY (`idTarjetaBanco`),
  ADD KEY `fkTarjetaBanco1_idx` (`idBanco`),
  ADD KEY `fkTarjetaBanco2_idx` (`idTarjeta`);

--
-- Indices de la tabla `tipo_dni`
--
ALTER TABLE `tipo_dni`
  ADD PRIMARY KEY (`idTipoDni`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `fkPersona_idx` (`idPersona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aviso_mp`
--
ALTER TABLE `aviso_mp`
  MODIFY `idAvisoMp` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `aviso_producto`
--
ALTER TABLE `aviso_producto`
  MODIFY `idAvisoProducto` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `banco`
--
ALTER TABLE `banco`
  MODIFY `idBanco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `color`
--
ALTER TABLE `color`
  MODIFY `idColor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `idCompra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `cupon`
--
ALTER TABLE `cupon`
  MODIFY `idCupon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `idDireccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `envio_sucursal`
--
ALTER TABLE `envio_sucursal`
  MODIFY `idEnvioSucursal` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `idGenero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `localidad`
--
ALTER TABLE `localidad`
  MODIFY `idLocalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `lugar`
--
ALTER TABLE `lugar`
  MODIFY `idLugar` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `mp`
--
ALTER TABLE `mp`
  MODIFY `idMP` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `pedido_proveedor`
--
ALTER TABLE `pedido_proveedor`
  MODIFY `idPedidoProveedor` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `presentacion_producto`
--
ALTER TABLE `presentacion_producto`
  MODIFY `codSku` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `provincia`
--
ALTER TABLE `provincia`
  MODIFY `idProvincia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `stock_producto`
--
ALTER TABLE `stock_producto`
  MODIFY `idStock` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `idSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `talle`
--
ALTER TABLE `talle`
  MODIFY `idTalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  MODIFY `idTarjeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tarjeta_banco`
--
ALTER TABLE `tarjeta_banco`
  MODIFY `idTarjetaBanco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aviso_mp`
--
ALTER TABLE `aviso_mp`
  ADD CONSTRAINT `IdMp` FOREIGN KEY (`idMp`) REFERENCES `mp` (`idMP`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `aviso_producto`
--
ALTER TABLE `aviso_producto`
  ADD CONSTRAINT `fkStock` FOREIGN KEY (`idStock`) REFERENCES `stock_producto` (`idStock`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `fkCliente2` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkCupon4` FOREIGN KEY (`idCupon`) REFERENCES `cupon` (`idCupon`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkDireccion5` FOREIGN KEY (`idDireccion`) REFERENCES `direccion` (`idDireccion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkSucursal2` FOREIGN KEY (`idSucursal`) REFERENCES `sucursal` (`idSucursal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkTarjetaBanco` FOREIGN KEY (`idTarjetaBanco`) REFERENCES `tarjeta_banco` (`idTarjetaBanco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cupon_cliente`
--
ALTER TABLE `cupon_cliente`
  ADD CONSTRAINT `fkCliente3` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkCupon2` FOREIGN KEY (`idCupon`) REFERENCES `cupon` (`idCupon`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD CONSTRAINT `fk_DetalleCompra_1` FOREIGN KEY (`codSku`) REFERENCES `presentacion_producto` (`codSku`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idCompra` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`idCompra`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `fkLocalidad` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `fkUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `envio_sucursal`
--
ALTER TABLE `envio_sucursal`
  ADD CONSTRAINT `idSucursal1` FOREIGN KEY (`idSucursal1`) REFERENCES `sucursal` (`idSucursal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idSucursal2` FOREIGN KEY (`idSucursal2`) REFERENCES `sucursal` (`idSucursal`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD CONSTRAINT `fkProvinciaLocalidad` FOREIGN KEY (`idProvincia`) REFERENCES `provincia` (`idProvincia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `lugar`
--
ALTER TABLE `lugar`
  ADD CONSTRAINT `fk2Localidad` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pedido_mp`
--
ALTER TABLE `pedido_mp`
  ADD CONSTRAINT `fkMp2` FOREIGN KEY (`idMp`) REFERENCES `mp` (`idMP`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkPedidoProovedor` FOREIGN KEY (`idPedidoProveedor`) REFERENCES `pedido_proveedor` (`idPedidoProveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `fkDireccion` FOREIGN KEY (`idDireccion`) REFERENCES `direccion` (`idDireccion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkGenero` FOREIGN KEY (`idGenero`) REFERENCES `genero` (`idGenero`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkTipoDni` FOREIGN KEY (`tipoDni`) REFERENCES `tipo_dni` (`idTipoDni`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `persona_direccion`
--
ALTER TABLE `persona_direccion`
  ADD CONSTRAINT `fkDireccion6` FOREIGN KEY (`idDireccion`) REFERENCES `direccion` (`idDireccion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkPersona6` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `precio_mp`
--
ALTER TABLE `precio_mp`
  ADD CONSTRAINT `fkMp5` FOREIGN KEY (`idMp`) REFERENCES `mp` (`idMP`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `presentacion_producto`
--
ALTER TABLE `presentacion_producto`
  ADD CONSTRAINT `fkPPColor` FOREIGN KEY (`idColor`) REFERENCES `color` (`idColor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkPPTalle` FOREIGN KEY (`idTalle`) REFERENCES `talle` (`idTalle`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkPProducto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fkGenero3` FOREIGN KEY (`idGenero`) REFERENCES `genero` (`idGenero`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idCategoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `prod_mp`
--
ALTER TABLE `prod_mp`
  ADD CONSTRAINT `fkMp` FOREIGN KEY (`idMP`) REFERENCES `mp` (`idMP`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkProducto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `stock_producto`
--
ALTER TABLE `stock_producto`
  ADD CONSTRAINT `fkSku` FOREIGN KEY (`codSku`) REFERENCES `presentacion_producto` (`codSku`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkSucursal` FOREIGN KEY (`idSucursal`) REFERENCES `sucursal` (`idSucursal`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD CONSTRAINT `fkDireccion2` FOREIGN KEY (`idDireccion`) REFERENCES `direccion` (`idDireccion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tarjeta_banco`
--
ALTER TABLE `tarjeta_banco`
  ADD CONSTRAINT `fkTarjetaBanco1` FOREIGN KEY (`idBanco`) REFERENCES `banco` (`idBanco`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkTarjetaBanco2` FOREIGN KEY (`idTarjeta`) REFERENCES `tarjeta` (`idTarjeta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fkPersona` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
