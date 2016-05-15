-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2016 a las 23:40:37
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
-- Estructura de tabla para la tabla `presentacionproducto`
--

CREATE TABLE `presentacion_producto` (
  `codSku` int(11) NOT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `idTalle` int(11) DEFAULT NULL,
  `idColor` int(11) DEFAULT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `presentacionproducto`
--

INSERT INTO `presentacion_producto` (`codSku`, `idProducto`, `idTalle`, `idColor`, `stock`) VALUES
(1, 1, 1, 1, 16),
(2, 2, 2, 2, 30),
(3, 2, 3, 2, 45),
(4, 2, 1, 2, 38),
(5, 3, 3, 3, 55);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `presentacionproducto`
--
ALTER TABLE `presentacion_producto`
  ADD PRIMARY KEY (`codSku`),
  ADD KEY `fkProducto5_idx` (`idProducto`),
  ADD KEY `fkTalle4_idx` (`idTalle`),
  ADD KEY `fkColor4_idx` (`idColor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `presentacionproducto`
--
ALTER TABLE `presentacion_producto`
  MODIFY `codSku` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `presentacionproducto`
--
ALTER TABLE `presentacion_producto`
  ADD CONSTRAINT `fkPPColor` FOREIGN KEY (`idColor`) REFERENCES `color` (`idColor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkPPTalle` FOREIGN KEY (`idTalle`) REFERENCES `talle` (`idTalle`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkPProducto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
