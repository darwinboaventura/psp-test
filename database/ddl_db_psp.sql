CREATE DATABASE psp CHARACTER SET `utf8mb4` COLLATE `utf8mb4_0900_ai_ci`;

USE psp;

CREATE TABLE `transaction` (
  `id` int AUTO_INCREMENT NOT NULL,
  `description` varchar(255) NOT NULL,
  `paymentMethod` ENUM('debit_card', 'credit_card') NOT NULL,
  `cardNumber` varchar(4) NOT NULL,
  `cardHolderName` varchar(100) NOT NULL,
  `cardExpirationDate` varchar(5) NOT NULL,
  `cardVerificationCode` varchar(5) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL,
  `deleteAt` timestamp NOT NULL,
  PRIMARY KEY `pk_transaction_id` (`id`)
);

CREATE TABLE `payable` (
  `id` int AUTO_INCREMENT NOT NULL,
  `transactionId` int NOT NULL,
  `status` ENUM('paid', 'waiting_funds') NOT NULL,
  `expectedPaymentDate` timestamp NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL,
  `deleteAt` timestamp NOT NULL,
  PRIMARY KEY `pk_payable_id` (`id`)
);