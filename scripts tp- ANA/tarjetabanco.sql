-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2016 a las 22:07:01
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
-- Estructura de tabla para la tabla `tarjetabanco`
--

CREATE TABLE `tarjetabanco` (
  `idTarjeta` int(11) DEFAULT NULL,
  `idBanco` int(11) DEFAULT NULL,
  `cuotas` int(11) DEFAULT NULL,
  `interes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tarjetabanco`
--

INSERT INTO `tarjetabanco` (`idTarjeta`, `idBanco`, `cuotas`, `interes`) VALUES
(1, 1, 3, 0),
(1, 1, 6, 10),
(1, 1, 12, 15),
(2, 1, 9, 5),
(1, 2, 5, 0),
(1, 2, 12, 12),
(2, 2, 18, 12),
(1, 3, 12, 0),
(2, 3, 12, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tarjetabanco`
--
ALTER TABLE `tarjetabanco`
  ADD KEY `fkTarjetaBanco1_idx` (`idBanco`),
  ADD KEY `fkTarjetaBanco2_idx` (`idTarjeta`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tarjetabanco`
--
ALTER TABLE `tarjetabanco`
  ADD CONSTRAINT `fkTarjetaBanco1` FOREIGN KEY (`idBanco`) REFERENCES `banco` (`idBanco`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fkTarjetaBanco2` FOREIGN KEY (`idTarjeta`) REFERENCES `tarjeta` (`idTarjeta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
