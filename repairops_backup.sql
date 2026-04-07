-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: repairops
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20260403012718_InitialCreate','9.0.0'),('20260404235619_AddCustomers','9.0.0'),('20260404235916_AddCustomersTable','9.0.0'),('20260405000144_AddCustomersTable2','9.0.0'),('20260405172059_AddDevices','9.0.0'),('20260405172359_AddDevicesTable','9.0.0'),('20260405173259_AddRepairTickets2','9.0.0'),('20260405213732_AddRepairNotes','9.0.0'),('20260405222533_AddInventory','9.0.0'),('20260407154835_AddCreatedByUser','9.0.0'),('20260407160558_AddServicePricing','9.0.0'),('20260407173236_FixDecimalPrecision','9.0.0');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FullName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Phone` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Jane Smith','555-1234','jane@example.com','2026-04-05 17:13:09.463911');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CustomerId` int NOT NULL,
  `Brand` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Model` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `SerialNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Devices_CustomerId` (`CustomerId`),
  CONSTRAINT `FK_Devices_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,1,'Apple','iPhone 14','SN123456789','2026-04-05 20:34:29.458584');
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventorytransactions`
--

DROP TABLE IF EXISTS `inventorytransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventorytransactions` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PartId` int NOT NULL,
  `RepairTicketId` int DEFAULT NULL,
  `QuantityChanged` int NOT NULL,
  `Note` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_InventoryTransactions_PartId` (`PartId`),
  KEY `IX_InventoryTransactions_RepairTicketId` (`RepairTicketId`),
  CONSTRAINT `FK_InventoryTransactions_Parts_PartId` FOREIGN KEY (`PartId`) REFERENCES `parts` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_InventoryTransactions_RepairTickets_RepairTicketId` FOREIGN KEY (`RepairTicketId`) REFERENCES `repairtickets` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventorytransactions`
--

