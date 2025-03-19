-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 03, 2024 at 10:17 AM
-- Server version: 8.0.31
-- PHP Version: 8.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `octopuce`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendars`
--

DROP TABLE IF EXISTS `calendars`;
CREATE TABLE IF NOT EXISTS `calendars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `notes` text,
  `link` text,
  `CalendarDate` char(10) DEFAULT NULL,
  `CalendarTime` char(8) DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_calendar` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `calendars`
--

INSERT INTO `calendars` (`id`, `UserId`, `notes`, `link`, `CalendarDate`, `CalendarTime`, `CreatedAt`, `UpdatedAt`) VALUES
(3, 1, 'My Notes', '#chanel', '2023-12-01', '22:00:00', '2023-12-30 12:03:01', '2023-12-30 12:03:01'),
(4, 1, 'My Notes', '#chanel', '2023-12-01', '22:00:00', '2023-12-31 16:34:57', '2023-12-31 16:34:57'),
(5, 1, 'My Notes', '#chanel', '2023-12-01', '22:00:00', '2023-12-31 16:35:38', '2023-12-31 16:35:38'),
(6, 1, 'My Notes', '#chanel', '2023-12-01', '22:00:00', '2023-12-31 16:35:53', '2023-12-31 16:35:53'),
(7, 1, 'My Notes', '#chanel', '2023-12-01', '22:00:00', '2023-12-31 16:36:08', '2023-12-31 16:36:08'),
(8, 1, 'My Notes', '#chanel', '2023-12-01', '22:00:00', '2023-12-31 16:36:17', '2023-12-31 16:36:17'),
(9, 1, 'My Notes', '#chanel', '2023-12-01', '22:00:00', '2023-12-31 16:36:34', '2023-12-31 16:36:34'),
(10, 1, 'My Notes', '#chanel', '2023-12-01', '22:00:00', '2023-12-31 16:36:45', '2023-12-31 16:36:45'),
(11, 1, 'My Notes', '#chanel', '2023-12-01', '22:00:00', '2023-12-31 16:36:56', '2023-12-31 16:36:56'),
(12, 1, 'My Notes', '#chanel', '2023-12-01', '22:00:00', '2023-12-31 16:38:22', '2023-12-31 16:38:22');

-- --------------------------------------------------------

--
-- Table structure for table `connections`
--

DROP TABLE IF EXISTS `connections`;
CREATE TABLE IF NOT EXISTS `connections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `connect_m_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `access_url` varchar(500) DEFAULT NULL,
  `access_token` varchar(500) DEFAULT NULL,
  `expire_date` datetime DEFAULT NULL,
  `status` int DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_connection` (`userid`),
  KEY `fk_users` (`connect_m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `connections`
--

INSERT INTO `connections` (`id`, `userid`, `connect_m_id`, `name`, `access_url`, `access_token`, `expire_date`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'edwin_conn', 'https://www.linkedin.com/in/edwin-warming-gunawan', '12345', '2023-12-01 00:00:00', 1, '2024-01-01 22:22:32', '2024-01-01 22:22:32'),
(2, 1, 1, 'edwin_conn', 'https://www.linkedin.com/in/edwin-warming-gunawan', '12345', '2023-12-01 00:00:00', NULL, '2024-01-02 17:00:58', '2024-01-02 17:00:58'),
(3, 1, 1, 'edwin_conn', 'https://www.linkedin.com/in/edwin-warming-gunawan', '12345', '2023-12-01 00:00:00', NULL, '2024-01-02 17:02:01', '2024-01-02 17:02:01'),
(4, 1, 1, 'edwin_conn', 'https://www.linkedin.com/in/edwin-warming-gunawan', '12345', '2023-12-01 00:00:00', NULL, '2024-01-02 17:02:33', '2024-01-02 17:02:33'),
(5, 1, 1, 'edwin_conn', 'https://www.linkedin.com/in/edwin-warming-gunawan', '12345', '2023-12-01 00:00:00', 0, '2024-01-02 17:03:43', '2024-01-02 17:03:43');

-- --------------------------------------------------------

--
-- Table structure for table `master_connections`
--

DROP TABLE IF EXISTS `master_connections`;
CREATE TABLE IF NOT EXISTS `master_connections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `label` varchar(50) DEFAULT NULL,
  `link_image` varchar(255) DEFAULT NULL,
  `link_url` text,
  `connection_type` int DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `master_connections`
--

INSERT INTO `master_connections` (`id`, `name`, `label`, `link_image`, `link_url`, `connection_type`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'audiopodcast', 'Audio Podcast', 'podcast-audio-icon.svg', NULL, 1, 1, '2024-01-01 17:26:38', '2024-01-01 17:26:38'),
(2, 'videopodcast', 'Video Podcast', 'podcast-video-icon.svg', NULL, 1, 1, '2024-01-01 17:37:20', '2024-01-01 17:37:20'),
(3, 'soundcloud', 'SoundCloud', 'soundcloud-icon.svg', NULL, 2, 1, '2024-01-01 17:43:25', '2024-01-01 17:43:25'),
(4, 'youtube', 'YouTube', 'youtube-icon.svg', NULL, 3, 1, '2024-01-01 17:57:43', '2024-01-01 17:57:43'),
(5, 'googledrive', 'Google Drive', 'googledrive-icon.svg', NULL, 3, 1, '2024-01-01 17:58:41', '2024-01-01 17:58:41'),
(6, 'dropbox', 'Drop Box', 'dropbox-icon.svg', NULL, 3, 1, '2024-01-01 17:59:18', '2024-01-01 17:59:18'),
(7, 'facebook', 'Facebook', 'facebook-icon.svg', NULL, 3, 1, '2024-01-01 18:00:19', '2024-01-01 18:00:19'),
(8, 'zoom', 'Zoom', 'zoom-icon.svg', NULL, 1, 1, '2024-01-01 18:00:48', '2024-01-01 18:00:48'),
(9, 'linkedin', 'LinkedIn', 'linkedin-icon.svg', NULL, 2, 1, '2024-01-01 18:01:19', '2024-01-01 18:01:19'),
(10, 'twitter', 'Twitter', 'twitter-icon.svg', NULL, 2, 1, '2024-01-01 18:01:45', '2024-01-01 18:01:45'),
(11, 'binge', 'Binge Network', 'bingenetwork-icon.svg', NULL, 2, 1, '2024-01-01 18:08:05', '2024-01-01 18:08:05'),
(12, 'libsyn', 'Libsyn', 'libsyn-icon.svg', NULL, 2, 1, '2024-01-01 18:08:37', '2024-01-01 18:08:37'),
(13, 'captivate', 'Captivate.fm', 'captivate-icon.svg', NULL, 2, 1, '2024-01-01 18:09:14', '2024-01-01 18:09:14'),
(14, 'instagram', 'Instagram', 'instagram-icon.svg', NULL, 3, 1, '2024-01-01 18:10:29', '2024-01-01 18:10:29'),
(15, 'webex', 'Webex', 'webex-icon.png', NULL, 1, 1, '2024-01-01 18:11:01', '2024-01-01 18:11:01'),
(16, 'tiktok', 'TikTok', 'tiktok-icon.png', NULL, 3, 1, '2024-01-01 18:11:53', '2024-01-01 18:11:53'),
(17, 'pinterest', 'Pinterest', 'pinterest-icon.png', NULL, 2, 1, '2024-01-01 18:12:48', '2024-01-01 18:12:48'),
(18, 'snapchat', 'Snapchat', 'snapchat-icon.png', NULL, 2, 1, '2024-01-01 18:13:23', '2024-01-01 18:13:23'),
(19, 'lensprotocol', 'Lens Protocol', 'lensprotocol-icon.svg', NULL, 1, 1, '2024-01-01 18:14:41', '2024-01-01 18:14:41');

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
CREATE TABLE IF NOT EXISTS `templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_userid` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`id`, `userid`, `name`, `CreatedAt`, `UpdatedAt`) VALUES
(1, 1, 'My Templates', '2023-12-30 12:44:29', '2023-12-30 12:44:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `email`, `password`, `CreatedAt`, `UpdatedAt`) VALUES
(14, 'edwin', '+6234254534534', 'kubilk56@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(15, 'edwin', '+6234254534534', 'kubilk561@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(16, 'edwin', '+6234254534534', 'kubilk562@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(17, 'edwin', '+6234254534534', 'kubilk563@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(18, 'edwin', '+6234254534534', 'kubilk5634@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(19, 'edwin', '+6234254534534', 'kubilk563w4@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(20, 'edwin', '+6234254534534', 'kubilk563w4a@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(21, 'edwin', '+6234254534534', 'kubilk563waaaaaaaaaaaa@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(22, 'dudung', '+6234254534534', 'dudung@gmail.com', 'cXdlcnR5', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(23, NULL, '+6234254534534', 'kubilk565@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(24, '+628571065833', '+6234254534534', 'kubilk566@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(25, 'edwin', '+6234254534534', 'kubilk567@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(26, 'Alexis', '+8732423432', 'alexis@gmail.com', 'cXdlcnR5', '2023-12-31 08:57:13', '2023-12-31 08:57:24'),
(27, 'sdasd', '3242343', 'alexis1@gmail.com', 'cXdlcnR5', '2023-12-31 10:53:33', '2023-12-31 10:53:33'),
(28, 'edwin', '+628571065833', 'kubilk568@gmail.com', 'cGFyaWFiZWxUZWExMjM=', '2023-12-31 15:39:35', '2023-12-31 15:39:35'),
(29, 'dudung', '+8732423432', 'alexis2@gmail.com', 'cXdlcnR5', '2023-12-31 15:51:44', '2023-12-31 15:51:44'),
(30, 'dudung', '+8732423432', 'alexis123@gmail.com', 'cXdlcnR5', '2023-12-31 16:17:15', '2023-12-31 16:17:15'),
(31, 'DUDUNG', '098337373773', 'alexis1234@gmail.com', 'cXdlcnR5', '2024-01-01 18:51:20', '2024-01-01 18:51:20'),
(32, 'dudung', '+8732423432', 'alexis1233@gmail.com', 'cXdlcnR5', '2024-01-02 11:09:19', '2024-01-02 11:09:19'),
(33, 'dudung', '+8732423432', 'alexis12334@gmail.com', 'cXdlcnR5', '2024-01-02 11:10:43', '2024-01-02 11:10:43'),
(34, 'dudung', '+8732423432', 'alexis1233ss4@gmail.com', 'cXdlcnR5', '2024-01-02 11:16:24', '2024-01-02 11:16:24'),
(35, 'dudung', '+8732423432', 'alexis1233422@gmail.com', 'cXdlcnR5', '2024-01-02 12:01:23', '2024-01-02 12:01:23');

-- --------------------------------------------------------

--
-- Table structure for table `workflows`
--

DROP TABLE IF EXISTS `workflows`;
CREATE TABLE IF NOT EXISTS `workflows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `connect_id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `publish_mode` tinyint(1) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `source_type` varchar(50) DEFAULT NULL,
  `source_media_type` varchar(50) DEFAULT NULL,
  `source_connection` varchar(50) DEFAULT NULL,
  `source_playlist` varchar(50) DEFAULT NULL,
  `source_video_type` varchar(50) DEFAULT NULL,
  `source_folder` varchar(50) DEFAULT NULL,
  `source_action` varchar(50) DEFAULT NULL,
  `destination_connection` varchar(50) DEFAULT NULL,
  `destination_playlist` varchar(50) DEFAULT NULL,
  `destination_folder` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_workflows` (`userid`),
  KEY `fk_connection` (`connect_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `workflows`
--

INSERT INTO `workflows` (`id`, `userid`, `connect_id`, `name`, `publish_mode`, `status`, `source_type`, `source_media_type`, `source_connection`, `source_playlist`, `source_video_type`, `source_folder`, `source_action`, `destination_connection`, `destination_playlist`, `destination_folder`, `createdAt`, `updatedAt`) VALUES
(1, 1, 0, 'edwin', 0, 1, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2023-12-30 12:39:12', '2023-12-30 12:39:12'),
(4, 2, 0, 'dorayaki', 0, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2023-12-31 18:02:00', '2023-12-31 18:02:00'),
(5, 2, 0, 'dorayaki', 0, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2023-12-31 18:04:26', '2023-12-31 18:04:26'),
(7, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:39:20', '2024-01-01 10:39:20'),
(8, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:41:32', '2024-01-01 10:41:32'),
(9, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:41:42', '2024-01-01 10:41:42'),
(10, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:42:35', '2024-01-01 10:42:35'),
(11, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:46:01', '2024-01-01 10:46:01'),
(12, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:46:06', '2024-01-01 10:46:06'),
(13, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:46:13', '2024-01-01 10:46:13'),
(14, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:46:58', '2024-01-01 10:46:58'),
(15, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:47:24', '2024-01-01 10:47:24'),
(16, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:49:03', '2024-01-01 10:49:03'),
(17, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:49:44', '2024-01-01 10:49:44'),
(18, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:50:34', '2024-01-01 10:50:34'),
(19, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:50:48', '2024-01-01 10:50:48'),
(20, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:52:07', '2024-01-01 10:52:07'),
(21, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:54:49', '2024-01-01 10:54:49'),
(22, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 10:55:31', '2024-01-01 10:55:31'),
(23, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 11:05:09', '2024-01-01 11:05:09'),
(24, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 11:05:50', '2024-01-01 11:05:50'),
(25, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 11:05:58', '2024-01-01 11:05:58'),
(26, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 11:06:16', '2024-01-01 11:06:16'),
(27, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 11:14:58', '2024-01-01 11:14:58'),
(28, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 11:21:41', '2024-01-01 11:21:41'),
(29, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 11:22:25', '2024-01-01 11:22:25'),
(30, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 11:25:08', '2024-01-01 11:25:08'),
(31, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 11:31:23', '2024-01-01 11:31:23'),
(32, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 11:31:36', '2024-01-01 11:31:36'),
(33, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:16:38', '2024-01-01 13:16:38'),
(34, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:17:58', '2024-01-01 13:17:58'),
(35, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:20:58', '2024-01-01 13:20:58'),
(36, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:29:41', '2024-01-01 13:29:41'),
(37, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:34:36', '2024-01-01 13:34:36'),
(38, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:40:58', '2024-01-01 13:40:58'),
(39, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:45:36', '2024-01-01 13:45:36'),
(40, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:51:07', '2024-01-01 13:51:07'),
(41, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:51:32', '2024-01-01 13:51:32'),
(42, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:52:31', '2024-01-01 13:52:31'),
(43, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:54:05', '2024-01-01 13:54:05'),
(44, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:56:36', '2024-01-01 13:56:36'),
(45, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:56:57', '2024-01-01 13:56:57'),
(46, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 13:59:35', '2024-01-01 13:59:35'),
(47, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:00:59', '2024-01-01 14:00:59'),
(48, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:02:19', '2024-01-01 14:02:19'),
(49, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:03:32', '2024-01-01 14:03:32'),
(50, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:03:47', '2024-01-01 14:03:47'),
(51, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:05:18', '2024-01-01 14:05:18'),
(52, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:05:26', '2024-01-01 14:05:26'),
(53, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:06:26', '2024-01-01 14:06:26'),
(54, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:07:02', '2024-01-01 14:07:02'),
(55, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:07:11', '2024-01-01 14:07:11'),
(56, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:08:20', '2024-01-01 14:08:20'),
(57, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:08:32', '2024-01-01 14:08:32'),
(58, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:09:01', '2024-01-01 14:09:01'),
(59, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:09:13', '2024-01-01 14:09:13'),
(60, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:11:16', '2024-01-01 14:11:16'),
(61, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:13:37', '2024-01-01 14:13:37'),
(62, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:13:51', '2024-01-01 14:13:51'),
(63, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:23:52', '2024-01-01 14:23:52'),
(64, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:24:05', '2024-01-01 14:24:05'),
(65, 2, 0, 'dorayaki', 1, 0, 'video', 'video', 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 14:24:42', '2024-01-01 14:24:42'),
(66, 2, 0, 'dorayaki', 1, 0, 'video', NULL, 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 21:17:29', '2024-01-01 21:17:29'),
(67, 2, 0, 'dorayaki', 1, 0, 'video', NULL, 'youtube', '127.0.0.1', '.mp4', 'edwin', 'publish', 'facebook', 'me', 'me', '2024-01-01 21:17:32', '2024-01-01 21:17:32');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
