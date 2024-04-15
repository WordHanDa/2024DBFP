-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- 主機: localhost
-- 產生時間： 2024-04-15 14:19:09
-- 伺服器版本: 5.7.17-log
-- PHP 版本： 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `snake`
--

-- --------------------------------------------------------

--
-- 資料表結構 `地理位置`
--

CREATE TABLE `地理位置` (
  `Location_ID` varchar(10) NOT NULL,
  `區域` char(10) NOT NULL,
  `縣市` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `存放位置`
--

CREATE TABLE `存放位置` (
  `Storage_ID` varchar(10) NOT NULL,
  `Hospital_ID` varchar(10) NOT NULL,
  `Antivenom_ID` varchar(10) NOT NULL,
  `血清數量` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `抗蛇毒血清`
--

CREATE TABLE `抗蛇毒血清` (
  `Antivenom_ID` varchar(10) NOT NULL,
  `藥品名稱` char(10) NOT NULL,
  `使用方法` varchar(200) NOT NULL,
  `有效期限` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `蛇的圖片`
--

CREATE TABLE `蛇的圖片` (
  `Image_ID` varchar(10) NOT NULL,
  `Snake_ID` varchar(10) NOT NULL,
  `圖片` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `蛇的種類`
--

CREATE TABLE `蛇的種類` (
  `Snake_ID` varchar(10) NOT NULL,
  `種類` char(10) NOT NULL,
  `是否有毒` char(10) NOT NULL,
  `毒性等級` int(11) NOT NULL,
  `分佈區域` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `醫院`
--

CREATE TABLE `醫院` (
  `Hospital_ID` varchar(10) NOT NULL,
  `十碼章` char(15) NOT NULL,
  `醫院名稱` char(100) NOT NULL,
  `電話` char(15) NOT NULL,
  `經度` float NOT NULL,
  `緯度` float NOT NULL,
  `地址` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `地理位置`
--
ALTER TABLE `地理位置`
  ADD PRIMARY KEY (`Location_ID`);

--
-- 資料表索引 `存放位置`
--
ALTER TABLE `存放位置`
  ADD PRIMARY KEY (`Storage_ID`),
  ADD KEY `Hospital_ID` (`Hospital_ID`),
  ADD KEY `存放位置_ibfk_2` (`Antivenom_ID`);

--
-- 資料表索引 `抗蛇毒血清`
--
ALTER TABLE `抗蛇毒血清`
  ADD PRIMARY KEY (`Antivenom_ID`);

--
-- 資料表索引 `蛇的圖片`
--
ALTER TABLE `蛇的圖片`
  ADD PRIMARY KEY (`Image_ID`),
  ADD KEY `Snake_ID` (`Snake_ID`);

--
-- 資料表索引 `蛇的種類`
--
ALTER TABLE `蛇的種類`
  ADD PRIMARY KEY (`Snake_ID`);

--
-- 資料表索引 `醫院`
--
ALTER TABLE `醫院`
  ADD PRIMARY KEY (`Hospital_ID`);

--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `存放位置`
--
ALTER TABLE `存放位置`
  ADD CONSTRAINT `存放位置_ibfk_1` FOREIGN KEY (`Hospital_ID`) REFERENCES `醫院` (`Hospital_ID`),
  ADD CONSTRAINT `存放位置_ibfk_2` FOREIGN KEY (`Antivenom_ID`) REFERENCES `抗蛇毒血清` (`Antivenom_ID`);

--
-- 資料表的 Constraints `蛇的圖片`
--
ALTER TABLE `蛇的圖片`
  ADD CONSTRAINT `蛇的圖片_ibfk_1` FOREIGN KEY (`Snake_ID`) REFERENCES `蛇的種類` (`Snake_ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