LOCK TABLES `inventorytransactions` WRITE;
/*!40000 ALTER TABLE `inventorytransactions` DISABLE KEYS */;
INSERT INTO `inventorytransactions` VALUES (1,1,1,-1,'Used for screen replacement on ticket #1','2026-04-05 22:55:27.168504'),(2,1,1,-1,'Used for screen replacement on ticket #1','2026-04-05 22:55:33.883250'),(3,1,1,-1,'Used for screen replacement on ticket #1','2026-04-05 22:57:05.819416'),(4,1,1,-1,'Used for screen replacement on ticket #1','2026-04-06 00:06:05.930118');
/*!40000 ALTER TABLE `inventorytransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parts`
--

DROP TABLE IF EXISTS `parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parts` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PartNumber` int NOT NULL,
  `Quantity` int NOT NULL,
  `LowStockThreshold` int NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parts`
--

LOCK TABLES `parts` WRITE;
/*!40000 ALTER TABLE `parts` DISABLE KEYS */;
INSERT INTO `parts` VALUES (1,'iPhone 14 Screen',1001,1,3,'2026-04-05 22:53:56.057209'),(2,'iphone 17 screen',1002,15,3,'2026-04-06 23:06:45.099668');
/*!40000 ALTER TABLE `parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repairnotes`
--

DROP TABLE IF EXISTS `repairnotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repairnotes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `RepairTicketId` int NOT NULL,
  `UserId` int NOT NULL,
  `Note` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_RepairNotes_RepairTicketId` (`RepairTicketId`),
  KEY `IX_RepairNotes_UserId` (`UserId`),
  CONSTRAINT `FK_RepairNotes_RepairTickets_RepairTicketId` FOREIGN KEY (`RepairTicketId`) REFERENCES `repairtickets` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_RepairNotes_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repairnotes`
--

LOCK TABLES `repairnotes` WRITE;
/*!40000 ALTER TABLE `repairnotes` DISABLE KEYS */;
INSERT INTO `repairnotes` VALUES (1,1,1,'Screen replacement ordered, waiting for part to arrive','2026-04-05 21:55:37.532122'),(5,1,1,'test','2026-04-06 22:01:00.924138'),(6,1,1,'adding new screen','2026-04-06 22:02:28.713339'),(7,1,1,'got new screen','2026-04-07 01:13:58.663233'),(8,2,1,'doesnt want repair','2026-04-07 13:23:25.324345');
/*!40000 ALTER TABLE `repairnotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repairtickets`
--

DROP TABLE IF EXISTS `repairtickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repairtickets` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CustomerId` int NOT NULL,
  `DeviceId` int NOT NULL,
  `AssignedUserId` int NOT NULL,
  `Status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IssueDescription` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IntakeNotes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) DEFAULT NULL,
  `CreatedByUserId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `IX_RepairTickets_AssignedUserId` (`AssignedUserId`),
  KEY `IX_RepairTickets_CustomerId` (`CustomerId`),
  KEY `IX_RepairTickets_DeviceId` (`DeviceId`),
  KEY `IX_RepairTickets_CreatedByUserId` (`CreatedByUserId`),
  CONSTRAINT `FK_RepairTickets_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_RepairTickets_Devices_DeviceId` FOREIGN KEY (`DeviceId`) REFERENCES `devices` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_RepairTickets_Users_AssignedUserId` FOREIGN KEY (`AssignedUserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_RepairTickets_Users_CreatedByUserId` FOREIGN KEY (`CreatedByUserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repairtickets`
--

LOCK TABLES `repairtickets` WRITE;
/*!40000 ALTER TABLE `repairtickets` DISABLE KEYS */;
INSERT INTO `repairtickets` VALUES (1,1,1,1,'Testing','Screen is cracked and touchscreen not responding','Customer wants repair done within 3 days','2026-04-05 20:34:39.964144','2026-04-07 01:13:47.086958',1),(2,1,1,1,'Cancelled','cracked camera','cracked camera','2026-04-07 13:11:36.686490','2026-04-07 13:23:04.964497',1),(7,1,1,1,'Testing','battery','battery','2026-04-07 20:48:06.294871','2026-04-07 21:02:45.070336',1);
/*!40000 ALTER TABLE `repairtickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serviceprices`
--

DROP TABLE IF EXISTS `serviceprices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serviceprices` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ServiceName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Brand` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Model` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serviceprices`
--

LOCK TABLES `serviceprices` WRITE;
/*!40000 ALTER TABLE `serviceprices` DISABLE KEYS */;
INSERT INTO `serviceprices` VALUES (1,'Screen Repair','Apple','iPhone 14',150.00,'2026-04-07 17:27:23.816416'),(2,'Screen Repair','Samsung','S24',480.00,'2026-04-07 19:47:19.165640');
/*!40000 ALTER TABLE `serviceprices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticketservices`
--

DROP TABLE IF EXISTS `ticketservices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticketservices` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `RepairTicketId` int NOT NULL,
  `ServicePriceId` int DEFAULT NULL,
  `CustomDescription` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_TicketServices_RepairTicketId` (`RepairTicketId`),
  KEY `IX_TicketServices_ServicePriceId` (`ServicePriceId`),
  CONSTRAINT `FK_TicketServices_RepairTickets_RepairTicketId` FOREIGN KEY (`RepairTicketId`) REFERENCES `repairtickets` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_TicketServices_ServicePrices_ServicePriceId` FOREIGN KEY (`ServicePriceId`) REFERENCES `serviceprices` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticketservices`
--

LOCK TABLES `ticketservices` WRITE;
/*!40000 ALTER TABLE `ticketservices` DISABLE KEYS */;
INSERT INTO `ticketservices` VALUES (2,7,1,'',150.00,'2026-04-07 20:51:17.752319'),(3,1,1,'',150.00,'2026-04-07 22:36:44.393197');
/*!40000 ALTER TABLE `ticketservices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FullName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PasswordHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Role` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John Tech','john@repairops.com','$2a$11$9R88wRli5R9azrrNmprcF.stfQjzqZ2Guud5/ZDB2PY/uMMmPTDbi','Technician','2026-04-04 23:47:51.560985'),(2,'Admin User','admin@repairops.com','$2a$11$zMp6X.i6fntfmJMO66RhCeGJE31gRmMX9JVPTiHxRy1JFi9K/2TOC','Admin','2026-04-07 21:13:19.007071'),(3,'Sarah Sales','sarah@repairops.com','$2a$11$a8uxX4YqQSCjkAPPvTYHjeQ2TLdDuQo0p6DnR5w2uszejElQxeZqu','SalesRep','2026-04-07 21:13:39.074329'),(4,'Vincent Fezzuoglio','dragosword100@gmail.com','$2a$11$D1bYE17YJsKJ4mUAGg3m7u8u7uekF23w3iZTaA49WTp7cpLYN205K','SalesRep','2026-04-07 22:16:52.604365');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-07 19:15:06
